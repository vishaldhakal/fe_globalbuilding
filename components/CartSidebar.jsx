"use client";
import { useEffect } from "react";
import { useCart } from "@/context/cartContext";
import { Star, Trash2, X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();
  // Lock scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);
  return (
    // Overlay
    <div
      className={`fixed inset-0 z-50  transition-opacity ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-yellow-50">
          <div className="flex items-center justify-center gap-2">
            <ShoppingCart color="orange" size={24} />
            <p className="font-semibold text-lg text-gray-500">Your Cart</p>
          </div>
          <button
            className="cursor-pointer hover:bg-gray-300 rounded-full p-1"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          // Empty cart — center vertically
          <div className="flex-1 flex flex-col justify-center items-center p-4 text-center gap-2">
            <ShoppingCart color="orange" size={52} opacity={0.5} />
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <p className="text-base text-gray-600">
              Add some items to your cart and they'll appear here
            </p>
            <button
              onClick={onClose}
              className="w-full font-semibold text-gray-800 py-2.5 bg-yellow-400 border border-gray-300 rounded-xl hover:bg-yellow-500 transition cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Cart has items
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Items — scrollable only */}
            <div className="flex-1 overflow-y-auto  p-4 space-y-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 gap-6 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded border border-gray-300"
                    />
                    <div className="self-start pt-1  gap-2 leading-4 line-clamp-2">
                      <div className="mb-2"> {item.name}</div>
                      {/* Rating badge */}
                      {item?.rating && (
                        <div className="flex w-12 items-center gap-1 px-1.5 py-0.5 rounded-md bg-green-100 text-green-700 text-xs font-semibold mb-2">
                          <Star
                            size={12}
                            className="fill-green-600 text-green-600"
                          />
                          <span>{item.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-3">
                    <div className="text-center"> $ {item.price}</div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center justify-center gap-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 " />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons — always at bottom */}
            <div className="w-full px-4 py-8 flex flex-col items-center justify-center gap-3 border-t border-gray-300 bg-yellow-50">
              <button
                onClick={(e) => {
                  onClose();
                  router.push("/cart");
                }}
                className="w-full py-2.5 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition cursor-pointer text-center"
              >
                Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full font-semibold text-gray-800 py-2.5 bg-yellow-400 border border-gray-300 rounded-xl hover:bg-yellow-500 transition cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
