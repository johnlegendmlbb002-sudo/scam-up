"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/game-banners")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const items = data?.data ?? [];
        setBanners(items);
      })
      .catch(() => {
        if (mounted) setBanners([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (!banners?.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const goNext = () =>
    banners.length && setCurrent((prev) => (prev + 1) % banners.length);

  const goPrev = () =>
    banners.length &&
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  if (loading)
    return <Loader />;

  if (!banners?.length) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-6">
      <div className="overflow-hidden rounded-3xl shadow-2xl h-[300px] md:h-[400px] relative group">
        {banners.map((banner, i) => (
          <Link
            key={i}
            href={"/"}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={banner.bannerImage || logo}
              alt={banner.bannerTitle}
              fill
              className="object-cover"
              priority={i === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Banner Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">
                  {banner.bannerTitle}
                </h2>
                <p className="text-gray-300 text-sm md:text-base line-clamp-2">
                  {banner.description || "Explore this amazing game now!"}
                </p>
                <button className="mt-4 px-6 py-2 bg-[var(--accent)] hover:bg-[var(--accent-dark)] rounded-full font-semibold transition-all transform hover:scale-105">
                  Play Now
                </button>
              </div>
            </div>
          </Link>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress Bar Indicator */}
      <div className="mt-4">
        <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[var(--accent)] transition-all duration-1000"
            style={{ width: `${((current + 1) / banners.length) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{current + 1} / {banners.length}</span>
          <span>{banners[current]?.bannerTitle}</span>
        </div>
      </div>
    </div>
  );
}