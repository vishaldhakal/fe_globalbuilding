import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ContactSection from "@/components/ContactSection";
import { fetchCategories } from "@/lib/api";
import Home from "@/components/Home";
export const revalidate = 60;
export default async function page() {
  const categories = await fetchCategories();

  return (
    <div className="min-h-screen bg-white">
      <Home categories={categories} />
      <WhyChooseUsSection />
      <ContactSection />
    </div>
  );
}
