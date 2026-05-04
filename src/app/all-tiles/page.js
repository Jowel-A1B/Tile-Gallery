"use client";

import { useState, useEffect } from "react";
import TileCard from "@/components/TileCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [filteredTiles, setFilteredTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const res = await fetch("/api/tiles");
        const data = await res.json();
        setTiles(data);
        setFilteredTiles(data);
      } catch (err) {
        console.error("Failed to fetch tiles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTiles();
  }, []);

  useEffect(() => {
    let result = tiles;
    if (search) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (selectedCategory !== "all") {
      result = result.filter((t) => t.category === selectedCategory);
    }
    setFilteredTiles(result);
  }, [search, selectedCategory, tiles]);

  const categories = ["all", ...new Set(tiles.map((t) => t.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-clay text-sm uppercase tracking-[0.3em] mb-2 font-medium">
          The Collection
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate mb-2">
          All Tiles
        </h1>
        <div className="w-16 h-0.5 bg-clay mt-4"></div>
      </div>

      {/* Search & Filter */}
      <div className="bg-base-200 rounded-sm p-6 mb-10 border border-clay/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search tiles by name..."
              className="input w-full pl-12 bg-white border border-clay/30 rounded-sm focus:outline-none focus:border-clay text-slate placeholder-slate/40"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="select bg-white border border-clay/30 rounded-sm focus:outline-none focus:border-clay text-slate capitalize min-w-[180px]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!loading && (
        <p className="text-slate/50 text-sm mb-6">
          Showing{" "}
          <span className="font-semibold text-clay">
            {filteredTiles.length}
          </span>{" "}
          tiles
          {search && ` for "${search}"`}
        </p>
      )}

      {loading ? (
        <LoadingSpinner text="Loading tiles..." />
      ) : filteredTiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTiles.map((tile) => (
            <TileCard key={tile.id} tile={tile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-display text-2xl text-slate mb-2">
            No tiles found
          </h3>
          <p className="text-slate/50">
            Try a different search term or category.
          </p>
        </div>
      )}
    </div>
  );
}
