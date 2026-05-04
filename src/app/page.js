import Link from "next/link";
import Marquee from "react-fast-marquee";
import TileCard from "@/components/TileCard";

async function getFeaturedTiles() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/tiles?_limit=4`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredTiles = await getFeaturedTiles();

  const marqueeItems = [
    "✦ New Arrivals: Aegean Blue Ceramic",
    "✦ Weekly Feature: Modern Geometric Patterns",
    "✦ Join the Community of Tile Enthusiasts",
    "✦ Premium Zellige from Marrakech Artisans",
    "✦ Nordic Frost Collection — Now Available",
    "✦ Handcrafted Terra Cotta Series",
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Decorative tile pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/30"
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-clay text-sm uppercase tracking-[0.3em] mb-4 font-medium animate__animated animate__fadeInDown">
              Curated Tile Collection
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-cream font-bold leading-tight mb-6 animate__animated animate__fadeInUp">
              Discover Your
              <span className="block text-clay italic">Perfect Aesthetic</span>
            </h1>
            <p className="text-cream/70 text-lg mb-10 leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
              Explore hundreds of premium tiles from artisans around the world.
              From Mediterranean ceramics to Moroccan Zellige — find the tile
              that tells your story.
            </p>
            <div className="flex flex-wrap gap-4 animate__animated animate__fadeInUp animate__delay-1s">
              <Link
                href="/all-tiles"
                className="btn btn-lg bg-clay text-white hover:bg-terra border-none rounded-sm px-8 text-base"
              >
                Browse Now →
              </Link>
              <Link
                href="#featured"
                className="btn btn-lg btn-outline border-cream/40 text-cream hover:bg-cream/10 rounded-sm px-8 text-base"
              >
                View Featured
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative right side tiles */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 hidden lg:block">
          <div className="grid grid-cols-3 h-full gap-1 p-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="bg-clay rounded-sm"
                style={{ opacity: 0.3 + i * 0.07 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-base-200 border-y border-clay/20 py-3">
        <Marquee speed={50} gradient={false} className="marquee-text text-sm">
          {marqueeItems.map((item, i) => (
            <span key={i} className="mx-10">
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Featured Tiles */}
      <section
        id="featured"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-12">
          <p className="text-clay text-sm uppercase tracking-[0.3em] mb-2 font-medium">
            Handpicked For You
          </p>
          <h2 className="font-display text-4xl font-bold text-slate">
            Featured Tiles
          </h2>
          <div className="w-20 h-0.5 bg-clay mx-auto mt-4"></div>
        </div>

        {featuredTiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate/50">
            <p className="font-display text-2xl mb-2">Tiles coming soon...</p>
            <p className="text-sm">
              Make sure your JSON server is running on port 5000.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/all-tiles"
            className="btn btn-outline border-slate text-slate hover:bg-slate hover:text-cream rounded-sm px-10"
          >
            View All Tiles →
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Unique Tiles" },
              { value: "50+", label: "Global Artisans" },
              { value: "12", label: "Categories" },
              { value: "10K+", label: "Happy Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-bold text-clay">
                  {stat.value}
                </p>
                <p className="text-slate/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-slate rounded-sm p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 120 }).map((_, i) => (
                <div key={i} className="border border-white" />
              ))}
            </div>
          </div>
          <div className="relative">
            <h2 className="font-display text-4xl font-bold text-cream mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-cream/60 mb-8 max-w-lg mx-auto">
              Browse our complete collection of tiles and find your perfect
              match.
            </p>
            <Link
              href="/all-tiles"
              className="btn btn-lg bg-clay text-white hover:bg-terra border-none rounded-sm px-10"
            >
              Explore All Tiles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
