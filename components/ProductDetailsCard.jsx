import Image from "next/image";
import Link from "next/link";

const myLoader = ({ src }) => src;

export default function ProductDetails({ product }) {
  return (
    <div className="w-full">
      {/* Image Container */}
      <div className="bg-gray-50 relative rounded-2xl shadow-sm mb-8 flex justify-center items-center overflow-hidden w-full h-96 border border-gray-200">
        {product.image ? (
          <Image
            loader={myLoader}
            src={product.image}
            alt={product.name}
            className="object-contain rounded-2xl p-6"
            fill
            unoptimized
          />
        ) : (
          <span className="text-gray-400 text-lg">No image</span>
        )}
      </div>

      {/* Product Info Container */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h2>
            <p className="text-gray-900 text-2xl font-bold mb-4">
              Starting from ${product.price}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">Availability:</span>
            {product?.availability ? (
              <span className="px-4 py-2 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm font-semibold">
                In Stock
              </span>
            ) : (
              <span className="px-4 py-2 bg-red-50 text-red-700 border border-red-100 rounded-full text-sm font-semibold">
                Out Of Stock
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-bold text-lg mb-3 text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300"
            >
              <span>←</span>
              <span>Back to Categories</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
