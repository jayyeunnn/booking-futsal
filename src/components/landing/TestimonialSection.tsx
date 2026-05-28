"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";

export default function TestimonialSection() {
  const t = useTranslations("landing");

  const testimonials = [
    {
      name: "Ahmad Rizki",
      tier: "Gold Member",
      rating: 5,
      comment: "Lapangannya bagus, bersih dan terawat. Booking online gak ribet sama sekali. Recommended!",
      avatar: "AR",
    },
    {
      name: "Budi Santoso",
      tier: "Silver Member",
      rating: 5,
      comment: "Proses booking super gampang, tinggal pilih lapangan dan jam, langsung bayar DP. Suka banget!",
      avatar: "BS",
    },
    {
      name: "Doni Pratama",
      tier: "Bronze Member",
      rating: 5,
      comment: "Harga murah, lapangan bagus, fasilitas lengkap. Parkir luas dan ada kantin juga. Top!",
      avatar: "DP",
    },
    {
      name: "Sari Indah",
      tier: "Gold Member",
      rating: 4,
      comment: "Tempatnya strategis dan bersih. Staff ramah. Poin membernya juga bermanfaat banget!",
      avatar: "SI",
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
            {t("testimonial_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-warning fill-warning" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="h-5 w-5 text-primary/20 absolute -top-1 -left-1" />
                <p className="text-sm text-text-secondary leading-relaxed pl-4">
                  {testimonial.comment}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{testimonial.name}</p>
                  <p className="text-xs text-text-secondary">{testimonial.tier}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
