"use client";
import { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowRight, Layers } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryGrid({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [deleteId, setDeleteId] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/categories/${id}/delete/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        setCategories(categories.filter((c) => c.id !== id));
        setDeleteId(null);
        toast.success("Category removed successfully");
      }
    } catch (err) {
      toast.error("Could not delete category");
    }
  };

  if (!categories?.length) {
    return (
      <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200">
        <Layers className="mx-auto text-slate-300 mb-4" size={48} />
        <p className="text-slate-500 font-bold">No categories found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
          {categories.map((cat) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={cat.id}
              className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-500"
            >
              {/* Delete Trigger */}
              <button
                onClick={() => setDeleteId(cat.id)}
                className="absolute top-6 right-6 z-20 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-500 hover:text-white shadow-xl cursor-pointer"
              >
                <Trash2 size={20} />
              </button>

              <Link
                href={`/categories/${cat.id}`}
                className="flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-72 w-full bg-slate-50 overflow-hidden">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 italic">
                      No image available
                    </div>
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content Section */}
                <div className="p-8 relative">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium">
                    {cat.description ||
                      "Browse our premium selection of quality materials for your project."}
                  </p>

                  <div className="flex items-center text-sm font-black text-slate-900 uppercase tracking-widest gap-2">
                    Explore Now{" "}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Modal */}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Are you sure?
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Do you really want to delete this category? This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-300 font-medium text-gray-700 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
