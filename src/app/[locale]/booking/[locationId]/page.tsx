"use client";

import { useTranslations } from "next-intl";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Building2, Sun, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

const COURTS: Record<string, Array<{
  id: string;
  name: string;
  type: "INDOOR" | "OUTDOOR";
  surface: string;
  priceFrom: number;
  image: string;
  facilities: string[];
}>> = {
  "loc-1": [
    { id: "court-1", name: "Lapangan 1", type: "INDOOR", surface: "Vinyl", priceFrom: 150000, image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=400&auto=format&fit=crop", facilities: ["AC", "LED Lights", "Sound System"] },
    { id: "court-2", name: "Lapangan 2", type: "INDOOR", surface: "Rumput Sintetis", priceFrom: 150000, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&auto=format&fit=crop", facilities: ["AC", "LED Lights"] },
    { id: "court-3", name: "Lapangan 3", type: "INDOOR", surface: "Vinyl", priceFrom: 150000, image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=400&auto=format&fit=crop", facilities: ["AC", "LED Lights", "Tribun"] },
    { id: "court-4", name: "Lapangan 4", type: "OUTDOOR", surface: "Rumput Sintetis", priceFrom: 120000, image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=400&auto=format&fit=crop", facilities: ["Lampu Sorot", "Tribun"] },
    { id: "court-5", name: "Lapangan 5", type: "OUTDOOR", surface: "Rumput Sintetis", priceFrom: 120000, image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400&auto=format&fit=crop", facilities: ["Lampu Sorot"] },
  ],
  "loc-2": [
    { id: "court-6", name: "Lapangan 1", type: "INDOOR", surface: "Vinyl", priceFrom: 160000, image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=400&auto=format&fit=crop", facilities: ["AC", "LED Lights"] },
    { id: "court-7", name: "Lapangan 2", type: "INDOOR", surface: "Rumput Sintetis", priceFrom: 160000, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&auto=format&fit=crop", facilities: ["AC", "LED Lights"] },
    { id: "court-8", name: "Lapangan 3", type: "OUTDOOR", surface: "Rumput Sintetis", priceFrom: 130000, image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=400&auto=format&fit=crop", facilities: ["Lampu Sorot"] },
  ],
  "loc-3": [
    { id: "court-9", name: "Lapangan 1", type: "INDOOR", surface: "Vinyl", priceFrom: 140000, image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=400&auto=format&fit=crop", facilities: ["AC", "LED Lights"] },
    { id: "court-10", name: "Lapangan 2", type: "INDOOR", surface: "Rumput Sintetis", priceFrom: 140000, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&auto=format&fit=crop", facilities: ["AC", "LED Lights", "Sound System"] },
    { id: "court-11", name: "Lapangan 3", type: "OUTDOOR", surface: "Rumput Sintetis", priceFrom: 110000, image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=400&auto=format&fit=crop", facilities: ["Lampu Sorot"] },
    { id: "court-12", name: "Lapangan 4", type: "OUTDOOR", surface: "Rumput Sintetis", priceFrom: 110000, image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=400&auto=format&fit=crop", facilities: ["Lampu Sorot", "Tribun"] },
  ],
};

export default function BookingSelectCourtPage() {
  const t = useTranslations("booking");
  const tLanding = useTranslations("landing");
  const pathname = usePathname();
  const params = useParams();
  const locale = pathname.split("/")[1] || "id";
  const locationId = params.locationId as string;
  const [filter, setFilter] = useState<"ALL" | "INDOOR" | "OUTDOOR">("ALL");

  const courts = COURTS[locationId] || [];
  const filteredCourts = filter === "ALL" ? courts : courts.filter((c) => c.type === filter);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted pt-[72px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-secondary mb-6">
            <Link href={`/${locale}/booking`} className="hover:text-primary transition-colors">Booking</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary font-medium">{t("select_court")}</span>
          </nav>

          {/* Back */}
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back_to_locations")}
          </Link>

          <h1 className="text-3xl font-heading font-bold text-text-primary mb-6">
            {t("select_court")}
          </h1>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8">
            {(["ALL", "INDOOR", "OUTDOOR"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === type
                    ? "bg-primary text-white"
                    : "bg-surface text-text-secondary border border-border hover:bg-muted"
                }`}
              >
                {type === "ALL" ? t("all") : type === "INDOOR" ? tLanding("indoor") : tLanding("outdoor")}
              </button>
            ))}
          </div>

          {/* Court Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourts.map((court) => (
              <Link
                key={court.id}
                href={`/${locale}/booking/${locationId}/${court.id}`}
                className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="h-40 overflow-hidden">
                  <img src={court.image} alt={court.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {court.type === "INDOOR" ? (
                      <Building2 className="h-4 w-4 text-primary" />
                    ) : (
                      <Sun className="h-4 w-4 text-cta" />
                    )}
                    <span className="text-xs font-medium text-text-secondary uppercase">{court.type}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-text-primary">{court.name}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">{court.surface}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {court.facilities.map((f, i) => (
                      <span key={i} className="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm text-text-secondary">{t("starting_from")}</p>
                    <p className="text-lg font-bold text-primary">
                      {formatPrice(court.priceFrom)}
                      <span className="text-sm font-normal text-text-secondary">/jam</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredCourts.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              {t("no_courts_found")}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
