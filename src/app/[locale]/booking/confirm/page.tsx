"use client";

import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Copy, CheckCircle, Upload, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";

const PAYMENT_METHODS = {
  bank: [
    { id: "bca", name: "BCA", account: "1234567890", holder: "PT JayField Indonesia" },
    { id: "bni", name: "BNI", account: "0987654321", holder: "PT JayField Indonesia" },
    { id: "mandiri", name: "Mandiri", account: "1122334455", holder: "PT JayField Indonesia" },
    { id: "bri", name: "BRI", account: "5566778899", holder: "PT JayField Indonesia" },
  ],
  ewallet: [
    { id: "dana", name: "Dana", account: "081234567890", holder: "JayField" },
    { id: "ovo", name: "OVO", account: "081234567890", holder: "JayField" },
    { id: "gopay", name: "GoPay", account: "081234567890", holder: "JayField" },
  ],
};

export default function BookingConfirmPage() {
  const t = useTranslations("booking");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = pathname.split("/")[1] || "id";

  const slotsParam = searchParams.get("slots") || "";
  const date = searchParams.get("date") || "";
  const total = parseInt(searchParams.get("total") || "0");
  const recurring = searchParams.get("recurring") === "true";
  const slots = slotsParam ? slotsParam.split(",") : [];

  const [paymentType, setPaymentType] = useState<"DP" | "FULL">("DP");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [step, setStep] = useState<"confirm" | "payment" | "upload">("confirm");
  const [copied, setCopied] = useState(false);

  const dpAmount = Math.ceil(total * 0.5);
  const payableAmount = paymentType === "DP" ? dpAmount : total;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "JAYFIELD10") {
      setPromoApplied(true);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedMethod = [...PAYMENT_METHODS.bank, ...PAYMENT_METHODS.ewallet].find((m) => m.id === paymentMethod);

  const startTime = slots[0] || "19:00";
  const endTime = slots.length > 0 ? `${(parseInt(slots[slots.length - 1]) + 1).toString().padStart(2, "0")}:00` : "21:00";

  // Step 1: Confirm & Choose Payment
  if (step === "confirm") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-muted pt-[72px]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <nav className="text-sm text-text-secondary mb-4">
              <Link href={`/${locale}/booking`} className="hover:text-primary">Booking</Link>
              <span className="mx-2">/</span>
              <span className="text-text-primary font-medium">{t("confirm_pay")}</span>
            </nav>

            <h1 className="text-3xl font-heading font-bold text-text-primary mb-6">{t("confirm_pay")}</h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left Panel */}
              <div className="lg:col-span-3 space-y-6">
                {/* Booking Details */}
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold mb-4">{t("booking_details")}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2"><span className="text-text-secondary w-24 shrink-0">Lokasi:</span><span className="text-text-primary font-medium">JayField Sudirman</span></div>
                    <div className="flex items-start gap-2"><span className="text-text-secondary w-24 shrink-0">Lapangan:</span><span className="text-text-primary font-medium">Lapangan 1 (Indoor, Vinyl)</span></div>
                    <div className="flex items-start gap-2"><span className="text-text-secondary w-24 shrink-0">Tanggal:</span><span className="text-text-primary font-medium">{date ? formatDate(date) : "-"}</span></div>
                    <div className="flex items-start gap-2"><span className="text-text-secondary w-24 shrink-0">Waktu:</span><span className="text-text-primary font-medium">{startTime} - {endTime} ({slots.length} jam)</span></div>
                    {recurring && <div className="flex items-start gap-2"><span className="text-text-secondary w-24 shrink-0">Recurring:</span><span className="text-accent font-medium">Setiap minggu ✓</span></div>}
                  </div>
                </div>

                {/* Payment Type */}
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold mb-4">{t("payment_type")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentType("DP")}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${paymentType === "DP" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 ${paymentType === "DP" ? "border-primary bg-primary" : "border-border"}`}>
                          {paymentType === "DP" && <div className="w-full h-full rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full" /></div>}
                        </div>
                        <span className="font-semibold text-text-primary">{t("dp_option")}</span>
                      </div>
                      <p className="text-lg font-bold text-primary ml-6">{formatPrice(dpAmount)}</p>
                      <p className="text-xs text-text-secondary ml-6">{t("dp_desc")}</p>
                    </button>
                    <button
                      onClick={() => setPaymentType("FULL")}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${paymentType === "FULL" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 ${paymentType === "FULL" ? "border-primary bg-primary" : "border-border"}`}>
                          {paymentType === "FULL" && <div className="w-full h-full rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full" /></div>}
                        </div>
                        <span className="font-semibold text-text-primary">{t("full_option")}</span>
                      </div>
                      <p className="text-lg font-bold text-primary ml-6">{formatPrice(total)}</p>
                      <p className="text-xs text-text-secondary ml-6">{t("full_desc")}</p>
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold mb-4">{t("payment_method")}</h3>
                  <p className="text-sm text-text-secondary mb-3">{t("bank_transfer")}:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {PAYMENT_METHODS.bank.map((m) => (
                      <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${paymentMethod === m.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-text-secondary"}`}>
                        {m.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{t("e_wallet")}:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PAYMENT_METHODS.ewallet.map((m) => (
                      <button key={m.id} onClick={() => setPaymentMethod(m.id)} className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${paymentMethod === m.id ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-text-secondary"}`}>
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h3 className="font-heading font-semibold mb-3">{t("promo_code")}</h3>
                  <div className="flex gap-2">
                    <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder={t("promo_input_placeholder")} className="flex-1 h-11 px-4 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
                    <Button variant="default" size="default" onClick={handleApplyPromo}>{t("apply_promo")}</Button>
                  </div>
                  {promoApplied && <p className="mt-2 text-sm text-accent">✓ {t("promo_success")} Diskon 10%</p>}
                </div>
              </div>

              {/* Right Panel - Summary */}
              <div className="lg:col-span-2">
                <div className="bg-surface border border-border rounded-xl p-6 sticky top-[90px]">
                  <h3 className="font-heading font-semibold mb-4">{t("payment_summary")}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-text-secondary">{t("subtotal")} ({slots.length} jam)</span><span>{formatPrice(total)}</span></div>
                    {promoApplied && <div className="flex justify-between text-accent"><span>Promo JAYFIELD10 (10%)</span><span>-{formatPrice(Math.ceil(total * 0.1))}</span></div>}
                  </div>
                  <div className="border-t border-border my-3 pt-3">
                    <div className="flex justify-between font-bold text-lg"><span>{t("total")}</span><span className="text-primary">{formatPrice(promoApplied ? Math.ceil(total * 0.9) : total)}</span></div>
                  </div>
                  {paymentType === "DP" && (
                    <div className="bg-primary/5 rounded-lg p-3 mt-3 space-y-1 text-sm">
                      <div className="flex justify-between font-semibold"><span>{t("dp_amount")} (50%)</span><span className="text-primary">{formatPrice(promoApplied ? Math.ceil(total * 0.9 * 0.5) : dpAmount)}</span></div>
                      <div className="flex justify-between text-text-secondary"><span>{t("remaining")}</span><span>{formatPrice(promoApplied ? Math.ceil(total * 0.9 * 0.5) : dpAmount)}</span></div>
                    </div>
                  )}

                  <Button variant="cta" className="w-full h-12 mt-6 text-base font-semibold" disabled={!paymentMethod} onClick={() => setStep("payment")}>
                    {t("confirm_booking")}
                  </Button>

                  <div className="flex items-center gap-2 mt-3 text-xs text-text-secondary">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{t("payment_deadline")}: 1 jam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Step 2: Payment Instruction + Upload
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-muted pt-[72px]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-surface border border-border rounded-2xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">{t("booking_success")}</h2>
            <p className="text-text-secondary mb-6">{t("transfer_to")}:</p>

            {/* Payment Details */}
            {selectedMethod && (
              <div className="bg-muted rounded-xl p-5 text-left mb-6">
                <p className="text-sm text-text-secondary mb-1">{selectedMethod.name}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-mono font-bold text-text-primary">{selectedMethod.account}</p>
                    <p className="text-sm text-text-secondary">a.n. {selectedMethod.holder}</p>
                  </div>
                  <button onClick={() => handleCopy(selectedMethod.account)} className="flex items-center gap-1 text-sm text-primary hover:text-primary-light transition-colors">
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {t("copy")}
                  </button>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">{t("amount")}:</span>
                    <span className="font-bold text-primary text-lg">{formatPrice(payableAmount)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Countdown */}
            <div className="flex items-center justify-center gap-2 text-sm text-warning mb-6">
              <Clock className="h-4 w-4" />
              <span>{t("payment_deadline")}: 59:00</span>
            </div>

            {/* Upload Proof */}
            <div className="border-t border-border pt-6">
              <h3 className="font-heading font-semibold mb-3 text-left">{t("upload_proof")}:</h3>
              <div className="border-2 border-dashed border-border rounded-xl p-8 hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-text-secondary mx-auto mb-3" />
                <p className="text-sm text-text-secondary">{t("upload_hint")}</p>
              </div>
              <Button variant="cta" className="w-full h-12 mt-4 text-base font-semibold">
                {t("upload_submit")}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
