"use client";

import Link from "next/link";
import SavingsCalculator from "@/components/home/savingsCalculator";
import { getWhatsAppLink } from "@/common/getWhatsappLink";
import Breadcrumbs from "@/components/common/breadcrumbNavigator";
import { useEffect } from "react";
import { trackProductView, trackCTAClick, trackWhatsappClick } from "@/lib/gtag";

export default function ProductDetailClient({ product }) {
  useEffect(() => {
    if (product) {
      trackProductView(product, 'Product Detail Page');
    }
  }, [product]);

  const handleWhatsAppClick = () => {
    trackWhatsappClick('917019713708', `I'm interested in ${product.name}`, {
      product_id: product.id,
      product_name: product.name,
      source: 'product_detail_page'
    });
  };

  const handleViewAllProducts = () => {
    trackCTAClick('view_all_products', '/products', {
      source: 'product_detail_page'
    });
  };

  return (
    <section className="bg-[#faf7f2] py-16">
      <div className="container mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name, href: `/products/${product.id}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          {/* Left side - Video */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100">
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={product.image}
              >
                <source src={product.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Floating badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.savings && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Save {product.savings}
                </div>
              )}
              {product.category?.[0] && (
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {product.category[0]}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Category tags */}
              {product.category && product.category.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.category.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Savings highlight */}
              {product.savings && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-green-800 font-semibold">
                      Save up to {product.savings} on fuel costs
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={getWhatsAppLink({
                  page: "products",
                  model: product.name,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-linear-to-r from-green-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:from-green-600 hover:to-green-700"
                onClick={handleWhatsAppClick}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Ask on WhatsApp
              </a>
              <Link
                href="/products"
                className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:bg-orange-50"
                onClick={handleViewAllProducts}
              >
                View all products
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SavingsCalculator
        sectionId="product-savings"
        title={`Calculate Your Savings with ${product.name}`}
        description="See how much you can save on fuel costs with our efficient stoves"
      />
    </section>
  );
}
