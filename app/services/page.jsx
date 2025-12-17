"use client";

import { FiUsers, FiGlobe, FiZap, FiCode } from "react-icons/fi";

export default function ServicesPage() {
  const whatsappLink = "https://wa.me/916372305866";

const services = [
  {
    title: "Become a Reseller",
    desc: "Resell top-ups under our name while we pretend nothing suspicious is happening. Low effort, high disappointment.",
    icon: FiUsers,
    badge: "Available • Questionable",
    active: true,
  },
  {
    title: "Website Whitelabel",
    desc: "Get your own branded top-up website and act like you built it yourself. We handle everything quietly in the background.",
    icon: FiGlobe,
    badge: "Available • Not Trusted",
    active: true,
  },
  {
    title: "Custom Topup Website",
    desc: "A fully custom top-up website tailored to your needs, mistakes, and bad decisions.",
    icon: FiZap,
    badge: "Available • Risk Included",
    active: true,
  },
  {
    title: "API Services",
    desc: "Direct API access so you can automate everything and look professional while doing it.",
    icon: FiCode,
    badge: "Coming Soon • Suspicious",
    active: false,
  },
];


  return (
    <section className="min-h-screen px-6 py-10 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-5xl mx-auto text-center">

        {/* Header */}
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Our Services
        </h1>
        <p className="text-[var(--muted)] text-lg mb-14">
          Cheapest & reliable solutions to grow your topup business
        </p>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <div
                key={i}
                onClick={() => service.active && window.open(whatsappLink, "_blank")}
                className={`relative p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]
                transition-all text-left
                ${service.active
                  ? "cursor-pointer hover:border-[var(--accent)]/40 hover:shadow-lg"
                  : "opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Badge */}
                <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full 
                  bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                  {service.badge}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 
                  flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[var(--accent)]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {service.desc}
                </p>

                {service.active && (
                  <p className="mt-4 text-sm font-medium text-[var(--accent)]">
                    Contact on WhatsApp →
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
