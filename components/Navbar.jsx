"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full sticky bg-white top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
        >
          <img src="/Global_LOGO_200.jpg" alt="" className="h-10" />
        </Link>

        {/* Nav Links & Call Button */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex space-x-8 text-sm font-medium text-gray-600">
            <Link
              href="/"
              className="hover:text-black transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-black transition-colors duration-300"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="hover:text-black transition-colors duration-300"
            >
              Categories
            </Link>
            <Link
              href="#contact"
              className="hover:text-black transition-colors duration-300"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="hover:text-black transition-colors duration-300"
            >
              Admin
            </Link>
          </div>
          
          <a 
            href="tel:416-291-3866"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF6D1F] text-white rounded-full hover:bg-[#e55c15] transition-all duration-300 shadow-lg shadow-orange-500/20 font-medium text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            416-291-3866
          </a>
        </div>
      </div>
    </nav>
  );
}
