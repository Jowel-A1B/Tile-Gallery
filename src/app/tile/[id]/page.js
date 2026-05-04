import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

async function getTile(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/tiles/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function TileDetailPage({ params }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const tile = await getTile(params.id);

  if (!tile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl text-slate mb-4">
          Tile Not Found
        </h1>
        <Link
          href="/all-tiles"
          className="btn bg-clay text-white border-none rounded-sm"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-slate/50 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-clay transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/all-tiles" className="hover:text-clay transition-colors">
          All Tiles
        </Link>
        <span>/</span>
        <span className="text-slate">{tile.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Image */}
        <div className="sticky top-24">
          <div className="aspect-square rounded-sm overflow-hidden border border-base-300 shadow-xl">
            <img
              src={tile.image}
              alt={tile.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-sm overflow-hidden border border-clay/20 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <img
                  src={tile.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-slate text-cream text-xs px-3 py-1 rounded-sm capitalize">
              {tile.category}
            </span>
            {tile.inStock ? (
              <span className="bg-success/20 text-success text-xs px-3 py-1 rounded-sm font-medium">
                ✓ In Stock
              </span>
            ) : (
              <span className="bg-error/20 text-error text-xs px-3 py-1 rounded-sm font-medium">
                ✗ Out of Stock
              </span>
            )}
          </div>

          <h1 className="font-display text-4xl font-bold text-slate leading-tight mb-2">
            {tile.title}
          </h1>
          <p className="text-clay font-medium text-sm mb-6">
            By {tile.creator}
          </p>

          <div className="bg-base-200 rounded-sm p-5 mb-6 border border-clay/20">
            <p className="text-clay text-xs uppercase tracking-widest mb-1">
              Style
            </p>
            <p className="text-slate text-sm italic font-display">
              {tile.style}
            </p>
          </div>

          <p className="text-slate/70 leading-relaxed mb-8">
            {tile.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tile.tags?.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {/* Specs Table */}
          <div className="border border-base-300 rounded-sm overflow-hidden mb-8">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: "Material", value: tile.material },
                  { label: "Dimensions", value: tile.dimensions },
                  { label: "Price", value: `$${tile.price} ${tile.currency}` },
                  { label: "Category", value: tile.category },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-base-200" : "bg-white"}
                  >
                    <td className="px-4 py-3 text-slate/50 font-medium w-1/3">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-slate capitalize">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between bg-slate p-6 rounded-sm">
            <div>
              <p className="text-cream/50 text-xs uppercase tracking-widest">
                Price
              </p>
              <p className="font-display text-4xl font-bold text-clay">
                ${tile.price}
              </p>
              <p className="text-cream/50 text-xs">
                per tile / {tile.dimensions}
              </p>
            </div>
            <button
              className={`btn btn-lg border-none rounded-sm px-8 ${tile.inStock ? "bg-clay text-white hover:bg-terra" : "bg-base-300 text-slate/40 cursor-not-allowed"}`}
              disabled={!tile.inStock}
            >
              {tile.inStock ? "Add to Quote" : "Out of Stock"}
            </button>
          </div>

          <Link
            href="/all-tiles"
            className="btn btn-ghost text-slate/50 mt-4 w-full rounded-sm hover:text-clay"
          >
            ← Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
