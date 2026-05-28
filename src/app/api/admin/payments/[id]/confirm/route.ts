import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string })?.role;
    if (!session?.user || (role !== "ADMIN" && role !== "STAFF")) {
      return NextResponse.json(
        { success: false, error: { code: "FORBIDDEN", message: "Akses ditolak" } },
        { status: 403 }
      );
    }

    const userId = (session.user as { id: string }).id;

    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
      include: { booking: true },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Pembayaran tidak ditemukan" } },
        { status: 404 }
      );
    }

    if (payment.status !== "UPLOADED") {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_STATUS", message: "Pembayaran tidak dalam status yang bisa dikonfirmasi" } },
        { status: 400 }
      );
    }

    // Confirm payment
    await prisma.payment.update({
      where: { id: params.id },
      data: { status: "CONFIRMED", confirmedById: userId, confirmedAt: new Date() },
    });

    // Update booking status
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: "CONFIRMED" },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId: payment.booking.userId,
        title: "Pembayaran Dikonfirmasi",
        message: "Pembayaran Anda telah dikonfirmasi. Booking Anda sudah terkonfirmasi!",
        type: "PAYMENT",
        actionUrl: `/dashboard/bookings`,
      },
    });

    return NextResponse.json({
      success: true,
      data: { message: "Pembayaran berhasil dikonfirmasi" },
    });
  } catch (error) {
    console.error("Confirm payment error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Gagal konfirmasi pembayaran" } },
      { status: 500 }
    );
  }
}
