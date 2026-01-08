"use client";

import { JSX, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

interface AccountTabProps {
  userDetails: UserDetails;
}

export default function AccountTab({ userDetails }: AccountTabProps) {
  const [newPass, setNewPass] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  const handlePasswordUpdate = async () => {
    if (newPass.length < 6) {
      setPassError("Minimum 6 characters required");
      return;
    }

    setLoadingPass(true);

    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: userDetails.email || userDetails.phone,
          newPassword: newPass,
        }),
      });

      const data = await res.json();
      setLoadingPass(false);

      if (!data.success) {
        setPassError(data.message);
        return;
      }

      setNewPass("");
      setPassSuccess("Password updated successfully");
      setTimeout(() => setPassSuccess(""), 2500);
    } catch {
      setLoadingPass(false);
      setPassError("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <FiUser />
          Account
        </h2>
        <p className="text-[var(--muted)] text-sm sm:text-base mt-1">
          Manage your profile information and secure your account.
        </p>
      </div>

      {/* ================= PROFILE ================= */}
      <div className="rounded-2xl border border-[var(--border)]
                      bg-[var(--card)] p-5 sm:p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--accent)]/15
                          flex items-center justify-center
                          text-xl font-bold text-[var(--accent)]">
            {userDetails.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-semibold text-lg">
              {userDetails.name}
            </p>
            <p className="text-xs text-[var(--muted)]">
              Account Holder
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow icon={<FiMail />} label="Email" value={userDetails.email} />
          <InfoRow icon={<FiPhone />} label="Phone" value={userDetails.phone} />
        </div>
      </div>

      {/* ================= SECURITY ================= */}
      <div className="rounded-2xl border border-[var(--border)]
                      bg-[var(--card)] p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 mb-2">
          <FiLock />
          Security
        </h3>
        <p className="text-sm text-[var(--muted)] mb-4">
          Change your password to keep your account secure.
        </p>

        {/* Alerts */}
        {passSuccess && (
          <div className="mb-4 rounded-xl bg-green-500/10
                          text-green-500 px-4 py-2 text-sm
                          flex items-center gap-2">
            <FiCheckCircle />
            {passSuccess}
          </div>
        )}
        {passError && (
          <div className="mb-4 rounded-xl bg-red-500/10
                          text-red-500 px-4 py-2 text-sm
                          flex items-center gap-2">
            <FiAlertCircle />
            {passError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="password"
            placeholder="New password (min 6 characters)"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
              setPassError("");
            }}
            className="flex-1 p-3 sm:p-4 rounded-xl
                       border border-[var(--border)]
                       bg-transparent
                       focus:outline-none
                       focus:ring-2 focus:ring-[var(--accent)]"
          />

          <button
            disabled={loadingPass}
            onClick={handlePasswordUpdate}
            className="sm:min-w-[220px] px-6 py-3 rounded-xl
                       bg-[var(--accent)] text-white
                       font-medium transition
                       hover:opacity-90
                       disabled:opacity-50
                       disabled:cursor-not-allowed"
          >
            {loadingPass ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white
                                 border-t-transparent rounded-full animate-spin"></span>
                Updating
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL HELPER ================= */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl
                    border border-[var(--border)] p-4">
      <div className="text-[var(--muted)] mt-0.5">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[var(--muted)]">{label}</p>
        <p className="font-medium break-all">{value}</p>
      </div>
    </div>
  );
}
