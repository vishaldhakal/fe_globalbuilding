"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

const BrowseCategory = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  if (!categories?.length) return null;

  return (
    <div className="w-full sticky  top-22 z-50 bg-white border-b border-gray-200 mb-6">
      <div className=" max-w-6xl w-full mx-auto flex items-center justify-between  ">
        <div className="flex gap-12  overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-24 py-1 flex items-center justify-center border-b-4 transition-colors ${
                selectedCategory === cat.id
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
            >
              <span className="text-base font-semibold text-gray-700 text-center leading-snug line-clamp-2">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
        <Link
          href="/categories"
          className=" flex items-center ml-16 gap-1 text-pink-600 font-semibold whitespace-nowrap"
        >
          All Categories <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default BrowseCategory;
