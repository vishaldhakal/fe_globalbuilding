"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ChevronRight, LayoutGrid } from "lucide-react";

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
            (sub) => sub.id === parseInt(subCategoryId),
          );
          setSelectedSubCategory(matchedSub || null);
        } else {
          setSelectedSubCategory(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, subCategoryId, apiUrl]);

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
          <div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
            Loading Collection
          </p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-6">
            Category not found
          </h2>
          <Link
            href="/categories"
            className="inline-block px-8 py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white pt-12 pb-24 px-2 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb: Professional & Subtle */}
        <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10">
          <Link
            href="/categories"
            className="hover:text-slate-900 transition-colors"
          >
            Categories
          </Link>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-slate-900">{category.name}</span>
          {selectedSubCategory && (
            <>
              <ChevronRight size={12} className="text-slate-300" />
              <span className="text-orange-600">
                {selectedSubCategory.name}
              </span>
            </>
          )}
        </nav>

        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-2">
            {selectedSubCategory ? selectedSubCategory.name : category.name}
          </h1>
          <p className="max-w-2xl text-lg text-slate-500 font-medium leading-relaxed">
            {selectedSubCategory?.description ||
              category.description ||
              "Explore our premium selection of building supplies and materials."}
          </p>
        </header>

        {/* Subcategory Filter: Clean Pills */}
        {category?.subcategories?.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <LayoutGrid size={18} className="text-slate-900" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
                Collections
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedSubCategory(null)}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  selectedSubCategory === null
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                All Products
              </button>
              {category.subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() =>
                    setSelectedSubCategory(
                      selectedSubCategory?.id === sub.id ? null : sub,
                    )
                  }
                  className={`px-6 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold transition-all cursor-pointer border ${
                    selectedSubCategory?.id === sub.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200"
                      : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"
                  }`}
                >
                  {sub.image && (
                    <img
                      className="w-6 h-6 rounded-lg object-cover"
                      src={sub.image}
                      alt={sub.name}
                    />
                  )}
                  <span>{sub.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid: Fixed Spacing */}
        <section>
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6">
              {displayedProducts.map((p) => (
                <div key={p.id} className="flex justify-center">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-slate-100">
              <p className="text-slate-500 font-bold mb-8">
                No products found in this section.
              </p>
              <Link
                href={"/categories"}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Back to categories
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
