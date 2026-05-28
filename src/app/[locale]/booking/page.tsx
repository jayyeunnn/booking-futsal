"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Star, ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";

const LOCATIONS = [
  {
    id: "loc-1",
    name: "JayField Sudirman",
    address: "Jl. Sudirman No. 10, Jakarta Selatan",
    city: "Jakarta Selatan",
    courts: 5,
    indoor: 3,
    outdoor: 2,
    rating: 4.8,
    reviews: 120,
    openTime: "08:00",
    closeTime: "00:00",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "loc-2",
    name: "JayField Gatot Subroto",
    address: "Jl. Gatot Subroto No. 22, Jakarta Pusat",
    city: "Jakarta Pusat",
    courts: 3,
    indoor: 2,
    outdoor: 1,
    rating: 4.6,
    reviews: 85,
    openTime: "08:00",
    closeTime: "00:00",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "loc-3",
    name: "JayField BSD",
    address: "Jl. BSD Raya No. 5, Tangerang Selatan",
    city: "Tangerang Selatan",
    courts: 4,
    indoor: 2,
    outdoor: 2,
    rating: 4.7,
    reviews: 95,
    openTime: "08:00",
    closeTime: "00:00",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400&auto=format&fit=crop",
  },
];

export default function BookingSelectLocationPage() {
  const t = useTranslations("booking");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "id";
  const [search, setSearch] = useState("");

  const filteredLocations = LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted pt-[72px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-secondary mb-6">
            <span>Booking</span>
            <span className="mx-2">/</span>
            <span className="text-text-primary font-medium">{t("select_location")}</span>
          </nav>

          <h1 className="text-3xl font-heading font-bold text-text-primary mb-6">
            {t("select_location")}
          </h1>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Cari lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-surface text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Location Cards */}
          <div className="space-y-4">
            {filteredLocations.map((location) => (
              <Link
                key={location.id}
                href={`/${locale}/booking/${location.id}`}
                className="block bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-40 sm:h-auto overflow-hidden shrink-0">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {location.name}
                      </h3>
                      <div className="flex items-start gap-2 mt-1.5 text-sm text-text-secondary">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-text-secondary">
                        <span className="flex items-center gap-1">
                          🏟️ {location.courts} Lapangan ({location.indoor} Indoor, {location.outdoor} Outdoor)
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {location.openTime} - {location.closeTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                          {location.rating} ({location.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                      Pilih Lokasi Ini <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {filteredLocations.length === 0 && (
              <div className="text-center py-12 text-text-secondary">
                Tidak ada lokasi ditemukan untuk &quot;{search}&quot;
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
