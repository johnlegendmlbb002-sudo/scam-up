"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSliders, FiX } from "react-icons/fi";
import logo from "@/public/logo.png";

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);

  /* ================= FILTER STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az"); // az | za
  const [hideOOS, setHideOOS] = useState(false);

  /* ================= CONFIG ================= */
  const SPECIAL_MLBB_GAME = "MLBB SMALL";

  const outOfStockGames = [
    // "PUBG Mobile",
    "Genshin Impact",
    "Honor Of Kings",
    "TEST 1",
      "Wuthering of Waves",
    "Where Winds Meet"
  ];

  const isOutOfStock = (name) => outOfStockGames.includes(name);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data?.category || []);
        setGames(
          (data?.data?.games || []).map((g) =>
            g.gameName === "PUBG Mobile"
              ? { ...g, gameName: "BGMI" }
              : g
          )
        );
      });
  }, []);

  /* ================= ACTIVE FILTER COUNT ================= */
  const activeFilterCount =
    (sort !== "az" ? 1 : 0) + (hideOOS ? 1 : 0);

  /* ================= FILTER + SORT ================= */
  const processGames = (list) => {
    let filtered = [...list];

    if (hideOOS) {
      filtered = filtered.filter(
        (g) => !isOutOfStock(g.gameName)
      );
    }

    filtered.sort((a, b) =>
      sort === "az"
        ? a.gameName.localeCompare(b.gameName)
        : b.gameName.localeCompare(a.gameName)
    );

    return filtered;
  };

  /* ================= PIN MLBB GAME ================= */
  const injectSpecialGame = (cat) => {
    if (
      !cat.categoryTitle
        ?.toLowerCase()
        .includes("mobile legends")
    ) {
      return cat.gameId;
    }

    const specialGame = games.find(
      (g) => g.gameName === SPECIAL_MLBB_GAME
    );

    if (!specialGame) return cat.gameId;

    const withoutDuplicate = cat.gameId.filter(
      (g) => g.gameName !== SPECIAL_MLBB_GAME
    );

    return [specialGame, ...withoutDuplicate];
  };

  /* ================= GAME LIST ITEM ================= */
  const GameCard = ({ game }) => {
    const disabled = isOutOfStock(game.gameName);

    return (
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`flex items-center gap-4 p-3 rounded-xl border
        bg-[var(--card)] transition-all
        ${
          disabled
            ? "opacity-40 pointer-events-none"
            : "hover:border-[var(--accent)] hover:bg-[var(--card-hover)]"
        }`}
      >
        {/* IMAGE */}
        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className={`object-cover ${
              disabled ? "grayscale" : ""
            }`}
          />
        </div>

        {/* INFO */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold truncate">
            {game.gameName}
          </h3>
          <p className="text-xs text-[var(--muted)]">
            {game.gameFrom}
          </p>

          {!disabled && game.tagId && (
            <span
              className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: game.tagId.tagBackground,
                color: game.tagId.tagColor,
              }}
            >
              {game.tagId.tagName}
            </span>
          )}
        </div>

        {/* STATUS */}
        {disabled ? (
          <span className="text-xs px-2 py-1 rounded-full bg-red-600 text-white">
            Out
          </span>
        ) : (
          <span className="text-xs font-medium text-[var(--accent)]">
            View →
          </span>
        )}
      </Link>
    );
  };

  return (
    <section className="min-h-screen px-4 py-10 bg-[var(--background)] text-[var(--foreground)]">
      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto flex justify-end gap-3 mb-6">

        {activeFilterCount > 0 && (
          <button
            onClick={() => {
              setSort("az");
              setHideOOS(false);
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border
            bg-[var(--card)] text-sm hover:border-red-500 hover:text-red-500"
          >
            <FiX />
            Clear
          </button>
        )}

        <button
          onClick={() => setShowFilter(true)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl border
          bg-[var(--card)] hover:border-[var(--accent)]"
        >
          <FiSliders />
          <span className="text-sm font-medium">
            Sort & Filter
          </span>

          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-[10px] rounded-full
            bg-[var(--accent)] text-black font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ================= CATEGORY LIST ================= */}
      {category.map((cat, i) => {
        const merged = injectSpecialGame(cat);
        const filtered = processGames(merged);
        if (!filtered.length) return null;

        return (
          <div key={i} className="max-w-7xl mx-auto mb-10">
            <h2 className="text-lg font-bold mb-3 px-1">
              {cat.categoryTitle}
            </h2>

            <div className="flex flex-col gap-3">
              {filtered.map((game, index) => (
                <GameCard key={index} game={game} />
              ))}
            </div>
          </div>
        );
      })}

      {/* ================= ALL GAMES ================= */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-bold mb-3 px-1">
          All Games
        </h2>

        <div className="flex flex-col gap-3">
          {processGames(games).map((game, i) => (
            <GameCard key={i} game={game} />
          ))}
        </div>
      </div>

      {/* ================= FILTER SIDE SHEET ================= */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setShowFilter(false)}
          />

          <div className="w-80 bg-[var(--card)] p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">
                Sort & Filters
              </h3>
              <button onClick={() => setShowFilter(false)}>
                <FiX />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium mb-2">
                Sort
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSort("az")}
                  className={`flex-1 py-2 rounded-xl border ${
                    sort === "az"
                      ? "border-[var(--accent)]"
                      : ""
                  }`}
                >
                  A – Z
                </button>
                <button
                  onClick={() => setSort("za")}
                  className={`flex-1 py-2 rounded-xl border ${
                    sort === "za"
                      ? "border-[var(--accent)]"
                      : ""
                  }`}
                >
                  Z – A
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm mb-6">
              <input
                type="checkbox"
                checked={hideOOS}
                onChange={(e) =>
                  setHideOOS(e.target.checked)
                }
              />
              Hide Out-of-Stock Games
            </label>

            <button
              onClick={() => setShowFilter(false)}
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
