import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrowseCategory from "@/components/BrowserCategory";
import { CartProvider } from "@/context/cartContext";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Product showcase application",
  description: "lets view products and inquiry about them",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-white text-black min-h-screen ${dmSans.className}`}>
        <CartProvider>
          <Navbar />

          <main>{children}</main>
          <Footer />
        </CartProvider>
        <Toaster richColors position="top-center"></Toaster>
      </body>
    </html>
  );
}
