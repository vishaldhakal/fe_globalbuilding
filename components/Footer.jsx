import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white max-w-6xl mx-auto text-gray-900 py-20 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-4 sm:px-6 lg:px-8 gap-16">
        {/* Left: Company Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">
            Global Building Supplies
          </h2>
          <p className="max-w-xs text-gray-500 leading-relaxed font-light">
            Your trusted partner for all construction, hardware, and renovation
            materials in the GTA.
          </p>
        </div>
        
        {/* Middle: Quick Links */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-6 text-gray-900">Quick Links</h2>
          <ul className="space-y-4 text-gray-500">
            <li>
              <Link href="/categories" className="hover:text-gray-900 transition-colors duration-300">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-900 transition-colors duration-300">
                Products
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-gray-900 transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Right: Social Links */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-6 text-gray-900">Follow Us</h2>
          <ul className="flex flex-col space-y-4 text-gray-500">
            <li>
              <a href="https://www.facebook.com" className="hover:text-gray-900 transition-colors duration-300">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" className="hover:text-gray-900 transition-colors duration-300">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" className="hover:text-gray-900 transition-colors duration-300">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-100">
        <div className="text-center text-gray-400 text-sm">
          © 2025 Global Building Supplies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
