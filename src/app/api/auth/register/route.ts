import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validated = registerSchema.safeParse({
      ...body,
      confirmPassword: body.password, // API doesn't need confirm, handled by client
    });

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validated.error.issues[0]?.message || "Data tidak valid",
            details: validated.error.issues,
          },
        },
        { status: 422 }
      );
    }

    const { name, email, phone, password } = body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "DUPLICATE_EMAIL",
            message: "Email sudah terdaftar. Silakan login atau gunakan email lain.",
          },
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with Bronze tier (default member)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash,
        role: "USER",
        tier: "BRONZE",
        totalPoints: 0,
        totalBookings: 0,
        provider: "credentials",
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        tier: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Terjadi kesalahan server. Silakan coba lagi.",
        },
      },
      { status: 500 }
    );
  }
}
