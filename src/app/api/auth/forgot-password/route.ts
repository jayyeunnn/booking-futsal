import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validated = forgotPasswordSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validated.error.issues[0]?.message || "Email tidak valid",
          },
        },
        { status: 422 }
      );
    }

    const { email } = validated.data;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success even if user not found (security: don't reveal if email exists)
    if (!user) {
      return NextResponse.json({
        success: true,
        data: {
          message: "Jika email terdaftar, link reset password telah dikirim.",
        },
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store token in verification_tokens table
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // TODO: Send email with reset link
    // const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${email}`;
    // await sendEmail({
    //   to: email,
    //   subject: "Reset Password - JayField",
    //   template: "password-reset",
    //   variables: { userName: user.name, resetLink: resetUrl },
    // });

    console.log(`[DEV] Password reset token for ${email}: ${token}`);

    return NextResponse.json({
      success: true,
      data: {
        message: "Jika email terdaftar, link reset password telah dikirim.",
      },
    });
  } catch (error) {
    console.error("Forgot password error:", error);
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
