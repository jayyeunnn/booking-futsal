"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Search } from "lucide-react";

const MOCK_BOOKINGS = [
  { id: "#1234", user: "Ahmad Rizki", court: "Lapangan 1 — Lokasi A", date: "28/05/26", time: "19:00-21:00", total: "Rp 500.000", status: "PENDING_CONFIRMATION" },
  { id: "#1233", user: "Budi Santoso", court: "Lapangan 2 — Lokasi A", date: "28/05/26", time: "20:00-22:00", total: "Rp 500.000", status: "CONFIRMED" },
  { id: "#1232", user: "Citra Dewi", court: "Lapangan 1 — Lokasi B", date: "27/05/26", time: "18:00-20:00", total: "Rp 400.000", status: "COMPLETED" },
  { id: "#1231", user: "Doni Pratama", court: "Lapangan 3 — Lokasi A", date: "27/05/26", time: "17:00-19:00", total: "Rp 500.000", status: "CANCELLED" },
  { id: "#1230", user: "Eko Prasetyo", court: "Lapangan 2 — Lokasi B", date: "26/05/26", time: "19:00-21:00", total: "Rp 320.000", status: "COMPLETED" },
  { id: "#1229", user: "Fajar Nugroho", court: "Lapangan 1 — Lokasi A", date: "26/05/26", time: "20:00-22:00", total: "Rp 500.000", status: "CONFIRMED" },
];

const STATUS_STYLES: Record<string, string> = {
  PENDING_PAYMENT: "bg-warning/10 text-warning",
  PENDING_CONFIRMATION: "bg-info/10 text-info",
  CONFIRMED: "bg-accent/10 text-accent",
  COMPLETED: "bg-primary/10 text-primary",
  CANCELLED: "bg-error/10 text-error",
  EXPIRED: "bg-gray-100 text-gray-500",
};

export default function AdminBookingsPage() {
  const t = useTranslations("admin");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = MOCK_BOOKINGS.filter((b) => {
    const matchSearch = b.user.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search);
    const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-text-primary mb-6">{t("bookings")}</h1>

      {/* Filters */}
      <div className="bg-surface border border-border rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input type="text" placeholder="Cari nama/ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="ALL">Semua Status</option>
            <option value="PENDING_CONFIRMATION">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="px-4 py-3 text-left font-semibold text-text-primary">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">User</th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">Lapangan</th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">Tanggal</th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">Waktu</th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">Total</th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-text-secondary">{b.id}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">{b.user}</td>
                  <td className="px-4 py-3 text-text-secondary">{b.court}</td>
                  <td className="px-4 py-3 text-text-secondary">{b.date}</td>
                  <td className="px-4 py-3 text-text-secondary">{b.time}</td>
                  <td className="px-4 py-3 font-medium">{b.total}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLES[b.status] || ""}`}>
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {b.status === "PENDING_CONFIRMATION" && (
                      <div className="flex gap-1">
                        <button className="text-xs bg-accent text-white hover:bg-accent/80 px-2.5 py-1 rounded transition-colors">{t("confirm")}</button>
                        <button className="text-xs bg-error text-white hover:bg-error/80 px-2.5 py-1 rounded transition-colors">{t("reject")}</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-8 text-text-secondary">Tidak ada booking ditemukan.</div>
        )}
      </div>
    </div>
  );
}
