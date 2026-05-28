"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight } from "lucide-react";

export default function LocationsSection() {
  const t = useTranslations("landing");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "id";

  const locations = [
    {
      name: "JayField Sudirman",
      address: "Jl. Sudirman No. 10, Jakarta Selatan",
      courts: 5,
      rating: 4.8,
      reviews: 120,
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "JayField Gatot Subroto",
      address: "Jl. Gatot Subroto No. 22, Jakarta Pusat",
      courts: 3,
      rating: 4.6,
      reviews: 85,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&auto=format&fit=crop",
    },
    {
      name: "JayField BSD",
      address: "Jl. BSD Raya No. 5, Tangerang Selatan",
      courts: 4,
      rating: 4.7,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section id="locations" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">{t("locations_title")}</h2>
          <p className="mt-3 text-text-secondary text-lg">{t("locations_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div key={index} className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="h-40 overflow-hidden">
                <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-heading font-semibold text-text-primary">{location.name}</h3>
                <div className="flex items-start gap-2 mt-2 text-sm text-text-secondary">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-text-secondary">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {location.courts} Lapangan
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                    {location.rating} ({location.reviews})
                  </span>
                </div>
                <Link
                  href={`/${locale}/booking`}
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors"
                >
                  {t("hero_cta")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
