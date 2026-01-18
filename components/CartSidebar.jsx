"use client";
import { useEffect } from "react";
import { useCart } from "@/context/cartContext";
import {
  Star,
  Trash2,
  X,
  ShoppingBag,
  Package,
  Plus,
  Minus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import nProgress from "nprogress";

const CartSidebar = forwardRef(function CartSidebar({ isOpen, onClose }, ref) {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const router = useRouter();

  const totalAmount = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0,
  );

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
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={ref}
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-orange-600" size={20} />
            </div>
            <div>
              <h2 className="font-black text-slate-900 leading-none">
                Your Cart
              </h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">
                {cart.length} {cart.length === 1 ? "Type" : "Types"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center px-8 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="text-slate-200" size={40} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Your cart is empty
              </h3>
              <button
                onClick={onClose}
                className="w-full py-3 mt-4 bg-slate-900 text-white rounded-xl font-bold text-sm cursor-pointer "
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-slate-100 rounded-2xl"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Package className="text-slate-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs font-black text-slate-900 mt-1">
                      ${item.price}
                    </p>

                    {/* 3. Added Quantity Selector for Sidebar */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 px-2 hover:bg-slate-200 rounded-l-lg text-slate-600 cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 px-2 hover:bg-slate-200 rounded-r-lg text-slate-600 cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Subtotal for this specific item row */}
                      <span className="text-xs font-bold text-slate-400">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-xl font-black text-slate-900">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  nProgress.start();
                  router.push("/cart");
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl cursor-pointer"
              >
                Checkout Now
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CartSidebar;
