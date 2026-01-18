"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingCart, Loader2, Package } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import CartSidebar from "./CartSidebar";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const [query, setQuery] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dropdownRef = useRef(null);

  // 1. Fetch products once on mount to use for searching
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Error loading products for search:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // 2. Filter products as the user types (Debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 1) {
        const results = allProducts
          .filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 6); // Show top 6 results
        setFilteredSuggestions(results);
        setShowDropdown(true);
      } else {
        setFilteredSuggestions([]);
        setShowDropdown(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, allProducts]);

  // 3. Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowDropdown(false);
    router.push(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <>
      <nav className="w-full h-22 px-2 md:px-12 sticky top-0 z-48 bg-white border-b border-gray-300">
        <div className="max-w-6xl w-full flex items-center justify-between py-6 gap-2 sm:gap-6 mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="w-20 sm:w-32 hover:opacity-80 transition-opacity"
          >
            <img src="/Global_LOGO_200.jpg" alt="Logo" className="w-full" />
          </Link>

          {/* Search Input Container */}
          <div className="flex-1 relative max-w-2xl" ref={dropdownRef}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                ) : (
                  <Search className="h-5 w-5 text-gray-700" />
                )}
              </div>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 bg-transparent outline-none rounded-xl text-sm text-gray-700 font-semibold transition-all"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query.length > 1 && setShowDropdown(true)}
                />
              </form>
            </div>

            {/* Suggestions Dropdown */}
            {showDropdown && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                <div className="py-2">
                  <p className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Suggested Products
                  </p>
                  {filteredSuggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setQuery("");
                        setShowDropdown(false);

                        router.push(`/products/${product.id}`);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 flex items-center gap-3 transition-colors border-b last:border-0 border-gray-50 cursor-pointer "
                    >
                      {/* Optional: Add product image if available */}
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover bg-gray-100"
                        />
                      ) : (
                        <div className="w-10 h-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 relative overflow-hidden">
                          {/* Abstract Background Decoration */}
                          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
                          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-100/50 rounded-full blur-xl" />
                          <Package className="w-10 h-10 text-slate-300 mb-2 relative z-10" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-orange-600">
                          ${product.price}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-4 md:gap-8 shrink-0 font-semibold text-gray-700">
            <Link
              href="/admin"
              className="flex flex-col items-center hover:text-orange-700 transition-colors"
            >
              <User size={24} strokeWidth={1.5} />
              <span className="text-xs mt-1">Admin</span>
            </Link>

            <div
              onClick={() => setIsCartOpen(true)}
              className="flex flex-col items-center hover:text-orange-700 transition-colors relative cursor-pointer"
            >
              <ShoppingCart size={24} strokeWidth={1.5} />
              <span className="text-xs mt-1">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
