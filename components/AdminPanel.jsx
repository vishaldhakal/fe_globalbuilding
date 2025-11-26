"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Trash2,
  Edit,
  Plus,
  Search,
  Package,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AddCategory from "./AddCategoryModel";
import AddSubCategory from "./AddSubCategoryModel";

export default function AdminPanel() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [deleteModel, setDeleteModel] = useState(null);
  const [isCategoryModelOpen, setIsCategoryModelOpen] = useState(false);
  const [isSubCategoryModelOpen, setIsSubCategoryModelOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

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
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter products by search
  const filteredProducts = products.filter((p) => {
    const catName = categories.find((c) => c.id === p.category)?.name || "";
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      catName.toLowerCase().includes(search.toLowerCase())
    );
  });

  // handle delete
  const handleDelete = async (id) => {
    setDeleteModel(false);
    try {
      const res = await fetch(`${apiUrl}/products/${id}/delete/`, {
        method: "DELETE",
      });
      if (res.status === 204) {
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const allCategories = categories.flatMap((c) => [
    { id: c.id, name: c.name },
    ...(c.subcategories?.map((sub) => ({ id: sub.id, name: sub.name })) || []),
  ]);

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage your inventory and categories
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsCategoryModelOpen(true)}
              className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow"
            >
              <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <Plus className="w-3 h-3" />
              </div>
              <span className="text-sm">Add Category</span>
            </button>
            <button
              onClick={() => setIsSubCategoryModelOpen(true)}
              className="group flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-gray-300 text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow"
            >
              <div className="w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                <Plus className="w-3 h-3" />
              </div>
              <span className="text-sm">Add Subcategory</span>
            </button>
            <button
              onClick={() => router.push("/admin/products/new")}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black font-medium transition-all duration-200 shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Add Product</span>
            </button>
          </div>
        </div>

        {/* Search and Stats Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/5 focus:bg-white transition-all duration-200 text-sm placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-6 px-4 py-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>{products.length} Products</span>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="bg-white rounded-2xl shadow-none border border-gray-200 overflow-hidden">
          {filteredProducts?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Product Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      onClick={() =>
                        router.push(`/admin/products/${p.id}/edit`)
                      }
                      className="group hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                            {p?.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm group-hover:text-black transition-colors">
                              {p.name}
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1 mt-0.5 max-w-[200px]">
                              {p.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          {allCategories.find((c) => c.id === p.category)
                            ?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">
                          ${p.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {p.availability ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            In Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/admin/products/${p.id}/edit`);
                            }}
                            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200 hover:shadow-sm"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteModel(p.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-100"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p className="text-gray-500 mt-1">
                {search
                  ? "Try adjusting your search terms"
                  : "Get started by adding your first product"}
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModel && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 transform transition-all scale-100">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-center text-gray-900 mb-2">
                Delete Product?
              </h2>
              <p className="text-gray-500 text-center text-sm mb-6 leading-relaxed">
                This action cannot be undone. This will permanently delete the
                product from your inventory.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModel(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors duration-200 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteModel)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 text-sm font-medium shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {isCategoryModelOpen && (
          <AddCategory setIsCategoryModelOpen={setIsCategoryModelOpen} />
        )}
        {/* Add subCategory Modal */}
        {isSubCategoryModelOpen && (
          <AddSubCategory
            setIsSubCategoryModelOpen={setIsSubCategoryModelOpen}
          />
        )}
      </div>
    </div>
  );
}
