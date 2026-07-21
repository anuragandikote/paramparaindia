import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import Breadcrumbs from "@/components/common/breadcrumbNavigator";
import ProductCard from "@/components/common/productCard";

export const metadata = {
  title: "Wood Gasifier Stoves for Domestic & Commercial Kitchens",
  description:
    "High-efficiency wood gasifier stoves for homes, hotels, hostels, temples & industries. Used wherever LPG, gas, or fire is required.",
};

export default function ProductsPage() {
  return (
    <section className="bg-[#faf7f2] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">

        {/* HEADER */}
        <header className="">
          <Breadcrumbs />

          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Wood Gasifier Stoves for Every Cooking Scale
          </h1>

          <p className="mt-4 text-gray-700 text-base">
            Designed for domestic kitchens, commercial hotels, hostels,
            temples, and industrial cooking — wherever LPG, gas, or fire-based
            heat is required.
          </p>
        </header>

        {/* PRODUCTS GRID */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
