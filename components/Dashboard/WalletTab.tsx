"use client";

import { useState, useEffect } from "react";
import { FaWallet, FaGooglePay, FaBitcoin } from "react-icons/fa";

interface WalletTabProps {
  walletBalance: number;
  setWalletBalance: (balance: number) => void;
}

export default function WalletTab({
  walletBalance,
  setWalletBalance,
}: WalletTabProps) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [storedPhone, setStoredPhone] = useState("");

  useEffect(() => {
    const phone = sessionStorage.getItem("phone");
    if (phone) setStoredPhone(phone);
  }, []);

  const handleProceed = async () => {
    if (!amount || Number(amount) < 1) {
      setAmountError("Minimum amount is ₹1");
      return;
    }

    if (!method) {
      setAmountError("Please select a payment method");
      return;
    }

    if (!storedPhone) {
      alert("Phone number not found. Please log in again.");
      return;
    }

    setLoading(true);
    const userId = sessionStorage.getItem("userId");

    const res = await fetch("/api/wallet/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(amount),
        mobile: storedPhone,
        userId,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      alert(data.message);
      return;
    }

    sessionStorage.setItem("pending_order", data.orderId);
    window.location.href = data.paymentUrl;
  };

  return (
    <div className="max-w-3xl space-y-6">

      {/* ================= HEADER ================= */}
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <FaWallet />
        Wallet
      </h2>

      {/* ================= BALANCE CARD ================= */}
      <div className="p-6 rounded-2xl border border-[var(--border)]
                      bg-[var(--card)] shadow-sm">
        <p className="text-sm text-[var(--muted)]">Current Balance</p>
        <p className="text-3xl font-bold mt-1">
          ₹{walletBalance}
        </p>
      </div>

      {/* ================= ADD MONEY ================= */}
      <div className="p-6 rounded-2xl bg-[var(--background)]
                      border border-[var(--border)] shadow-lg">
        <div className="space-y-5">

          {/* Amount */}
          <div>
            <label className="font-semibold text-sm">
              Enter Amount
            </label>
            <input
              type="number"
              value={amount}
              placeholder="Minimum ₹1"
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError("");
              }}
              className="w-full p-3 mt-1 rounded-xl
                         border bg-[var(--card)]
                         border-[var(--border)]
                         focus:ring-2 focus:ring-[var(--accent)]
                         outline-none"
            />
            {amountError && (
              <p className="text-red-500 text-sm mt-1">
                {amountError}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="font-semibold text-sm">
              Select Payment Method
            </label>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {/* UPI */}
              <button
                onClick={() => setMethod("upi")}
                className={`p-4 rounded-xl border transition
                            flex items-center justify-center gap-2
                  ${
                    method === "upi"
                      ? "border-[var(--accent)] bg-[var(--accent)]/10"
                      : "border-[var(--border)] hover:bg-[var(--card)]"
                  }`}
              >
                <FaGooglePay />
                UPI
              </button>

              {/* USDT (Disabled) */}
              <button
                disabled
                className="p-4 rounded-xl border
                           flex items-center justify-center gap-2
                           opacity-50 cursor-not-allowed"
              >
                <FaBitcoin />
                USDT (TRC20)
              </button>
            </div>
          </div>

          {/* Proceed */}
          <button
            onClick={handleProceed}
                        disabled={true}

            // disabled={loading || !method}
            className="w-full p-3 rounded-xl
                       bg-[var(--accent)] text-white
                       font-medium transition
                       disabled:opacity-50
                       disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>

          {!method && (
            <p className="text-xs text-[var(--muted)] text-center">
              Select a payment method to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
