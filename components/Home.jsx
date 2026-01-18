"use client";
import { useState } from "react";
import React from "react";
import BrowseCategory from "./BrowserCategory";
import SubcategorySection from "./subCategorySection";
import { RefreshCcw, ShoppingBag } from "lucide-react";
import Link from "next/link";
const Home = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allCategories = [
    { id: "all", name: "All Products", image: "" },
    ...categories,
  ];

  // Compute subcategories based on selected category
  const filteredSubcategories =
    selectedCategory === "all"
      ? categories.flatMap((cat) => cat.subcategories || [])
      : categories.find((cat) => cat.id === selectedCategory)?.subcategories ||
        [];

  return (
    <div>
      <BrowseCategory
        categories={allCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="flex flex-col px-2 md:px-12 gap-3 mb-28 ">
        {filteredSubcategories?.length > 0 ? (
          <div className="flex flex-col gap-5 max-w-6xl w-full mx-auto">
            {filteredSubcategories?.map((subCategory) => {
              return (
                <SubcategorySection
                  key={subCategory.id}
                  subCategory={subCategory}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto py-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="relative mb-6">
              {/* Decorative background circles */}
              <div className="absolute inset-0 bg-pink-50 rounded-full scale-150 blur-2xl opacity-60" />
              <div className="relative w-24 h-24 bg-white shadow-xl rounded-3xl flex items-center justify-center border border-gray-50">
                <ShoppingBag size={40} className="text-pink-500 stroke-[1.5]" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-slate-800 mb-2">
              Nothing found here
            </h3>

            <p className="text-slate-500 max-w-[280px] text-sm font-medium leading-relaxed mb-8">
              We couldn't find any products in this category. Try exploring our
              other collections!
            </p>

            <Link
              href="/products"
              className="group flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 cursor-pointer"
            >
              <RefreshCcw
                size={16}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
