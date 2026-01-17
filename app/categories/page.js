import CategoryGrid from "@/components/CategoryGrid";
import { fetchCategories } from "@/lib/api";

export const metadata = {
  title: "Browse Categories | Building Supplies",
  description: "Explore our wide range of building supply categories.",
};

export default async function CategoriesPage() {
  const initialCategories = await fetchCategories();

  return (
    <div className="min-h-screen w-full bg-[#fafafa] pt-16 pb-24 px-2 md:px-12">
      <div className="max-w-6xl w-full mx-auto ">
        {/* Header Section */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
            Categories
          </h1>
          <div className="h-1.5 w-20 bg-pink-600 rounded-full mb-6" />
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Premium building materials and professional supplies organized for
            your convenience.
          </p>
        </header>

        <CategoryGrid initialCategories={initialCategories} />
      </div>
    </div>
  );
}
