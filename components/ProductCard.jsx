"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import {
  Star,
  Truck,
  ShoppingCart,
  Trash2,
  Package,
  Plus,
  Minus,
} from "lucide-react";
import nProgress from "nprogress";
export const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart, decreaseQuantity, cart } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  // Helper to render image or placeholder
  const renderMedia = () => {
    if (product.image) {
      return (
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full  transition-transform duration-500 hover:scale-110"
        />
      );
    }

    // PROFESSIONAL PLACEHOLDER DESIGN
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 relative overflow-hidden ">
        {/* Abstract Background Decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-100/50 rounded-full blur-xl" />
        <Package className="w-12 h-12 text-slate-300 mb-2 relative z-10" />
      </div>
    );
  };

  return (
    <div
      onClick={() => {
        nProgress.start();
        router.push(`/products/${product.id}`);
      }}
      className="group relative w-full md:w-[220px] bg-white rounded-2xl p-3 flex flex-col h-full cursor-pointer 
                 transition-all duration-300  border border-gray-100"
    >
      {/* Media Container */}
      <div className="relative w-full aspect-square mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-50">
        {renderMedia()}

        {/* Floating Badges (Only show if data exists) */}
        {product.discount_percent && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm">
            {product.discount_percent}% OFF
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-black text-slate-900 leading-none">
            ${product.price}
          </span>
          {product.hiked_price && (
            <span className="text-xs text-slate-400 line-through font-medium">
              ${product.hiked_price}
            </span>
          )}
        </div>

        <h3 className="text-sm font-bold text-slate-700 line-clamp-2 h-10 mb-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>

        {/* Delivery & Rating Row */}
        <div className="flex items-center justify-between mb-3">
          {product.availability ? (
            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
              <Truck size={12} /> Fast Delivery
            </div>
          ) : (
            <div />
          )}

          {product.rating && (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100">
              <Star size={10} className="fill-amber-500 text-amber-500" />
              {product.rating}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
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
    </div>
  );
};
