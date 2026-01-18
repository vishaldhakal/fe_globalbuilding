"use client";
import { useState, useEffect } from "react";
import {
  Trash2,
  ShoppingBag,
  ClipboardList,
  Info,
  Package,
  Plus,
  Minus,
} from "lucide-react";
import { useCart } from "@/context/cartContext";
import InquiryForm from "@/components/inquiryForm";

export default function CartInquiryPage() {
  const [categories, setCategories] = useState([]);
  // 1. Pull the new quantity helpers from context
  const { cart, removeFromCart, addToCart, decreaseQuantity, cartCount } =
    useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/`,
        );
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchData();
  }, []);

  const allCategoryList = categories.flatMap((c) => [
    { id: c.id, name: c.name },
    ...(c.subcategories?.map((sub) => ({ id: sub.id, name: sub.name })) || []),
  ]);

  return (
    <div className="min-h-screen bg-[#FAFBFC] py-16 px-2 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-100 text-orange-600 p-1.5 rounded-lg">
                <ClipboardList size={20} />
              </span>
              <span className="text-sm font-bold text-orange-600 uppercase tracking-widest">
                Cart List
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Review your selection
            </h1>
          </div>
          {/* 2. Show total units (cartCount) */}
          <p className="text-slate-500 font-medium bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
            Total Units:{" "}
            <span className="text-orange-600 font-bold">{cartCount}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 space-y-4">
            {cart?.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-slate-100 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-xl hover:shadow-slate-200/50"
                >
                  {/* Product Image */}
                  <div className="w-28 h-28 bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 border border-slate-50">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-20 h-20 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Package className="w-12 h-12 text-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 truncate">
                          {item.name}
                        </h3>
                        <div className="text-sm font-black uppercase tracking-wider text-slate-800">
                          ${item.price}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                          {allCategoryList.find((c) => c.id === item.category)
                            ?.name || "Building Material"}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                      {/* 3. Added Quantity Selector for the main page */}
                      <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-black text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">
                          Total Price
                        </p>
                        <span className="text-xl font-black text-slate-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-[2rem] p-20 text-center border border-slate-100 shadow-sm">
                <ShoppingBag
                  className="mx-auto text-slate-200 mb-4"
                  size={64}
                />
                <h2 className="text-xl font-bold text-slate-800">
                  Your selection is empty
                </h2>
                <p className="text-slate-500 mt-2">
                  Add products to start your inquiry.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/60 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />

              <div className="mb-8">
                <h3 className="text-3xl font-black text-slate-900 mb-3">
                  Checkout
                </h3>
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    Review your {cartCount} items. Send us this inquiry and
                    we'll get back to you with a formal quote.
                  </p>
                </div>
              </div>

              <InquiryForm
                cartData={cart}
                productIds={cart.map((item) => item.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
