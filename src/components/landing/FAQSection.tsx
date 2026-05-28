"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const t = useTranslations("landing");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Bagaimana cara booking lapangan?",
      answer: "Pilih lokasi dan lapangan, pilih tanggal & jam yang tersedia, lalu konfirmasi booking. Anda bisa memilih bayar DP (50%) atau bayar full. Setelah itu, upload bukti transfer dan tunggu konfirmasi admin.",
    },
    {
      question: "Berapa DP yang harus dibayar?",
      answer: "DP sebesar 50% dari total harga booking. Anda juga bisa memilih untuk bayar full (100%) agar tidak perlu bayar sisa di tempat. Batas waktu pembayaran adalah 1 jam setelah booking dibuat.",
    },
    {
      question: "Bisakah membatalkan booking?",
      answer: "Ya, Anda bisa membatalkan booking. Refund: H-1 (>24 jam) mendapat refund 100% DP, hari H (>3 jam sebelum) refund 50%, dan kurang dari 3 jam sebelum jadwal tidak ada refund.",
    },
    {
      question: "Apa keuntungan jadi member?",
      answer: "Member otomatis didapat saat registrasi (gratis). Kumpulkan poin dari setiap booking untuk naik tier (Bronze → Silver → Gold). Benefit termasuk diskon hingga 20%, priority booking di jam prime-time, dan free extra time.",
    },
    {
      question: "Jam operasional lapangan?",
      answer: "Semua lokasi JayField beroperasi setiap hari dari jam 08:00 pagi hingga 00:00 (tengah malam). Durasi booking bersifat fleksibel, mulai dari 1 jam.",
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer: "Kami menerima transfer bank (BCA, BNI, Mandiri, BRI) dan e-wallet (Dana, OVO, GoPay). Cukup pilih metode, transfer, dan upload bukti pembayaran.",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text-primary">
            {t("faq_title")}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-text-secondary shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-4" : "max-h-0"
                }`}
              >
                <p className="px-6 text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
