import { notFound, permanentRedirect } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getProductBySlug, products } from "@/data/products";

export const dynamicParams = true;

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductBySlug(id);

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

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) {
    notFound();
  }

  if (id !== product.id) {
    permanentRedirect(`/products/${product.id}`);
  }

  return <ProductDetailClient product={product} />;
}
