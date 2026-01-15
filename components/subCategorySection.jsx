"use client";
import React from "react";
import { ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import Link from "next/link";
const SubcategorySection = ({ subCategory }) => {
  console.log(subCategory);
  return (
    <section className="py-2 bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-xl font-bold text-gray-800">{subCategory.name}</h2>
        <Link
          href={`/categories/${subCategory.parent}?subcategory=${subCategory.id}`}
          className="text-pink-600 font-semibold flex items-center cursor-pointer"
        >
          See All <ChevronRight size={16} />
        </Link>
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
