"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const locale = pathname.split("/")[1] || "id";
  const switchLocale = locale === "id" ? "en" : "id";

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/locations`, label: t("locations") },
    { href: `/${locale}/promo`, label: t("promo") },
    { href: `/${locale}/faq`, label: t("faq") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl font-heading font-bold text-primary">
              Jay<span className="text-cta">Field</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-primary font-body font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Locale Switcher */}
            <Link
              href={pathname.replace(`/${locale}`, `/${switchLocale}`)}
              className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
            >
              <Globe className="h-4 w-4" />
              {locale.toUpperCase()}
            </Link>

            {/* Auth Buttons */}
            <Link
              href={`/${locale}/login`}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              {tCommon("login")}
            </Link>
            <Link
              href={`/${locale}/booking`}
              className="bg-cta hover:bg-cta-hover text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              {tCommon("book_now")}
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-text-secondary hover:text-primary font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link
              href={`/${locale}/login`}
              className="block py-2 text-text-secondary hover:text-primary font-medium"
            >
              {tCommon("login")}
            </Link>
            <Link
              href={`/${locale}/booking`}
              className="block w-full text-center bg-cta hover:bg-cta-hover text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
            >
              {tCommon("book_now")}
            </Link>
            <Link
              href={pathname.replace(`/${locale}`, `/${switchLocale}`)}
              className="flex items-center gap-2 py-2 text-sm text-text-secondary"
            >
              <Globe className="h-4 w-4" />
              {switchLocale === "en" ? "English" : "Indonesia"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
