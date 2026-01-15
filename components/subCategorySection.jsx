"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

const SubcategorySection = ({ subCategory }) => {
  return (
    <section className="py-6 bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800">{subCategory.name}</h2>
        <button className="text-pink-600 font-semibold flex items-center cursor-pointer">
          See All <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex overflow-x-auto px-4 no-scrollbar scroll-smooth">
        {subCategory?.products?.map((product) => (
          <div key={product.id} className="min-w-[180px] md:min-w-[220px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubcategorySection;
