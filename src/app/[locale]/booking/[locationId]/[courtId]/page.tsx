"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

type SlotStatus = "available" | "pending" | "booked";

interface TimeSlot {
  time: string;
  status: SlotStatus;
  price: number;
}

function generateSlots(date: Date): TimeSlot[] {
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const slots: TimeSlot[] = [];

  for (let hour = 8; hour <= 23; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    const isPrimeTime = hour >= 16;
    const basePrice = isPrimeTime ? (isWeekend ? 300000 : 250000) : (isWeekend ? 200000 : 150000);

    // Mock: some slots booked/pending
    let status: SlotStatus = "available";
    if (hour === 17 || hour === 18) status = "booked";
    if (hour === 10) status = "pending";

    slots.push({ time, status, price: basePrice });
  }
  return slots;
}

export default function BookingSelectSchedulePage() {
  const t = useTranslations("booking");
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] || "id";

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const slots = generateSlots(selectedDate);
  const totalPrice = selectedSlots.reduce((sum, time) => {
    const slot = slots.find((s) => s.time === time);
    return sum + (slot?.price || 0);
  }, 0);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  const toggleSlot = (time: string) => {
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time].sort()
    );
  };

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const isToday = (day: number) =>
    day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();

  const isSelected = (day: number) =>
    day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    date.setHours(0, 0, 0, 0);
    const todayCopy = new Date();
    todayCopy.setHours(0, 0, 0, 0);
    return date < todayCopy;
  };

  const handleConfirm = () => {
    const params = new URLSearchParams({
      slots: selectedSlots.join(","),
      date: selectedDate.toISOString().split("T")[0],
      total: totalPrice.toString(),
      recurring: isRecurring.toString(),
    });
    router.push(`/${locale}/booking/confirm?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted pt-[72px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-secondary mb-4">
            <Link href={`/${locale}/booking`} className="hover:text-primary">Booking</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary font-medium">{t("select_schedule")}</span>
          </nav>

          <Link href={pathname.split("/").slice(0, -1).join("/")} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Link>

          <h1 className="text-3xl font-heading font-bold text-text-primary mb-6">{t("select_schedule")}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Calendar + Slots */}
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-1.5 hover:bg-muted rounded-lg"><ChevronLeft className="h-5 w-5" /></button>
                  <h3 className="font-heading font-semibold">{monthNames[currentMonth]} {currentYear}</h3>
                  <button onClick={nextMonth} className="p-1.5 hover:bg-muted rounded-lg"><ChevronRight className="h-5 w-5" /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {dayNames.map((d) => (<div key={d} className="py-2 text-text-secondary font-medium">{d}</div>))}
                  {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, i) => (<div key={`empty-${i}`} />))}
                  {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, i) => {
                    const day = i + 1;
                    const past = isPast(day);
                    return (
                      <button
                        key={day}
                        disabled={past}
                        onClick={() => { setSelectedDate(new Date(currentYear, currentMonth, day)); setSelectedSlots([]); }}
                        className={`py-2 rounded-lg text-sm transition-colors ${
                          isSelected(day) ? "bg-primary text-white font-bold" :
                          isToday(day) ? "bg-accent/10 text-accent font-bold" :
                          past ? "text-text-secondary/30 cursor-not-allowed" :
                          "hover:bg-muted text-text-primary"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-heading font-semibold mb-4">
                  Jadwal: {selectedDate.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </h3>

                {/* Legend */}
                <div className="flex gap-4 mb-4 text-xs text-text-secondary">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-accent/20 border border-accent" /> {t("available")}</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-warning/20 border border-warning" /> {t("pending")}</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-error/20 border border-error" /> {t("booked")}</span>
                </div>

                <div className="space-y-2">
                  {slots.map((slot) => {
                    const isSelectedSlot = selectedSlots.includes(slot.time);
                    return (
                      <button
                        key={slot.time}
                        disabled={slot.status !== "available"}
                        onClick={() => toggleSlot(slot.time)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
                          slot.status === "booked" ? "bg-error/5 border-error/30 text-text-secondary/50 cursor-not-allowed" :
                          slot.status === "pending" ? "bg-warning/5 border-warning/30 text-text-secondary/50 cursor-not-allowed" :
                          isSelectedSlot ? "bg-primary/10 border-primary text-primary font-medium" :
                          "bg-surface border-border hover:border-primary/50 hover:bg-primary/5 text-text-primary"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isSelectedSlot && <Check className="h-4 w-4 text-primary" />}
                          <span>{slot.time} - {(parseInt(slot.time) + 1).toString().padStart(2, "0")}:00</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {slot.status === "available" && (
                            <span className="font-medium">{formatPrice(slot.price)}</span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            slot.status === "available" ? "bg-accent/10 text-accent" :
                            slot.status === "pending" ? "bg-warning/10 text-warning" :
                            "bg-error/10 text-error"
                          }`}>
                            {slot.status === "available" ? t("available") : slot.status === "pending" ? t("pending") : t("booked")}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-surface border border-border rounded-xl p-5 sticky top-[90px]">
                <h3 className="font-heading font-semibold mb-4">Ringkasan</h3>

                {selectedSlots.length > 0 ? (
                  <>
                    <div className="space-y-2 mb-4">
                      {selectedSlots.map((time) => {
                        const slot = slots.find((s) => s.time === time);
                        return (
                          <div key={time} className="flex justify-between text-sm">
                            <span>{time} - {(parseInt(time) + 1).toString().padStart(2, "0")}:00</span>
                            <span className="font-medium">{formatPrice(slot?.price || 0)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t border-border pt-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>{t("duration")}</span>
                        <span>{selectedSlots.length} {t("hours")}</span>
                      </div>
                      <div className="flex justify-between font-heading font-bold text-lg mt-2">
                        <span>{t("total")}</span>
                        <span className="text-primary">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    {/* Recurring */}
                    <label className="flex items-start gap-2 mb-4 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isRecurring}
                        onChange={(e) => setIsRecurring(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">{t("make_recurring")}</span>
                    </label>

                    <Button variant="cta" className="w-full h-12 text-base font-semibold" onClick={handleConfirm}>
                      Lanjut ke Pembayaran →
                    </Button>
                  </>
                ) : (
                  <p className="text-sm text-text-secondary">Pilih waktu pada jadwal di samping untuk melanjutkan booking.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
