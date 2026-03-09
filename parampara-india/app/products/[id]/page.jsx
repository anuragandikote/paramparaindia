import Link from "next/link";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import Breadcrumbs from "@/components/common/breadcrumbNavigator";
import SavingsCalculator from "@/components/home/savingsCalculator";
import { getWhatsAppLink } from "@/common/getWhatsappLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Product Not Found | Parampara India",
    };
  }

  return {
    title: `${product.name} | Parampara India`,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const { id } = params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <section className="bg-[#faf7f2] py-16">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-700">
            Product not found
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            We couldn't find that stove.
          </h1>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return <ProductDetailClient product={product} />;
}