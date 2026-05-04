import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Tiles Gallery — Discover Your Perfect Aesthetic',
  description: 'A curated gallery of premium tiles from around the world.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="tilegallery">
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#FAF7F2',
              color: '#2C3E50',
              border: '1px solid #C4A882',
              fontFamily: 'var(--font-dm-sans)',
            },
          }}
        />
      </body>
    </html>
  );
}
