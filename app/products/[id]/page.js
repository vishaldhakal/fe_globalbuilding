"use client";

import InquiryForm from "@/components/inquiryForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductDetails from "@/components/ProductDetailsCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch product details
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${apiUrl}/products/${id}/`)
      .then((res) => {
        if (!res.ok) {
          setProduct(null);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setProduct(data);
      })
      .catch((err) => {
        console.log(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Product not found</h2>
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
    <div className="min-h-screen bg-white pt-32 pb-20 px-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-12">
          <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/categories" className="hover:text-gray-900 transition-colors">Categories</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Product Details - 7 cols */}
          <div className="lg:col-span-7">
            <ProductDetails product={product} />
          </div>

          {/* Inquiry Form - 5 cols */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Request a Quote</h3>
              <p className="text-gray-500 mb-8 text-sm">Interested in this product? Send us an inquiry and we'll get back to you with pricing and availability.</p>
              <InquiryForm productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

