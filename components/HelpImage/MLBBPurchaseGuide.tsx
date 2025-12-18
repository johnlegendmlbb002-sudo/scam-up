"use client";

import {
  FaShoppingCart,
  FaIdCard,
  FaWallet,
  FaMoneyBillWave,
  FaGem,
} from "react-icons/fa";

const steps = [
  {
    title: "Choose Package",
    desc: "Select the diamond pack you want.",
    icon: FaShoppingCart,
  },
  {
    title: "Enter Player Details",
    desc: "Fill Player ID & Zone ID correctly.",
    icon: FaIdCard,
  },
  {
    title: "Payment Method",
    desc: "Choose UPI or wallet payment.",
    icon: FaWallet,
  },
  {
    title: "Complete Payment",
    desc: "Pay securely using selected method.",
    icon: FaMoneyBillWave,
  },
  {
    title: "Instant Delivery",
    desc: "Diamonds credited instantly.",
    icon: FaGem,
  },
];

export default function MLBBPurchaseGuide() {
  return (
    <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-5">
      {/* Header */}
      <h3 className="text-lg font-semibold mb-4">
        How It Works
      </h3>

      {/* Timeline */}
      <div className="relative pl-6 space-y-5">
        {/* Vertical Line */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-[var(--border)]" />

        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={index} className="relative flex gap-4">
              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-white text-xs">
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 rounded-xl bg-[var(--muted-bg)] p-4">
                <div className="flex items-center gap-3 mb-1">
                  <Icon className="text-[var(--accent)]" />
                  <p className="font-medium">{step.title}</p>
                </div>
                <p className="text-sm text-[var(--muted)]">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
