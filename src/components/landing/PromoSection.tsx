"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Flame, Trophy, ArrowRight } from "lucide-react";

export default function PromoSection() {
  const t = useTranslations("landing");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "id";

  const promos = [
    {
      icon: Flame,
      badge: "Hot Deal",
      badgeColor: "bg-cta",
      title: "Weekend Deal",
      description: "Diskon 30% untuk booking Sabtu-Minggu jam 08:00-16:00",
      period: "Berlaku s/d 30 Juni 2026",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=500&auto=format&fit=crop",
    },
    {
      icon: Trophy,
      badge: "Event",
      badgeColor: "bg-accent",
      title: "Turnamen Bulanan",
      description: "Ikuti turnamen futsal antar tim! Total hadiah Rp 10.000.000",
      period: "Pendaftaran dibuka",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
            {t("promo_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="bg-surface rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-border"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-4 left-4 ${promo.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {promo.badge}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <promo.icon className="h-5 w-5 text-cta" />
                  <h3 className="text-xl font-heading font-semibold text-text-primary">
                    {promo.title}
                  </h3>
                </div>
                <p className="text-text-secondary text-sm mb-3">{promo.description}</p>
                <p className="text-xs text-text-secondary/70 mb-4">{promo.period}</p>
                <Link
                  href={`/${locale}/promo`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors"
                >
                  Lihat Detail <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
