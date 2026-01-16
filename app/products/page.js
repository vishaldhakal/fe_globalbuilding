import { fetchCategories, fetchProducts } from "@/lib/api";
import ProductsGrid from "@/components/ProductsGrid";
export const revalidate = 60;
export default async function ProductsPage() {
  const products = await fetchProducts();
  const categories = await fetchCategories();
  return (
    <div className="min-h-screen w-full px-2 md:px-12 bg-white pt-12 pb-20">
      <div className="max-w-6xl w-full mx-auto ">
        {/* Header */}
        <div className="mb-12 space-y-2 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            All Products
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Browse our complete selection of premium building materials and
            supplies.
          </p>
        </div>
        <ProductsGrid products={products} categories={categories} />
      </div>
    </div>
  );
}
