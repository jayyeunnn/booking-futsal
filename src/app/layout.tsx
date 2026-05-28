import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JayField — Booking Lapangan Futsal",
  description:
    "Booking lapangan futsal jadi lebih mudah. Pilih, pesan, dan main. Semudah itu.",
  keywords: ["futsal", "booking", "lapangan", "jayfield", "sport"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn(inter.variable, montserrat.variable)}>
      <body className="font-body antialiased bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
