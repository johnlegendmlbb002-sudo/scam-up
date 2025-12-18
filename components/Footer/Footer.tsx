"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaYoutube,
  FaHeart,
  FaWhatsapp,
} from "react-icons/fa6";


/* ===================== CONFIG ===================== */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "MewJi";

const BRAND = {
  first: BRAND_NAME.slice(0, 7),
  rest: BRAND_NAME.slice(7),
  description:
    "Fast, secure MLBB top-ups with instant delivery and 24×7 support — recharge diamonds in seconds.",
};

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Region", href: "/region" },
];

const SUPPORT_LINKS = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Contact Us", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/scammers_official__",
    icon: FaInstagram,
  },
 {
    label: "WhatsApp",
    href: "https://chat.whatsapp.com/F6zJm72CIGR27euQFZyzKa?mode=hqrt2", // change number if needed
    icon: FaWhatsapp,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@nerdgaming1284?si=LfIFELr3uKa41yZk",
    icon: FaYoutube,
  },
];

/* ===================== COMPONENT ===================== */

export default function Footer() {
  return (
    <footer className="mt-16 bg-[var(--card)] text-[var(--muted)] border-t border-[var(--border)]">

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-2 bg-gradient-to-r from-[var(--accent)] to-purple-500 bg-clip-text text-transparent">
              {BRAND.first}
              <span className="text-[var(--foreground)]">
                {BRAND.rest}
              </span>
            </h2>

            <p className="text-xs leading-relaxed max-w-[220px]">
              {BRAND.description}
            </p>
          </div>

          {/* Quick Links */}
          <FooterLinks title="Quick Links" links={QUICK_LINKS} />

          {/* Support Links */}
          <FooterLinks title="Support" links={SUPPORT_LINKS} />

          {/* Socials (Desktop) */}
          <div className="hidden md:flex flex-col gap-1.5">
            <FooterTitle>Connect With Us</FooterTitle>
            <div className="flex items-center gap-3">
              <SocialIcons />
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-[var(--border)] py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Socials (Mobile) */}
            <div className="flex md:hidden gap-4">
              <SocialIcons />
            </div>

            {/* Made By */}
            <p className="text-[10px] sm:text-xs text-center order-first sm:order-none">
              Made with{" "}
              <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-0.5 animate-pulse" />{" "}
              by{" "}
              <a
                href="https://wa.me/916372305866"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] font-medium hover:underline"
              >
                Blue Buff
              </a>
            </p>

            {/* Copyright */}
            <p className="text-[10px] sm:text-xs">
              © {new Date().getFullYear()} Blue Buff. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===================== SUB COMPONENTS ===================== */

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[var(--accent)] font-semibold text-xs sm:text-sm mb-1">
      {children}
    </h3>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FooterTitle>{title}</FooterTitle>

      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-xs sm:text-sm hover:text-[var(--accent)] transition"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function SocialIcons() {
  return (
    <>
      {SOCIALS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="hover:text-[var(--accent)] hover:scale-110 transition-all"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </>
  );
}
