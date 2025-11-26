"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function CategoriesSection({ categories }) {
  return (
    <section className="py-24 " id="category">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight sm:text-4xl mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-500 font-light">
            Find exactly what you need for your next project from our wide
            selection.
          </p>
        </div>

        {categories?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {categories?.slice(0, 3).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.id}`}
                  className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 aspect-[4/3] flex flex-col border border-gray-100 hover:border-[#FF6D1F]/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50" />

                  <div className="relative h-full w-full p-10 flex items-center justify-center">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-sm"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                        <span className="text-gray-300 text-2xl">📷</span>
                      </div>
                    )}
                  </div>

                  <div className="relative p-6 bg-white/80 backdrop-blur-md mt-auto border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6D1F] transition-colors">
                          {cat.name}
                        </h3>
                        {cat.description && (
                          <p className="text-gray-500 text-sm line-clamp-1 mt-1">
                            {cat.description}
                          </p>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#FF6D1F] group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Categories Link */}
            {categories?.length > 3 && (
              <div className="text-center">
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#FF6D1F] rounded-full hover:bg-[#e55c15] transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20"
                >
                  View All Categories
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2rem] border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-lg text-gray-500">
              No categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
