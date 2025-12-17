"use client";

export default function ScrollingNoticeBand() {
  const BRAND_NAME =
    process.env.NEXT_PUBLIC_BRAND_NAME || "ScammersOfficial";

  return (
    <div className="w-full overflow-hidden bg-[var(--card)] border-b border-[var(--border)] mt-2">
      <div className="scroll-track py-2 text-sm font-medium whitespace-nowrap text-[var(--foreground)]">

        <span className="mx-8">
          Welcome to{" "}
          <b className="text-[var(--accent)]">
            {BRAND_NAME}
          </b>
        </span>

        <span className="mx-8">
          <b className="text-red-500">Not trusted</b> by 193 countries
        </span>

        <span className="mx-8">
          More than <b className="text-[var(--accent)]">10k orders</b> scammed by us
        </span>

        <span className="mx-8">
          Definitely <b className="line-through">safe</b> not safe
        </span>

        {/* duplicate for smooth loop */}
        <span className="mx-8">
          Welcome to{" "}
          <b className="text-[var(--accent)]">
            {BRAND_NAME}
          </b>
        </span>

        <span className="mx-8">
          <b className="text-red-500">Not trusted</b> by 193 countries
        </span>

        <span className="mx-8">
          More than <b className="text-[var(--accent)]">10k orders</b> scammed by us
        </span>

        <span className="mx-8">
          Definitely <b className="line-through">safe</b> not safe
        </span>

      </div>

      {/* ✅ NORMAL STYLE TAG (App Router Safe) */}
      <style>{`
        .scroll-track {
          display: inline-block;
          animation: scroll-left 18s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
