"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const myLoader = ({ src }) => src;

export default function ProductsSection({ products }) {
  return (
    <section className="py-32 bg-white" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-semibold text-gray-900 tracking-tight mb-3">
            Popular Products
          </h2>
          <p className="text-gray-600 text-lg font-light">
            Discover our most sought-after tools and materials
          </p>
        </div>

        {/* Products Grid */}
        {products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
              >
                <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden border border-gray-200/50 group-hover:border-gray-300 transition-colors duration-200">
                  {product.image ? (
                    <Image
                      loader={myLoader}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-[1.02] transition-transform duration-300"
                      width={400}
                      height={400}
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <span className="text-sm">No image</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-medium text-gray-900 line-clamp-1 group-hover:text-[#FF6D1F] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 font-light leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-base font-semibold text-gray-900 pt-1">
                    {product.price ? (
                      <>${product.price.toLocaleString()}</>
                    ) : (
                      <span className="text-gray-500 font-normal">Contact for price</span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="text-gray-500 text-lg">
              No products available at the moment
            </p>
          </div>
        )}

        {/* View All Link */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#FF6D1F] transition-colors"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
