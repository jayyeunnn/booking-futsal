import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: "AUTH_REQUIRED", message: "Login diperlukan" } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { code, totalAmount } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Kode promo wajib diisi" } },
        { status: 422 }
      );
    }

    const now = new Date();
    const promo = await prisma.promo.findFirst({
      where: {
        code: code.toUpperCase(),
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
      },
    });

    if (!promo) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_PROMO", message: "Kode promo tidak valid atau kadaluarsa" } },
        { status: 400 }
      );
    }

    if (promo.usageLimit && promo.usageCount >= promo.usageLimit) {
      return NextResponse.json(
        { success: false, error: { code: "PROMO_EXHAUSTED", message: "Kuota promo sudah habis" } },
        { status: 400 }
      );
    }

    if (promo.minBooking && totalAmount < Number(promo.minBooking)) {
      return NextResponse.json(
        { success: false, error: { code: "MIN_BOOKING_NOT_MET", message: "Minimum booking belum terpenuhi" } },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (promo.discountType === "PERCENTAGE") {
      discountAmount = Math.ceil(totalAmount * Number(promo.discountValue) / 100);
      if (promo.maxDiscount && discountAmount > Number(promo.maxDiscount)) {
        discountAmount = Number(promo.maxDiscount);
      }
    } else {
      discountAmount = Number(promo.discountValue);
    }

    return NextResponse.json({
      success: true,
      data: {
        promoId: promo.id,
        code: promo.code,
        title: promo.title,
        discountType: promo.discountType,
        discountValue: Number(promo.discountValue),
        discountAmount,
        finalAmount: totalAmount - discountAmount,
      },
    });
  } catch (error) {
    console.error("Validate promo error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Gagal memvalidasi promo" } },
      { status: 500 }
    );
  }
}
