import Link from 'next/link';

export default function TileCard({ tile }) {
  return (
    <div className="tile-card bg-white rounded-sm overflow-hidden border border-base-300 group">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={tile.image}
          alt={tile.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          {tile.inStock ? (
            <span className="bg-success/90 text-white text-xs px-2 py-1 rounded-sm font-medium">
              In Stock
            </span>
          ) : (
            <span className="bg-error/90 text-white text-xs px-2 py-1 rounded-sm font-medium">
              Sold Out
            </span>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-slate/80 text-cream text-xs px-2 py-1 rounded-sm capitalize">
            {tile.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-slate text-lg leading-tight mb-1">{tile.title}</h3>
        <p className="text-slate/60 text-xs mb-3 line-clamp-2">{tile.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tile.tags?.map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-clay font-bold text-lg">
              ${tile.price}
              <span className="text-slate/40 text-xs font-normal ml-1">{tile.currency}</span>
            </p>
            <p className="text-slate/50 text-xs">{tile.dimensions}</p>
          </div>
          <Link
            href={`/tile/${tile.id}`}
            className="btn btn-sm bg-slate text-cream hover:bg-clay border-none rounded-sm px-5 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
