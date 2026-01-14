"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cartContext";
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

      <div className="flex items-center justify-between">
        {/* Pricing Badge */}
        <div className="flex items-center   mb-2">
          <span className="bg-green-700 text-white text-sm font-bold px-2  py-1 rounded">
            ${product.price}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <h3 className="text-xs font-semibold text-gray-700 line-clamp-2 mb-2 h-8">
        {product.name}
      </h3>
      <p className="flex items-center justify-between   mb-2">
        {product?.availability ? (
          <span className="px-1 py-1 bg-green-50 text-green-700 border border-green-100 rounded-md  text-sm font-semibold">
            In Stock
          </span>
        ) : (
          <span className="px-1 py-1 bg-red-50 text-red-700 border border-red-100 rounded-md text-sm font-semibold">
            Out Of Stock
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            inCart ? removeFromCart(product.id) : addToCart(product);
          }}
          className={`border font-bold py-1 rounded-lg text-sm transition-colors uppercase
        ${
          inCart
            ? "border-gray-400 text-gray-600 hover:bg-gray-100 px-1"
            : "border-pink-500 text-pink-500 hover:bg-pink-50  px-3"
        }
      `}
        >
          {inCart ? "Remove" : "Add"}
        </button>
      </p>
    </div>
  );
};
