"use client";
import React from "react";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
const ProductsGrid = ({ categories, products }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const getCategoryAndSubIds = (catId) => {
    const cat = categories.find((c) => c.id === parseInt(catId));
    if (!cat) return [];
    return [cat.id, ...(cat.subcategories?.map((sub) => sub.id) || [])];
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => {
        const allowedIds = getCategoryAndSubIds(selectedCategory);
        return allowedIds.includes(p.category);
      })
    : products;

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              selectedCategory === ""
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id.toString())}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === cat.id.toString()
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts?.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {filteredProducts?.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-500 mb-6">
            {selectedCategory
              ? "No products found in this category"
              : "No products available"}
          </p>
          <button
            onClick={() => setSelectedCategory("")}
            className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
