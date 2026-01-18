import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
import { SearchX, SlidersHorizontal } from "lucide-react";

export const revalidate = 60;

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.query || "";

  const allProducts = await fetchProducts();

  const filteredProducts = query
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      )
    : allProducts;

  return (
    <div className="min-h-screen w-full bg-white pt-12 pb-24 px-2 md:px-12">
      <div className="max-w-6xl mx-auto ">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-gray-100 pb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {query ? `Results for "${query}"` : "All Products"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Found {filteredProducts.length} products
            </p>
          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-x-4 gap-y-8">
            {filteredProducts.map((p) => (
              <div key={p.id} className="flex justify-center">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          /* Enhanced Empty State */
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
            <div className="bg-gray-50 p-6 rounded-full mb-4">
              <SearchX size={48} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              No results found
            </h2>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              We couldn't find any products matching "{query}". Try checking
              your spelling or using more general keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
