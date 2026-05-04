import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Tile pattern 404 */}
        <div className="grid grid-cols-4 gap-2 w-32 mx-auto mb-8">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm ${
                [0, 3, 5, 10, 12, 15].includes(i) ? 'bg-clay' : 'bg-base-300'
              }`}
            />
          ))}
        </div>

        <h1 className="font-display text-8xl font-bold text-clay mb-2">404</h1>
        <h2 className="font-display text-2xl font-semibold text-slate mb-4">Page Not Found</h2>
        <p className="text-slate/50 mb-8">
          Looks like this tile has gone missing from our gallery. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn bg-clay text-white hover:bg-terra border-none rounded-sm px-8">
            Go Home
          </Link>
          <Link href="/all-tiles" className="btn btn-outline border-slate text-slate hover:bg-slate hover:text-cream rounded-sm px-8">
            Browse Tiles
          </Link>
        </div>
      </div>
    </div>
  );
}
