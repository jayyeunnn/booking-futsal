"use client";

import { useTranslations } from "next-intl";
import { Trophy, Users, Star } from "lucide-react";

export default function SocialProofBar() {
  const t = useTranslations("landing");

  const stats = [
    { icon: Trophy, value: "10+", label: t("stats_courts") },
    { icon: Users, value: "5000+", label: t("stats_bookings") },
    { icon: Star, value: "4.8", label: t("stats_rating") },
  ];

  return (
    <section className="bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3 text-white">
              <stat.icon className="h-6 w-6 text-accent" />
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-heading font-bold">
                  {stat.value}
                </span>
                <span className="text-white/80 text-sm">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
