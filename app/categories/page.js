"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/categories/${id}/delete/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        setCategoryId(null);
        toast.success("Category deleted successfully");
        setCategories(categories.filter((c) => c.id !== id));
      } else {
        toast.error("Failed to delete category.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting category.");
    }
  };

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Browse Categories
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Explore our wide range of building supply categories
          </p>
        </div>

        {categories?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.map((cat) => (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
              >
                {/* Trash Icon */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCategoryId(cat.id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-sm"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <Link
                  href={`/categories/${cat.id}`}
                  className="flex flex-col h-full"
                >
                  <div className="bg-gray-50 h-64 w-full flex items-center justify-center overflow-hidden relative">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="h-full w-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <span className="text-gray-400 font-medium">No image</span>
                    )}
                  </div>
                  <div className="p-8 border-t border-gray-50">
                    <h3 className="font-bold text-2xl text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-lg text-gray-500 py-24 bg-gray-50 rounded-3xl">
            <span>No category available</span>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {categoryId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Are you sure?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Do you really want to delete this category? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCategoryId(null)}
                  className="px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-300 font-medium text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(categoryId)}
                  className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
