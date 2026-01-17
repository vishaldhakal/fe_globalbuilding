"use client";
import { useEffect } from "react";
import { useCart } from "@/context/cartContext";
import {
  Star,
  Trash2,
  X,
  ShoppingBag,
  ArrowRight,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  // Calculate Total
  const totalAmount = cart.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0),
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
      {/* Sidebar Container */}
      <div
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
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900 cursor-pointer"
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
              <p className="text-sm text-slate-500 mt-2 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-slate-100 rounded-2xl hover:border-orange-200 transition-colors"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 relative overflow-hidden">
                        {/* Abstract Background Decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-100/50 rounded-full blur-xl" />
                        <Package className="w-12 h-12 text-slate-300 mb-2 relative z-10" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">
                      {item.name}
                    </h4>

                    {item?.rating && (
                      <div className="flex items-center gap-1 mb-auto">
                        <Star
                          size={10}
                          className="fill-orange-400 text-orange-400"
                        />
                        <span className="text-[10px] font-bold text-slate-500">
                          {item.rating}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black text-slate-900">
                        ${item.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
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
                ${totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  router.push("/cart");
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 cursor-pointer"
              >
                Checkout Now <ArrowRight size={18} />
              </button>
              <button
                onClick={onClose}
                className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-4 font-medium uppercase tracking-widest">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
