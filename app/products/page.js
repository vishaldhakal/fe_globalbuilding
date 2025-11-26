"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const myLoader = ({ src }) => src;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/products/`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 text-sm font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 space-y-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            All Products
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Browse our complete selection of premium building materials and supplies.
          </p>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block"
              >
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-6">
                  {product.image ? (
                    <Image
                      loader={myLoader}
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-lg font-medium text-gray-900 whitespace-nowrap">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:gap-3 transition-all duration-300">
                    View Details <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
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
    </div>
  );
}
