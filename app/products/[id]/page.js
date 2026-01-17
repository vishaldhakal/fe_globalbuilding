"use client";
import InquiryForm from "@/components/inquiryForm";
import { useParams } from "next/navigation";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Share2,
  Star,
  ChevronRight,
  Percent,
  Package,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/cartContext";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductPage = () => {
  const params = useParams();
  const id = params.id;
  const { cart, addToCart, removeFromCart, isInCart } = useCart();
  const isProductInCart = isInCart(id);
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

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name}!`,
      url: window.location.href, // This gets the current page URL
    };

    try {
      if (navigator.share) {
        // Use native share if available
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };
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
          <h2 className="text-3xl font-bold text-gray-900">
            Product not found
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
    <div className="min-h-screen w-full bg-white pt-12 pb-24 px-2 md:px-12">
      <div className="max-w-6xl mx-auto font-sans text-slate-800">
        {/* Breadcrumb: Professional & Subtle */}
        <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-16">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>

          {product.name && (
            <>
              <ChevronRight size={12} className="text-slate-300" />
              <span className="text-orange-600">{product.name}</span>
            </>
          )}
        </nav>

        <div className="min-h-96 flex flex-col md:flex-row gap-8 mb-32">
          {/* LEFT SIDE: Images */}
          <div className="w-full md:w-1/2 flex gap-4">
            {/* Vertical Thumbnails */}
            <div className="hidden md:flex flex-col gap-2">
              <button
                className={`w-16 h-16 border-2 rounded-md overflow-hidden `}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-fit"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 relative overflow-hidden">
                    {/* Abstract Background Decoration */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-100/50 rounded-full blur-xl" />
                    <Package className="w-12 h-12 text-slate-300 mb-2 relative z-10" />
                  </div>
                )}
              </button>
            </div>

            {/* Main Slider */}
            <div className="relative h-96 flex-1 bg-gray-100 rounded-2xl overflow-hidden group">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="h-full w-full"
              >
                <SwiperSlide>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 relative overflow-hidden">
                      {/* Abstract Background Decoration */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
                      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-100/50 rounded-full blur-xl" />
                      <Package className="w-12 h-12 text-slate-300 mb-2 relative z-10" />
                    </div>
                  )}
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          {/* RIGHT SIDE: Details */}
          <div className="w-full flex flex-col md:w-1/2">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                {product.rating && (
                  <div className="flex mb-4 mt-1 items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-lg border border-amber-100 shadow-sm">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-amber-500"
                    />
                    <span className="text-xs font-bold leading-none">
                      {Number(product.rating).toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={handleShare}
                className="p-2 border rounded-full hover:bg-gray-50 cursor-pointer"
              >
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>

            <div className=" flex items-center gap-3 mb-10">
              <span className="text-3xl font-black text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                ${product.price}
              </span>
              <div className="text-sm">
                {product.hiked_price && (
                  <span className="text-gray-400 line-through">
                    ${product.hiked_price}
                  </span>
                )}
                {product.discount_percent && (
                  <span className="ml-2 text-green-600 font-bold">
                    {product.discount_percent}% OFF
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 mb-4">
              <h2 className="text-xl font-bold ">Product Description</h2>
              <p
                dangerouslySetInnerHTML={{ __html: product.description }}
                className="text-gray-600 leading-relaxed"
              />
            </div>
            <button
              onClick={() => {
                if (isProductInCart) {
                  removeFromCart(product.id);
                } else {
                  addToCart(product);
                }
              }}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all active:scale-95 cursor-pointer 
    ${
      isProductInCart
        ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
        : "bg-[#FFD814] text-slate-900 hover:bg-[#F7CA00] shadow-[0_2px_5px_rgba(213,210,189,0.5)]"
    }
  `}
            >
              {isProductInCart ? (
                <Trash2 size={20} />
              ) : (
                <ShoppingCart size={14} />
              )}
              {isProductInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
        <InquiryForm productIds={[product.id]} />
      </div>
    </div>
  );
};

export default ProductPage;
