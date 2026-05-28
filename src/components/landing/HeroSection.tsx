"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("landing");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "id";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-[72px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1920&auto=format&fit=crop')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/70 to-primary/80 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
          {t("hero_title")}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
          {t("hero_subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center gap-2 bg-cta hover:bg-cta-hover text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-xl"
          >
            {t("hero_cta")}
            <ChevronRight className="h-5 w-5" />
          </Link>
          <Link
            href="#locations"
            className="inline-flex items-center gap-2 border-2 border-white/50 hover:border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-white/10"
          >
            {t("hero_secondary")}
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
