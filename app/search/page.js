import { ProductCard } from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";
export const revalidate = 60;
export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query || "";

  const allProducts = await fetchProducts();

  const filteredProducts = query
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : allProducts;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 ">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className=" text-center text-gray-500 py-24">
          No products found for "{query}"
        </p>
      )}
    </div>
  );
}
