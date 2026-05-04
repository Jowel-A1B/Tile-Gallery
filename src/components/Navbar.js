'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully!');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/all-tiles', label: 'All Tiles' },
    { href: '/my-profile', label: 'My Profile' },
  ];

  return (
    <nav className="glass sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-clay rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">T</span>
            </div>
            <span className="font-display text-xl font-bold text-slate">
              Tile<span className="text-clay">Gallery</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-clay ${
                  pathname === link.href ? 'text-clay border-b-2 border-clay pb-1' : 'text-slate'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {session?.user ? (
              <div className="flex items-center gap-3">
                <Link href="/my-profile" className="flex items-center gap-2 group">
                  <div className="avatar">
                    <div className="w-9 h-9 rounded-full border-2 border-clay overflow-hidden">
                      {session.user.image ? (
                        <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-clay flex items-center justify-center text-white font-bold">
                          {session.user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate group-hover:text-clay transition-colors">
                    {session.user.name?.split(' ')[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-slate text-cream hover:bg-moss border-none rounded-sm px-5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn btn-sm bg-clay text-white hover:bg-terra border-none rounded-sm px-6">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate hover:text-clay"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-clay/20 animate__animated animate__fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm font-medium transition-colors hover:text-clay ${
                  pathname === link.href ? 'text-clay' : 'text-slate'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-clay/20 mt-3">
              {session?.user ? (
                <button onClick={handleLogout} className="btn btn-sm btn-outline border-slate text-slate rounded-sm w-full">
                  Logout
                </button>
              ) : (
                <Link href="/login" className="btn btn-sm bg-clay text-white border-none rounded-sm w-full">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
