import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { createBookingSchema } from "@/lib/validations/booking";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: "AUTH_REQUIRED", message: "Login diperlukan" } },
        { status: 401 }
      );
    }

    const userId = (session.user as { id: string }).id;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where = {
      userId,
      ...(status && { status: status as "CONFIRMED" | "COMPLETED" | "CANCELLED" }),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          court: { include: { location: { select: { name: true, address: true } } } },
          payments: { select: { id: true, status: true, amount: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: bookings,
      meta: { page, totalPages: Math.ceil(total / limit), totalItems: total },
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Gagal mengambil booking" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: "AUTH_REQUIRED", message: "Login diperlukan" } },
        { status: 401 }
      );
    }

    const userId = (session.user as { id: string }).id;
    const body = await request.json();
    const validated = createBookingSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: validated.error.issues[0]?.message || "Data tidak valid" } },
        { status: 422 }
      );
    }

    const { courtId, bookingDate, startTime, endTime, paymentType, paymentMethod } = validated.data;

    // Verify court
    const court = await prisma.court.findUnique({
      where: { id: courtId },
      include: { pricing: { where: { isActive: true } } },
    });

    if (!court || !court.isActive) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: "Lapangan tidak ditemukan" } },
        { status: 404 }
      );
    }

    // Double booking check
    const date = new Date(bookingDate);
    const conflict = await prisma.booking.findFirst({
      where: {
        courtId,
        bookingDate: date,
        status: { notIn: ["CANCELLED", "EXPIRED"] },
        OR: [
          { AND: [{ startTime: { lte: startTime } }, { endTime: { gt: startTime } }] },
          { AND: [{ startTime: { lt: endTime } }, { endTime: { gte: endTime } }] },
          { AND: [{ startTime: { gte: startTime } }, { endTime: { lte: endTime } }] },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json(
        { success: false, error: { code: "BOOKING_CONFLICT", message: "Jadwal sudah terbooked" } },
        { status: 409 }
      );
    }

    // Calculate price
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    const durationHours = endHour - startHour;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const dayType = isWeekend ? "WEEKEND" : "WEEKDAY";

    let totalPrice = 0;
    for (let h = startHour; h < endHour; h++) {
      const timeType = h >= 16 ? "PRIME_TIME" : "REGULAR";
      const pricing = court.pricing.find((p) => p.dayType === dayType && p.timeType === timeType);
      totalPrice += pricing ? Number(pricing.pricePerHour) : 0;
    }

    const dpAmount = paymentType === "DP" ? Math.ceil(totalPrice * 0.5) : null;
    const payableAmount = paymentType === "DP" ? dpAmount! : totalPrice;

    // Create booking + payment
    const booking = await prisma.booking.create({
      data: {
        userId,
        courtId,
        bookingDate: date,
        startTime,
        endTime,
        durationHours,
        totalPrice,
        dpAmount,
        paymentType: paymentType as "DP" | "FULL",
        status: "PENDING_PAYMENT",
        isRecurring: validated.data.isRecurring,
        notes: validated.data.notes,
      },
    });

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: payableAmount,
        paymentMethod,
        paymentType: paymentType as "DP" | "FULL",
        status: "PENDING",
        expiresAt,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          bookingId: booking.id,
          totalPrice,
          dpAmount,
          payableAmount,
          paymentDeadline: expiresAt.toISOString(),
          status: "PENDING_PAYMENT",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Gagal membuat booking" } },
      { status: 500 }
    );
  }
}
