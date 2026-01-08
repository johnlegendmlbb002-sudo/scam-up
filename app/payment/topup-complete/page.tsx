"use client";

import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";

export default function TopupComplete() {
  const [status, setStatus] = useState("checking"); // checking | success | failed
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const orderId = sessionStorage.getItem("pending_topup_order");

    if (!orderId) {
      setStatus("failed");
      setMessage("Order not found");
      return;
    }

    async function verify() {
      try {
                const token = sessionStorage.getItem("token");

        const res = await fetch("/api/order/verify-topup-payment", {
          method: "POST",
   headers: {
        Authorization: `Bearer ${token}`,
      },
                body: JSON.stringify({ orderId }),
        });

        const data = await res.json();

        if (data?.success) {
          setStatus("success");
 setMessage("Oops… we couldn’t scam you 😔");
          // Optional cleanup
          sessionStorage.removeItem("pending_topup_order");
        } else {
          setStatus("failed");
          setMessage("Mission failed. Try again next time 😏");
        }
      } catch (err) {
        console.error("Topup verification error:", err);
        setStatus("failed");
        setMessage("Something went wrong (not in our favor)");
      }
    }

    verify();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-lg p-8 text-center">

        {/* STATUS ICON */}
        <div className="flex justify-center mb-4">
          {status === "checking" && (
            <FaSpinner className="text-4xl animate-spin text-[var(--accent)]" />
          )}
          {status === "success" && (
            <FaCheckCircle className="text-5xl text-green-500" />
          )}
          {status === "failed" && (
            <FaTimesCircle className="text-5xl text-red-500" />
          )}
        </div>

        {/* MESSAGE */}
        <h1 className="text-2xl font-bold mb-2">{message}</h1>

        <p className="text-sm text-[var(--muted)]">
          {status === "checking" &&
            "Please wait… we’re checking if luck is on our side."}

          {status === "success" &&
            "You got your top-up successfully. Sadly, our evil plans failed this time. See you in the next scam 😈"}

          {status === "failed" &&
            "If money was deducted, don’t worry — delivery or refund will happen. We’ll try harder next time 😉"}
        </p>

        {/* ACTION */}
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-black hover:opacity-90 transition"
        >
          Back to Scam Hub
        </button>
      </div>
    </div>
  );
}
