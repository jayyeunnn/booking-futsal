"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CheckCircle, XCircle, Image } from "lucide-react";

const MOCK_PAYMENTS = [
  { id: "P-001", bookingId: "#1234", user: "Ahmad Rizki", court: "Lap 1, Lokasi A", date: "28 Mei 2026", time: "19:00-21:00", type: "DP 50%", amount: "Rp 250.000", method: "BCA", uploadedAt: "28 Mei 2026, 14:30", proof: "/placeholder-proof.jpg" },
  { id: "P-002", bookingId: "#1235", user: "Sari Indah", court: "Lap 2, Lokasi A", date: "28 Mei 2026", time: "20:00-22:00", type: "Full", amount: "Rp 500.000", method: "Dana", uploadedAt: "28 Mei 2026, 15:00", proof: "/placeholder-proof.jpg" },
  { id: "P-003", bookingId: "#1236", user: "Eko Prasetyo", court: "Lap 1, Lokasi B", date: "29 Mei 2026", time: "18:00-20:00", type: "DP 50%", amount: "Rp 200.000", method: "Mandiri", uploadedAt: "28 Mei 2026, 15:22", proof: "/placeholder-proof.jpg" },
];

export default function AdminPaymentsPage() {
  const t = useTranslations("admin");
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "rejected">("pending");
  const [viewProof, setViewProof] = useState<string | null>(null);

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-text-primary mb-6">{t("payments")}</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab("pending")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "pending" ? "bg-primary text-white" : "bg-surface border border-border text-text-secondary hover:bg-muted"}`}>
          Pending (3)
        </button>
        <button onClick={() => setActiveTab("confirmed")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "confirmed" ? "bg-primary text-white" : "bg-surface border border-border text-text-secondary hover:bg-muted"}`}>
          Confirmed
        </button>
        <button onClick={() => setActiveTab("rejected")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "rejected" ? "bg-primary text-white" : "bg-surface border border-border text-text-secondary hover:bg-muted"}`}>
          Rejected
        </button>
      </div>

      {/* Payment Cards */}
      <div className="space-y-4">
        {MOCK_PAYMENTS.map((p) => (
          <div key={p.id} className="bg-surface border border-border rounded-xl p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left: Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-text-secondary">{p.bookingId}</span>
                  <span className="text-sm font-semibold text-text-primary">— {p.user}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
                  <div><span className="font-medium text-text-primary">Lapangan:</span> {p.court}</div>
                  <div><span className="font-medium text-text-primary">Tanggal:</span> {p.date}, {p.time}</div>
                  <div><span className="font-medium text-text-primary">Tipe:</span> {p.type}</div>
                  <div><span className="font-medium text-text-primary">Metode:</span> {p.method}</div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium text-text-primary">Jumlah: </span>
                  <span className="text-lg font-bold text-primary">{p.amount}</span>
                </div>
                <p className="text-xs text-text-secondary mt-1">Upload: {p.uploadedAt}</p>
              </div>

              {/* Right: Proof + Actions */}
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setViewProof(p.proof)}
                  className="w-24 h-24 bg-muted border border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <Image className="h-6 w-6 text-text-secondary" />
                  <span className="text-xs text-text-secondary">Lihat Bukti</span>
                </button>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 bg-accent hover:bg-accent/80 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    <CheckCircle className="h-4 w-4" />
                    {t("confirm")}
                  </button>
                  <button className="flex items-center gap-1.5 bg-error hover:bg-error/80 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    <XCircle className="h-4 w-4" />
                    {t("reject")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Proof Modal */}
      {viewProof && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setViewProof(null)}>
          <div className="bg-surface rounded-xl p-4 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold">Bukti Transfer</h3>
              <button onClick={() => setViewProof(null)} className="text-text-secondary hover:text-text-primary">✕</button>
            </div>
            <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-text-secondary text-sm">Bukti transfer image placeholder</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
