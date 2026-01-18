"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import {
  Share2,
  Star,
  ChevronRight,
  Package,
  Trash2,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RefreshCcw,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "@/context/cartContext";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ProductPage = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, decreaseQuantity, cart } = useCart();
  const cartItem = cart.find((item) => item.id === product?.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Optimized Data Fetching
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${apiUrl}/products/${id}/`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id, apiUrl]);

  // Optimized Logic: Filter by category for better relevance
  const similarProducts = useMemo(() => {
    if (!product || !products.length) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 5);
  }, [product, products]);

  const allCategories = categories.flatMap((c) => [
    { id: c.id, name: c.name },

    ...(c.subcategories?.map((sub) => ({ id: sub.id, name: sub.name })) || []),
  ]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!"); // Replace with a proper Toast component if available
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (!product) return <NotFoundState />;

  return (
    <div className="min-h-screen bg-[#FCFCFD] pt-8 pb-24 px-2 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
          <Link href="/" className="hover:text-orange-600 transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-900">
            {allCategories.find((c) => c.id === product.category)?.name ||
              "General Collection"}
          </span>
          <ChevronRight size={12} />
          <span className="text-orange-600 truncate max-w-[150px]">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* LEFT SIDE: Media Gallery */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="hidden md:block w-20">
              <div className="space-y-3">
                <button className="w-20 h-20 rounded-xl border-2 border-orange-500 overflow-hidden bg-white p-1">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt="thumb"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Package className="w-full h-full text-slate-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group relative">
              <div className="aspect-square relative flex items-center justify-center p-8">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Package className="w-20 h-20 text-slate-200" />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Product Details */}
          <div className="lg:col-span-5 space-y-8">
            <section className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                    {allCategories.find((c) => c.id === product.category)
                      ?.name || "Uncategorized"}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
                <button
                  onClick={handleShare}
                  className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                >
                  <Share2 size={20} className="text-slate-600" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-amber-400 px-2 py-1 rounded-lg text-white font-bold text-sm">
                  <Star size={14} fill="white" />
                  {Number(product.rating || 4.5).toFixed(1)}
                </div>
              </div>
            </section>

            <section className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-6">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-slate-900">
                  ${product.price}
                </span>
                {product.hiked_price && (
                  <span className="text-lg text-slate-400 line-through mb-1">
                    ${product.hiked_price}
                  </span>
                )}
                {product.discount_percent && (
                  <span className="mb-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-bold">
                    -{product.discount_percent}%
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <Truck size={18} className="text-orange-500" />
                  <span className="text-xs font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <ShieldCheck size={18} className="text-orange-500" />
                  <span className="text-xs font-medium">1 Year Warranty</span>
                </div>
              </div>

              {quantity > 0 ? (
                /* QUANTITY SELECTOR MODE */
                <div className="flex items-center justify-between w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decreaseQuantity(product.id);
                    }}
                    className="flex-1 py-2.5 flex justify-center items-center hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="flex-1 text-center font-bold text-slate-900">
                    {quantity}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="flex-1 py-2.5 flex justify-center items-center hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ) : (
                /* INITIAL ADD TO CART MODE */
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer bg-[#FFD814] text-slate-900 hover:bg-[#F7CA00] shadow-[0_2px_5px_rgba(213,210,189,0.5)]"
                >
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              )}
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Description</h3>
              <div
                className="text-slate-600 leading-relaxed prose prose-slate"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </section>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">
                Similar Products
              </h2>
              <div className="h-1 flex-1 mx-8 bg-slate-100 rounded-full hidden md:block" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-slate-100 border-t-orange-500 rounded-full animate-spin"></div>
  </div>
);

const NotFoundState = () => (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
      <Package size={40} className="text-slate-300" />
    </div>
    <h2 className="text-2xl font-bold text-slate-900 mb-2">
      Product not found
    </h2>
    <p className="text-slate-500 mb-8">
      The item you're looking for might have been moved or removed.
    </p>
    <Link
      href="/"
      className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
    >
      Return Home
    </Link>
  </div>
);

export default ProductPage;
