"use client";
import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsGrid = ({ categories, products }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const getCategoryAndSubIds = (catId) => {
    const cat = categories.find((c) => c.id === parseInt(catId));
    if (!cat) return [];
    return [cat.id, ...(cat.subcategories?.map((sub) => sub.id) || [])];
  };

  // Memoize filtered products for performance
  const filteredProducts = useMemo(() => {
    setCurrentPage(1); // Reset to page 1 when category changes
    return selectedCategory
      ? products.filter((p) => {
          const allowedIds = getCategoryAndSubIds(selectedCategory);
          return allowedIds.includes(p.category);
        })
      : products;
  }, [selectedCategory, products]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto ">
      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
              selectedCategory === ""
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id.toString())}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id.toString()
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {currentProducts?.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            {currentProducts?.map((p) => (
              <div key={p.id} className="w-full flex justify-center">
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-16 mb-20 flex items-center justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-bold text-sm transition-all cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-slate-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                className="p-2 rounded-full border border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
          <p className="text-xl font-bold text-gray-800 mb-4">
            No products found
          </p>
          <button
            onClick={() => setSelectedCategory("")}
            className="px-8 py-3 bg-gray-800 text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg shadow-pink-100 cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
