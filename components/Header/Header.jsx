"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FiPlus } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/logo.png";

/* ================= CONFIG ================= */

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Region", href: "/region" },
  { label: "Services", href: "/services" },
];

const USER_MENU_LINKS = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Customer Support", href: "/dashboard" },
  { label: "Account Settings", href: "/dashboard" },
];

const ROLE_LINKS = {
  owner: { label: "Admin Panel", href: "/owner-panal" },
  admin: { label: "Reseller Panel", href: "/admin-panal" },
};

/* ================= COMPONENT ================= */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);

  /* -------- FETCH USER -------- */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
        else localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  /* -------- SCROLL EFFECT -------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------- CLOSE DROPDOWN ON OUTSIDE CLICK -------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* -------- LOGOUT -------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--card)]/80 border-b border-[var(--border)] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-2 h-16">

        {/* LOGO */}
        <Link href="/" className="flex items-center h-10 md:h-12">
          <Image
            src={logo}
            alt="Logo"
            width={93}
            height={33}
            priority
            className="object-contain w-auto h-full"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6 text-[var(--muted)]">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <ThemeToggle />

          {/* USER BUTTON */}
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold"
          >
            {user ? user.name?.[0]?.toUpperCase() : <FaUser />}
          </button>

          {/* USER DROPDOWN */}
          {userMenuOpen && !loading && (
            <div className="absolute right-0 top-14 w-64 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-4 z-50">

              {!user ? (
                <Link
                  href="/login"
                  onClick={() => setUserMenuOpen(false)}
                  className="block py-2 hover:text-[var(--accent)]"
                >
                  Login / Register
                </Link>
              ) : (
                <>
                  {/* WALLET */}
                  <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}>
                    <div className="flex items-center justify-between mb-3 px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                      <span className="font-semibold text-[var(--accent)]">
                        ₹{user.wallet}
                      </span>
                      <FiPlus className="text-[var(--accent)]" />
                    </div>
                  </Link>

                  {/* USER LINKS */}
                  {USER_MENU_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setUserMenuOpen(false)}
                      className="block py-2 hover:text-[var(--accent)]"
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* ROLE LINK */}
                  {ROLE_LINKS[user.userType] && (
                    <Link
                      href={ROLE_LINKS[user.userType].href}
                      onClick={() => setUserMenuOpen(false)}
                      className="block py-2 hover:text-[var(--accent)]"
                    >
                      {ROLE_LINKS[user.userType].label}
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-red-500 hover:text-red-400"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-60" : "max-h-0"
        } bg-[var(--card)] border-t border-[var(--border)]`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4 text-[var(--muted)]">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
