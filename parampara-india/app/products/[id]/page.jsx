import Link from "next/link";
import { products } from "@/data/products";
import SavingsCalculator from "@/components/home/savingsCalculator";
import { getWhatsAppLink } from "@/common/getWhatsappLink";
import Breadcrumbs from "@/components/common/breadcrumbNavigator";

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

export default async function ProductPage({ params }) {
  const { id } = await params;
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
            className="mt-6 inline-flex items-center rounded-full border border-orange-200 bg-white px-5 py-2 text-sm font-semibold text-orange-700 transition hover:-translate-y-0.5 hover:shadow"
          >
            Back to all products
          </Link>
        </div>
      </section>
    );
  }

  // YouTube Embed URL conversion for Shorts
  const videoId = product?.ytShorts;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

  return (
    <section className="bg-[#faf7f2] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <Breadcrumbs/>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          {/* VIDEO CONTAINER REPLACING IMAGE */}
          <div className="relative aspect-[9/16] max-h-[600px] w-full max-w-[340px] mx-auto overflow-hidden rounded-xl bg-black shadow-lg">
            <iframe
              src={embedUrl}
              title={`${product.name} demonstration`}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-4 text-gray-700 leading-relaxed">{product.description}</p>

            <div className="mt-6 space-y-4">
              {/* Key Specifications */}
              <div className="rounded-lg border border-gray-200 bg-linear-to-r from-orange-50 to-amber-50 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Key Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Material: Cast Iron</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Heat: 600–700°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">High Efficiency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Wood Gasifier Technology</span>
                  </div>
                </div>
              </div>

              {/* Savings Highlight */}
              <div className="flex items-center justify-between rounded-lg bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold text-green-800">Potential Savings</span>
                </div>
                <span className="font-bold text-green-700 text-lg">{product.savings}</span>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Ideal For</h3>
                <div className="flex flex-wrap gap-2">
                  {product.category?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-linear-to-r from-orange-100 to-amber-100 border border-orange-200 px-3 py-1.5 text-xs font-semibold text-orange-700 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                  </svg>
                  Key Benefits
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm text-gray-700">Environmentally friendly cooking solution</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm text-gray-700">Significant cost reduction vs LPG</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm text-gray-700">Durable cast iron construction</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppLink({
                  page: "products",
                  model: product.name,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:from-green-600 hover:to-green-700"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Ask on WhatsApp
              </a>
              <Link
                href="/products"
                className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-orange-50"
              >
                View all products
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SavingsCalculator
        sectionId="product-savings"
        title={`Savings with ${product.name}`}
        subtitle="Estimate your monthly savings compared to LPG usage."
        ctaLabel="Get exact savings for this model"
        ctaPage="savings"
        model={product.name}
      />
    </section>
  );
}