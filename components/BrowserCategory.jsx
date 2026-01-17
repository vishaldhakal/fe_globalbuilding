"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const BrowseCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!categories?.length) return null;

  return (
    <div className="w-full sticky top-22 z-40 bg-white border-b border-gray-200 mb-5">
      <div className="max-w-6xl mx-auto  flex items-center justify-between">
        {/* Scrollable Items */}
        <div className="flex gap-8 overflow-x-auto scrollbar-hide ">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="relative flex items-center gap-2 py-4 group transition-all cursor-pointer"
              >
                {/* Small Image Icon */}
                <div
                  className={`w-6 h-6 rounded-md overflow-hidden shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
                >
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full  flex items-center justify-center">
                      <span className="text-[24px] text-gray-400">📦</span>
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <span
                  className={`text-sm font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-slate-900"
                      : "text-slate-500 group-hover:text-slate-800"
                  }`}
                >
                  {cat.name}
                </span>

                {/* Bottom Border Slider */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500 rounded-t-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side Link */}
        <Link
          href="/categories"
          className="flex items-center gap-1 pl-6 py-4 bg-white text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors whitespace-nowrap"
        >
          All Categories <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default BrowseCategory;
