"use client";
import { useState, useEffect } from "react";
import {
  Trash2,
  ShoppingBag,
  ClipboardList,
  Info,
  Package,
} from "lucide-react";
import { useCart } from "@/context/cartContext";
import InquiryForm from "@/components/inquiryForm";

export default function CartInquiryPage() {
  const [categories, setCategories] = useState([]);
  const { cart, removeFromCart } = useCart();

  // Fetch categories to show correct labels
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
    <div className="min-h-screen bg-[#FAFBFC] py-16  px-2 md:px-12">
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
          <p className="text-slate-500 font-medium">
            Total Items: <span className="text-slate-900">{cart?.length}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 space-y-4">
            {cart?.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-slate-100 rounded-3xl p-5 flex items-center gap-6 transition-all hover:shadow-xl hover:shadow-slate-200/50"
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
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 relative overflow-hidden">
                        {/* Abstract Background Decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-100/50 rounded-full blur-xl" />
                        <Package className="w-12 h-12 text-slate-300 mb-2 relative z-10" />
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-black text-slate-900 truncate">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      className="text-sm text-slate-500 line-clamp-1 mb-4 leading-relaxed"
                    />

                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                        {allCategoryList.find((c) => c.id === item.category)
                          ?.name || "Building Material"}
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        ${item.price}
                      </span>
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
              {/* Decorative Accent */}
              <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />

              <div className="mb-8">
                <h3 className="text-3xl font-black text-slate-900 mb-3">
                  Submit Inquiry
                </h3>
                <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <Info className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    Interested in these product? Send us an inquiry and we'll
                    get back to you with pricing and availability.
                  </p>
                </div>
              </div>

              <InquiryForm cart productIds={cart.map((item) => item.id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
