'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <div
     className="flex justify-center items-center py-4 w-full fixed top-0 left-0 z-10"
      style={{
        background: 'radial-gradient(circle, #2a4d6d, #1b2a3d)',
        color: '#f8f9fa',
      }}
    >
      <div className="flex gap-8 text-lg font-semibold">
        <Link href="/" className="px-4 py-2 border border-white/40 rounded-lg hover:bg-white/10 transition-all">
          Home
        </Link>
        <Link href="/page2" className="px-4 py-2 border border-white/40 rounded-lg hover:bg-white/10 transition-all">
          PK amount
        </Link>
        <Link href="/page3" className="px-4 py-2 border border-white/40 rounded-lg hover:bg-white/10 transition-all">
          PH amount
        </Link>
      </div>
    </div>
  );
}
