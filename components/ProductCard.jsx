"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
import { Star, Truck } from "lucide-react";
export const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  return (
    <div
      className="w-40  rounded-xl flex flex-col h-full  cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/products/${product.id}`);
      }}
    >
      {/* Image & Add Button */}
      <div className="w-full  aspect-square mb-3 bg-transparent rounded-lg overflow-hidden border border-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full p-2 hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="flex items-center justify-start mb-1">
        {/* Pricing Badge */}

        {/* price after discout */}
        <div className="bg-green-700 text-white text-sm font-bold px-2  py-1 rounded">
          ${product.price}
        </div>

        {/* price after discout   */}
        {product.hiked_price && (
          <div className=" text-gray-500 text-sm font-semibold px-2 py-1 rounded line-through">
            ${product.hiked_price}
          </div>
        )}
      </div>
      {product.discount_percent && (
        <div className="flex items-center ">
          <div className="flex-1 border-t border-dashed border-green-300"></div>
          <span className="px-2 text-xs font-semibold text-green-600">
            {product.discount_percent}% OFF
          </span>
          <div className="flex-1 border-t border-dashed border-green-300"></div>
        </div>
      )}

      {/* Product name */}
      <h3 className="text-sm font-semibold text-gray-700 line-clamp-2 h-10 mb-2  mt-1">
        {product.name}
      </h3>
      {/* Delivery Info */}
      {product.availability && (
        <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-md w-fit mb-2">
          <Truck className="w-3.5 h-3.5 text-green-600" />
          <span>Fast Delivery</span>
        </div>
      )}
      {/* Rating badge */}
      {product.rating && (
        <div className="flex w-12 items-center gap-1 px-1.5 py-0.5 rounded-md bg-green-100 text-green-700 text-xs font-semibold mb-2">
          <Star size={12} className="fill-green-600 text-green-600" />
          <span>{product.rating}</span>
        </div>
      )}
      <p className="w-full flex items-center justify-center   mb-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            inCart ? removeFromCart(product.id) : addToCart(product);
          }}
          className={` w-full border text-gray-900 font-semibold py-2 rounded-2xl text-sm transition-colors cursor-pointer border-none
        ${
          inCart
            ? " bg-gray-300 hover:bg-gray-200 px-1"
            : " bg-yellow-400 hover:bg-yellow-500  px-3"
        }
      `}
        >
          {inCart ? "Remove" : "Add to Cart"}
        </button>
      </p>
    </div>
  );
};
