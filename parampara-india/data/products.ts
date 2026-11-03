import { LPG_SAVINGS_CLAIM } from "@/data/site";

export type ProductCategory = "domestic" | "commercial";

export type Product = {
  /** Canonical URL slug, always lowercase. */
  id: string;
  /** Model code shown to customers, e.g. W1. */
  model: string;
  name: string;
  description: string;
  image?: string;
  video?: string;
  ytShorts?: string;
  category: ProductCategory[];
  /** INR, GST included. */
  price: number;
  priceLabel: string;
  capacityMin: number;
  capacityMax: number;
  capacityLabel: string;
  /** False for models that should not have a public page yet (W3A, W14). */
  hasPage: boolean;
  suitableFor: string;
  savings: string;
};

export function formatInr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function formatPriceWithGst(amount: number) {
  return `${formatInr(amount)} (GST included)`;
}

type ProductInput = Omit<Product, "id" | "priceLabel" | "savings"> & {
  id?: string;
};

function createProduct(input: ProductInput): Product {
  return {
    ...input,
    id: (input.id ?? input.model).toLowerCase(),
    priceLabel: formatPriceWithGst(input.price),
    savings: LPG_SAVINGS_CLAIM,
  };
}

const catalog: Product[] = [
  createProduct({
    model: "W1",
    name: "W1 Wood Gasifier Stove",
    description:
      "Perfect for 3–10 persons. Domestic and small kitchen friendly, cast iron, 600–700°C heat.",
    image: "/images/products/W1.webp",
    video: "/videos/all-in-one-english.mp4",
    ytShorts: "k-e1-w9Bvdw",
    category: ["domestic"],
    price: 6000,
    capacityMin: 3,
    capacityMax: 10,
    capacityLabel: "3–10 persons",
    hasPage: true,
    suitableFor: "Homes, small families",
  }),
  createProduct({
    model: "W1A",
    name: "W1A Wood Gasifier Stove",
    description:
      "Perfect for 3–15 persons. Domestic and small kitchen friendly, cast iron, 600–700°C heat.",
    image: "/images/products/W1A.webp",
    video: "/videos/all-in-one-english.mp4",
    ytShorts: "DTO7vyJlBEE",
    category: ["domestic"],
    price: 6500,
    capacityMin: 3,
    capacityMax: 15,
    capacityLabel: "3–15 persons",
    hasPage: true,
    suitableFor: "Homes and small kitchens",
  }),
  createProduct({
    model: "W2",
    name: "W2 Wood Gasifier Stove",
    description:
      "Ideal for hotels, tea shops, and small-scale industries. Cast iron, high efficiency.",
    image: "/images/products/W2.webp",
    video: "/videos/all-in-one-english.mp4",
    ytShorts: "kZPx_lvr4ng",
    category: ["domestic", "commercial"],
    price: 9000,
    capacityMin: 5,
    capacityMax: 25,
    capacityLabel: "5–25 persons",
    hasPage: true,
    suitableFor: "Tea shops, small hotels, PGs",
  }),
  createProduct({
    model: "W3",
    name: "W3 Wood Gasifier Stove",
    description:
      "Ideal for hotels, tea shops, and small-scale industries. Cast iron, high efficiency.",
    image: "/images/products/W3.webp",
    video: "/videos/all-in-one-english.mp4",
    ytShorts: "k5NPC1Jc9JQ",
    category: ["domestic", "commercial"],
    price: 10000,
    capacityMin: 5,
    capacityMax: 40,
    capacityLabel: "5–40 persons",
    hasPage: true,
    suitableFor: "Tea shops, small hotels, PGs",
  }),
  createProduct({
    model: "W3A",
    name: "W3A Wood Gasifier Stove",
    description: "Wood gasifier stove for 10–70 persons.",
    category: ["commercial"],
    price: 12000,
    capacityMin: 10,
    capacityMax: 70,
    capacityLabel: "10–70 persons",
    hasPage: false,
    suitableFor: "Larger commercial kitchens",
  }),
  createProduct({
    model: "W4",
    name: "W4 Wood Gasifier Stove",
    description:
      "Medium-large hotels, cloud kitchens, temples. Cook for 100–300 persons at a time.",
    image: "/images/products/W4.webp",
    video: "/videos/all-in-one-english.mp4",
    ytShorts: "5nEEU-ueDdk",
    category: ["commercial"],
    price: 20000,
    capacityMin: 100,
    capacityMax: 300,
    capacityLabel: "100–300 persons",
    hasPage: true,
    suitableFor: "Medium hotels, hostels, temples",
  }),
  createProduct({
    model: "W8",
    name: "W8 Wood Gasifier Stove",
    description:
      "Heavy commercial, cook for 250–1,000 persons. Large-scale hotels and caterers.",
    image: "/images/products/W8.webp",
    video: "/videos/all-in-one-english.mp4",
    category: ["commercial"],
    price: 32000,
    capacityMin: 250,
    capacityMax: 1000,
    capacityLabel: "250–1,000 persons",
    hasPage: true,
    suitableFor: "Mid-day meals, industrial kitchens",
  }),
  createProduct({
    model: "W14",
    name: "W14 Wood Gasifier Stove",
    description: "Wood gasifier stove for about 1,500 persons.",
    category: ["commercial"],
    price: 42000,
    capacityMin: 1500,
    capacityMax: 1500,
    capacityLabel: "about 1,500 persons",
    hasPage: false,
    suitableFor: "Very large industrial kitchens",
  }),
];

/** Every model, including ones without a public page yet. */
export const allProducts: readonly Product[] = catalog;

/** Models that have a public product page and appear on the site. */
export const products: Product[] = catalog.filter((product) => product.hasPage);

export const publishedProducts = products;

const startingPrice = Math.min(...products.map((product) => product.price));

export const STARTING_PRICE_LABEL = `Starting from ${formatPriceWithGst(startingPrice)}`;

export function getProductByModel(model: string) {
  return allProducts.find(
    (product) => product.model.toLowerCase() === model.toLowerCase()
  );
}

export function getProductBySlug(slug: string) {
  const normalized = slug.toLowerCase();
  return products.find((product) => product.id === normalized);
}

/** Canonical slug when `requested` matches a published model in any casing. */
export function getCanonicalProductSlug(requested: string) {
  return getProductBySlug(requested)?.id ?? null;
}

/**
 * Cheapest model in `source` whose capacity range includes `people`.
 * If none does, the next larger model, then the largest.
 * Defaults to published models. Pass `allProducts` to include models without a page.
 */
export function recommendProduct(
  people: number,
  source: readonly Product[] = products
) {
  const covering = source.filter(
    (product) => people >= product.capacityMin && people <= product.capacityMax
  );

  if (covering.length > 0) {
    return [...covering].sort((a, b) => a.price - b.price)[0];
  }

  const larger = [...source]
    .filter((product) => product.capacityMin > people)
    .sort((a, b) => a.capacityMin - b.capacityMin);

  if (larger.length > 0) {
    return larger[0];
  }

  return [...source].sort((a, b) => b.capacityMax - a.capacityMax)[0];
}
