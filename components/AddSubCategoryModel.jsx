"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X, Upload, Image as ImageIcon, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function AddSubCategory({ setIsSubCategoryModelOpen }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
    parent: "", //optional
  });

  useEffect(() => {
    // Fetch existing categories
    fetch(`${apiUrl}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setNewCategory({ ...newCategory, image: file });
      if (file) {
        setPreview(URL.createObjectURL(file)); // set preview
      } else {
        setPreview(null);
      }
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  // Submit new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    if (newCategory.image) formData.append("image", newCategory.image);
    if (newCategory.parent)
      formData.append("parent", parseInt(newCategory.parent, 10));

    try {
      const res = await fetch(`${apiUrl}/categories/add/`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Subcategory added successfully!");
        setIsSubCategoryModelOpen(false);
        setNewCategory({ name: "", description: "", image: null, parent: "" });
        setPreview(null);
      } else {
        toast.error("Failed to add subcategory.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error adding subcategory.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100 relative overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h2 className="text-lg font-bold text-gray-900">New Subcategory</h2>
          <button
            onClick={() => setIsSubCategoryModelOpen(false)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 shadow-sm border border-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload with Preview */}
            <div className="flex justify-center">
              <div className="relative group">
                <input
                  type="file"
                  name="image"
                  id="subcategory-image"
                  onChange={handleChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="subcategory-image"
                  className={`
                    relative w-32 h-32 rounded-2xl cursor-pointer flex flex-col items-center justify-center 
                    transition-all duration-300 overflow-hidden border-2 border-dashed
                    ${
                      preview
                        ? "border-gray-200"
                        : "border-gray-300 hover:border-gray-900 hover:bg-gray-50"
                    }
                  `}
                >
                  {preview ? (
                    <>
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                        <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        Upload Icon
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Parent Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Parent Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  name="parent"
                  value={newCategory.parent}
                  onChange={handleChange}
                  className="w-full appearance-none border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 text-sm cursor-pointer"
                >
                  <option value="">Select a main category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Category Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Pipes"
                value={newCategory.name}
                onChange={handleChange}
                className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 text-sm placeholder:text-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Brief description of the subcategory..."
                value={newCategory.description}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-900 transition-all duration-200 bg-gray-50/50 resize-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsSubCategoryModelOpen(false)}
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-200 font-medium text-sm shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 active:scale-[0.98]"
              >
                Create Subcategory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
