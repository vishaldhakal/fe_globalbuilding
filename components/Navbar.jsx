"use client";
import React from "react";
import { useState } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import CartSidebar from "./CartSidebar";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    <>
      <nav className=" w-full h-22 px-2 md:px-12  sticky top-0 z-48 bg-white border-b border-gray-300  ">
        <div className="max-w-6xl w-full flex items-center justify-between py-6 gap-2 sm:gap-6 mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className=" w-20 sm:w-32 hover:opacity-80 transition-opacity"
          >
            <img src="/Global_LOGO_200.jpg" alt="" className=" w-full" />
          </Link>

          <div className=" flex-1 ">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-2 sm:pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-700" />
              </div>
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  className="block w-full pl-10 sm:pl-14 pr-4 py-3  border border-gray-300  bg-transparent outline-none rounded-xl   text-sm text-gray-700 font-semibold"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8 shrink-0 font-semibold text-gray-700">
            <button className="flex flex-col items-center hover:text-orange-700 transition-colors cursor-pointer">
              <User size={24} strokeWidth={1.5} />
              <Link href={"/admin"} className="text-xs mt-1">
                Admin
              </Link>
            </button>

            <div
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center hover:text-orange-700 transition-colors relative cursor-pointer"
            >
              <ShoppingCart size={24} strokeWidth={1.5} />
              <span className="text-xs mt-1">Cart</span>
              {/* Optional Badge */}
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1  bg-orange-400 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
