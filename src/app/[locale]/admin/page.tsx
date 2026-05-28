"use client";

import { useTranslations } from "next-intl";
import { Calendar, DollarSign, Clock, TrendingUp } from "lucide-react";

export default function AdminOverviewPage() {
  const t = useTranslations("admin");

  const stats = [
    { icon: Calendar, label: t("today_bookings"), value: "12", change: "+20%", color: "text-primary" },
    { icon: DollarSign, label: t("today_revenue"), value: "Rp 2.5 Jt", change: "+15%", color: "text-accent" },
    { icon: Clock, label: t("pending_payments"), value: "5", change: "", color: "text-warning" },
    { icon: TrendingUp, label: t("occupancy_rate"), value: "78%", change: "+5%", color: "text-info" },
  ];

  const recentBookings = [
    { id: "#1234", user: "Ahmad Rizki", court: "Lapangan 1", time: "19:00", status: "confirmed" },
    { id: "#1233", user: "Budi Santoso", court: "Lapangan 2", time: "20:00", status: "pending" },
    { id: "#1232", user: "Sari Indah", court: "Lapangan 1", time: "21:00", status: "pending" },
    { id: "#1231", user: "Doni Pratama", court: "Lapangan 3", time: "18:00", status: "confirmed" },
  ];

  const pendingPayments = [
    { id: "P-001", user: "Budi Santoso", method: "BCA", amount: "Rp 250.000", time: "14:30" },
    { id: "P-002", user: "Sari Indah", method: "Dana", amount: "Rp 150.000", time: "15:00" },
    { id: "P-003", user: "Eko Prasetyo", method: "Mandiri", amount: "Rp 300.000", time: "15:22" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-text-primary mb-6">{t("overview")}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              {stat.change && (
                <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-heading font-bold text-text-primary">{stat.value}</p>
            <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="font-heading font-semibold mb-4">Booking Hari Ini</h3>
          <div className="space-y-3">
            {recentBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text-primary">{b.user}</p>
                  <p className="text-xs text-text-secondary">{b.court} — {b.time}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  b.status === "confirmed" ? "bg-accent/10 text-accent" : "bg-warning/10 text-warning"
                }`}>
                  {b.status === "confirmed" ? "✓ Confirmed" : "⏳ Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Payments */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <h3 className="font-heading font-semibold mb-4">{t("pending_payments")}</h3>
          <div className="space-y-3">
            {pendingPayments.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-text-primary">{p.user}</p>
                  <p className="text-xs text-text-secondary">{p.method} — {p.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">{p.amount}</span>
                  <div className="flex gap-1">
                    <button className="text-xs bg-accent/10 text-accent hover:bg-accent/20 px-2 py-1 rounded transition-colors">✓</button>
                    <button className="text-xs bg-error/10 text-error hover:bg-error/20 px-2 py-1 rounded transition-colors">✗</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
