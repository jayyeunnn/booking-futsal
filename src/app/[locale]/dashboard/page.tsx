"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, Trophy, Coins, Bell, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "id";

  const stats = [
    { icon: Calendar, label: t("active_bookings"), value: "2", color: "text-primary", bg: "bg-primary/10" },
    { icon: Coins, label: t("total_points"), value: "850", color: "text-cta", bg: "bg-cta/10" },
    { icon: Trophy, label: t("current_tier"), value: "GOLD", color: "text-warning", bg: "bg-warning/10" },
    { icon: Bell, label: t("unread_notif"), value: "3", color: "text-info", bg: "bg-info/10" },
  ];

  const quickLinks = [
    { href: `/${locale}/dashboard/bookings`, label: tNav("my_bookings"), icon: Calendar },
    { href: `/${locale}/dashboard/membership`, label: tNav("membership"), icon: Trophy },
    { href: `/${locale}/dashboard/points`, label: "Poin", icon: Coins },
    { href: `/${locale}/dashboard/notifications`, label: tNav("notifications"), icon: Bell },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted pt-[72px]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-6">
            {t("title")}
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-4">
                <div className={`inline-flex p-2 rounded-lg ${stat.bg} mb-2`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <p className="text-2xl font-heading font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="bg-surface border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all group"
              >
                <link.icon className="h-6 w-6 text-primary mb-3" />
                <p className="font-medium text-text-primary flex items-center justify-between">
                  {link.label}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </Link>
            ))}
          </div>

          {/* Upcoming */}
          <div className="bg-surface border border-border rounded-xl p-6">
            <h2 className="text-lg font-heading font-semibold mb-4">{t("upcoming")}</h2>
            <div className="text-center py-8 text-text-secondary">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>{t("no_bookings")}</p>
              <Link
                href={`/${locale}/booking`}
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary hover:text-primary-light"
              >
                Booking Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
