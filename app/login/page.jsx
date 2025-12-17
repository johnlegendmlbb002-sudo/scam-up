"use client";

import { useState } from "react";

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  const [loginData, setLoginData] = useState({ user: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const isGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const isPhone = (phone) => /^[0-9]{10}$/.test(phone);
  const minLen = (txt, min) => txt.length >= min;
  const maxLen = (txt, max) => txt.length <= max;

  const handleLogin = async () => {
    let errs = {};
    if (!loginData.user.trim()) errs.user = "We need something to scam… email or phone";
    if (!loginData.password.trim()) errs.password = "Password missing. Scam failed.";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!data.success) {
      setErrors({ user: data.message || "Nice try. Wrong details." });
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("phone", data.user.phone);
    localStorage.setItem("userId", data.user.userId);

    setSuccess("Login successful. Unfortunately.");
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  const handleRegister = async () => {
    let errs = {};

    if (!regData.name.trim()) errs.name = "Fake names also need to exist";
    else if (!minLen(regData.name, 3)) errs.name = "Too short to scam";
    else if (!maxLen(regData.name, 15)) errs.name = "Too long. Suspicious.";

    if (!regData.email.trim()) errs.email = "We prefer Gmail victims";
    else if (!isGmail(regData.email)) errs.email = "Only Gmail allowed here";

    if (!regData.phone.trim()) errs.phone = "How do we call you later?";
    else if (!isPhone(regData.phone)) errs.phone = "10 digits. No excuses.";

    if (!regData.password.trim()) errs.password = "Password missing";
    else if (!minLen(regData.password, 6))
      errs.password = "Too weak. Even scammers need standards.";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });

    const data = await res.json();

    if (!data.success) {
      setErrors({ email: data.message || "Already scammed before" });
      return;
    }

    setSuccess("Account created. Please log in to get disappointed.");
    setTab("login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6 text-[var(--foreground)]">
      <div className="bg-[var(--card)] border border-[var(--border)] shadow-lg rounded-xl p-6 w-full max-w-md">

        {/* Header */}
        <h1 className="text-xl font-bold text-center mb-2">
          ScammersOfficial Access Portal
        </h1>
        <p className="text-xs text-center text-[var(--muted)] mb-6">
          Not trusted by 193 countries
        </p>

        {/* Tabs */}
        <div className="flex mb-6 border-b border-[var(--border)]">
          <button
            className={`flex-1 py-3 font-semibold ${
              tab === "login"
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)]"
            }`}
            onClick={() => {
              setErrors({});
              setSuccess("");
              setTab("login");
            }}
          >
            Login (Victim)
          </button>

          <button
            className={`flex-1 py-3 font-semibold ${
              tab === "register"
                ? "text-[var(--accent)] border-b-2 border-[var(--accent)]"
                : "text-[var(--muted)]"
            }`}
            onClick={() => {
              setErrors({});
              setSuccess("");
              setTab("register");
            }}
          >
            Register (New Target)
          </button>
        </div>

        {success && (
          <p className="text-green-500 text-center mb-4 font-medium">
            {success}
          </p>
        )}

        {/* LOGIN */}
        {tab === "login" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Email or Phone (we promise nothing)"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={loginData.user}
              onChange={(e) =>
                setLoginData({ ...loginData, user: e.target.value })
              }
            />
            {errors.user && (
              <p className="text-red-500 text-sm">{errors.user}</p>
            )}

            <input
              type="password"
              placeholder="Password (we will forget it anyway)"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-semibold"
            >
              Enter the Scam
            </button>
          </div>
        )}

        {/* REGISTER */}
        {tab === "register" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Real or Fake Name"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.name}
              onChange={(e) =>
                setRegData({ ...regData, name: e.target.value })
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <input
              type="email"
              placeholder="Gmail only (others are suspicious)"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.email}
              onChange={(e) =>
                setRegData({ ...regData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="text"
              placeholder="Phone Number (10 digits, no escape)"
              maxLength={10}
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.phone}
              onChange={(e) =>
                setRegData({ ...regData, phone: e.target.value })
              }
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}

            <input
              type="password"
              placeholder="Password (at least 6 chars, sadly)"
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]"
              value={regData.password}
              onChange={(e) =>
                setRegData({ ...regData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-semibold"
            >
              Join the Scam
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
    