"use client";
import { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  Plus,
  Search,
  Package,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import InquiryForm from "@/components/inquiryForm";
export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // Fetch products and categories

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${apiUrl}/products/`),
        fetch(`${apiUrl}/categories/`),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();
      setProducts(prodData);
      setCategories(catData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const allCategories = categories.flatMap((c) => [
    { id: c.id, name: c.name },
    ...(c.subcategories?.map((sub) => ({ id: sub.id, name: sub.name })) || []),
  ]);
  const { cart, removeFromCart } = useCart();

  return (
    <div className="min-h-screen w-full mx-auto py-12 px-2 md:px-12 ">
      <div className="max-w-6xl w-full mx-auto ">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Product Details - 7 cols */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl mx-auto ">
              {/* Header */}
              <h2 className="text-xl font-bold mb-4 bg-white border border-gray-100 rounded-xl shadow-sm p-6">
                Shopping Cart ({cart?.length} items)
              </h2>

              {/* Cart Card */}
              {cart?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex items-center gap-4 mb-2"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-contain w-20 h-20"
                      />
                    </div>

                    <div className="self-start flex-1">
                      <div className="flex flex-col">
                        <h3 className="text-base font-semibold text-gray-800">
                          {item.name}
                        </h3>

                        <div
                          dangerouslySetInnerHTML={{ __html: item.description }}
                          className="text-xs text-gray-500 line-clamp-1 mt-0.5 max-w-[400px] mb-2"
                        />
                        <span className="inline-flex w-fit items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {allCategories.find((c) => c.id === p.category)
                            ?.name || "Uncategorized"}
                        </span>
                      </div>
                    </div>
                    {/* Price and Delete */}
                    <div className="flex items-center self-end gap-4">
                      <span className="text-lg font-bold text-gray-900">
                        $ {item.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors cursor pointer"
                      >
                        <Trash2 size={22} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inquiry Form - 5 cols */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Request a Quote
              </h3>
              <p className="text-gray-500 mb-8 text-sm">
                Interested in these product? Send us an inquiry and we'll get
                back to you with pricing and availability.
              </p>
              <InquiryForm cart productIds={cart.map((item) => item.id)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
