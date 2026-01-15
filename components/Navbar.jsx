"use client";
import React from "react";
import { useState } from "react";
import { Search, MapPin, User, ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Redirect to /search page with query as URL param
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
  };
  return (
    <nav className=" h-22 flex items-center sticky top-0 z-50 justify-between px-4 md:px-8 lg:px-42 py-6 bg-white border-b border-gray-300 gap-4 md:gap-8 mx-auto">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-gray-900 tracking-tight hover:opacity-80 transition-opacity"
      >
        <img src="/Global_LOGO_200.jpg" alt="" className="h-10" />
      </Link>

      <div className=" w-full">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-700" />
          </div>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              className="block w-full pl-14 pr-4 py-3  border border-gray-300  bg-transparent outline-none rounded-xl   text-sm text-gray-700 font-semibold"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8 shrink-0 font-semibold text-gray-700">
        <button className="flex flex-col items-center hover:text-purple-700 transition-colors cursor-pointer">
          <User size={24} strokeWidth={1.5} />
          <Link href={"/admin"} className="text-xs mt-1">
            Admin
          </Link>
        </button>

        <Link
          href={"/cart"}
          className="flex flex-col items-center hover:text-purple-700 transition-colors relative cursor-pointer"
        >
          <ShoppingCart size={24} strokeWidth={1.5} />
          <span className="text-xs mt-1">Cart</span>
          {/* Optional Badge */}
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1  bg-gradient-to-r from-[#FF6D1F] to-orange-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
