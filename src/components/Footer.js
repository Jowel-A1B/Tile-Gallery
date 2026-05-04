import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate text-cream mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-clay rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs font-display">T</span>
              </div>
              <span className="font-display text-lg font-bold text-cream">
                Tile<span className="text-clay">Gallery</span>
              </span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              A curated collection of premium tiles from artisans around the world. Discover your perfect aesthetic.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-clay text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/all-tiles', label: 'All Tiles' },
                { href: '/my-profile', label: 'My Profile' },
                { href: '/login', label: 'Login' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-cream/70 hover:text-clay text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-display text-clay text-lg mb-4">Contact Us</h3>
            <p className="text-cream/70 text-sm mb-4">
              📧 hello@tilegallery.com<br />
              📍 Dhaka, Bangladesh
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              {[
                { label: 'FB', href: '#' },
                { label: 'IG', href: '#' },
                { label: 'TW', href: '#' },
                { label: 'PT', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-sm bg-clay/20 hover:bg-clay flex items-center justify-center text-xs font-bold text-cream/70 hover:text-white transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-xs">
            © 2025 TileGallery. All rights reserved.
          </p>
          <p className="text-cream/50 text-xs font-display italic">
            "Every surface tells a story."
          </p>
        </div>
      </div>
    </footer>
  );
}
