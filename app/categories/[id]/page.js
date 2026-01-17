"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useSearchParams } from "next/navigation";
const myLoader = ({ src }) => src;

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const subCategoryId = searchParams.get("subcategory");
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => {
        const cat = data.find((c) => c.id === parseInt(id));
        setCategory(cat);

        if (subCategoryId && cat?.subcategories?.length) {
          const matchedSub = cat.subcategories.find(
            (sub) => sub.id === parseInt(subCategoryId)
          );
          setSelectedSubCategory(matchedSub || null);
        } else {
          setSelectedSubCategory(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, subCategoryId]);

  const displayedProducts = selectedSubCategory
    ? selectedSubCategory.products || []
    : [
        ...(category?.products || []),
        ...(category?.subcategories || []).flatMap((sub) => sub.products || []),
      ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Category not found
          </h2>
          <Link
            href="/categories"
            className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full  min-h-screen px-2 md:px-12 bg-white pt-12 pb-20 ">
      <div className="max-w-6xl w-full mx-auto ">
        {/* Breadcrumb */}
        <nav className="text-gray-500 mb-12 text-sm flex items-center gap-2 font-medium">
          <Link
            href="/categories"
            className="hover:text-black transition-colors duration-300"
          >
            Categories
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-500 leading-relaxed font-light">
              {category.description}
            </p>
          )}
        </div>

        {category?.subcategories?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Filter by Subcategory
            </h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSubCategory(null)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedSubCategory === null
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {category?.subcategories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedSubCategory(
                      selectedSubCategory?.id === cat.id ? null : cat
                    )
                  }
                  className={`px-6 py-3 rounded-full flex items-center gap-3 text-sm font-medium transition-all duration-300 ${
                    selectedSubCategory?.id === cat.id
                      ? "bg-black text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.image && (
                    <img
                      className="w-6 h-6 rounded-full object-cover"
                      src={cat.image}
                      alt={cat.name}
                    />
                  )}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Featured Products */}
        <section>
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Products
            </h2>
          </div>

          {displayedProducts && displayedProducts.length > 0 ? (
            <div className="flex flex-wrap gap-6">
              {displayedProducts?.map((p) => (
                <div key={p.id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-gray-50 rounded-3xl">
              <p className="text-lg text-gray-500 mb-6">
                No products available in this category
              </p>
              <Link
                href="/categories"
                className="inline-block px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 font-medium"
              >
                Browse Other Categories
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
