import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { PUBLIC_ROUTES, SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: new URL(route, SITE_URL).href,
    lastModified,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: new URL(`/products/${product.id}`, SITE_URL).href,
    lastModified,
  }));

  return [...staticEntries, ...productEntries];
}
