"use client";

import Link from "next/link";
import SavingsCalculator from "@/components/home/savingsCalculator";
import { getWhatsAppLink, productInterestMessage } from "@/common/getWhatsappLink";
import Breadcrumbs from "@/components/common/breadcrumbNavigator";
import { trackProductView, trackCTAClick, trackWhatsappClick } from "@/lib/gtag";
import { LPG_SAVINGS_CLAIM, PRIMARY_WHATSAPP_NUMBER, WARRANTY_AND_BLOWER_CARE } from "@/data/site";
import React from "react";

export default function ProductDetailClient({ product }) {
  const [isClient, setIsClient] = React.useState(false);

  // YouTube Embed URL conversion for Shorts
  const videoId = product?.ytShorts;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`;

  React.useEffect(() => {
    setIsClient(true);
    if (product) {
      trackProductView(product, 'Product Detail Page');
    }
  }, [product]);

  const interestMessage = productInterestMessage(product.model ?? product.name);
  const whatsappHref = getWhatsAppLink({ message: interestMessage });

  const handleWhatsAppClick = () => {
    trackWhatsappClick(PRIMARY_WHATSAPP_NUMBER, interestMessage, {
      product_id: product.id,
      product_name: product.name,
      source: 'product_detail_page'
    });
  };

  const scrollToCalculator = () => {
    const calculatorElement = document.getElementById('savings-calculator');
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleViewAllProducts = () => {
    trackCTAClick('view_all_products', '/products', {
      source: 'product_detail_page'
    });
  };

  return (
    <section className="bg-[#faf7f2] py-4 md:py-16">
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
          <div className="">
            <div className="h-[70vh] md:h-20 lg:h-screen rounded-xl bg-black shadow-lg relative">
              {isClient && product.ytShorts ? (
                <iframe
                  src={embedUrl}
                  title={`${product.name} demonstration`}
                  className="w-full h-full rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">Video Available</h3>
                    <p className="text-gray-300 mb-6">Request a demonstration video for this product</p>
                    <a
                      href={getWhatsAppLink({
                        message: `${interestMessage}. I would like to see a video demonstration.`,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
                      onClick={handleWhatsAppClick}
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.80 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Request Video
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="flex flex-col">
            <div className="relative">
              {/* Content container */}
              <div className="p-6">
                {/* Product header with accent */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-400 text-white rounded-full mb-4 shadow">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="text-xs font-bold">In Stock</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {product.name}
                  </h1>

                  {product.priceLabel && (
                    <p className="text-2xl font-bold text-gray-900 mb-3">{product.priceLabel}</p>
                  )}
                  
                  <p className="text-base text-gray-600 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Category tags */}
                  {product.category && product.category.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.category.map((cat, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Key Features - Compact Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84l7 3a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Material</div>
                        <div className="text-xs text-gray-600">Cast Iron</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879 1.178 2.12 2.12A3 3 0 0112.12 15.12z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Heat</div>
                        <div className="text-xs text-gray-600">600–700°C</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Eco</div>
                        <div className="text-xs text-gray-600">Smokeless</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">Capacity</div>
                        <div className="text-xs text-gray-600">
                          {product.capacityLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Specs - Compact */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-gray-500">Technology</div>
                      <div className="font-semibold text-gray-900">Wood Gasifier</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Fuel</div>
                      <div className="font-semibold text-gray-900">Wood/Biomass</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Build</div>
                      <div className="font-semibold text-gray-900">Cast Iron</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Emissions</div>
                      <div className="font-semibold text-gray-900">Smokeless</div>
                    </div>
                  </div>
                </div>

                {/* Savings - Compact */}
                {product.savings && (
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 mb-6 text-white cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={scrollToCalculator}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold mb-1">{product.savings}</div>
                        <div className="text-green-100 text-xs">vs LPG (Click to calculate)</div>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2 3 2 3m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Benefits - Compact List */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Why Choose This Model?</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Cost Effective</div>
                        <div className="text-xs text-gray-600">{LPG_SAVINGS_CLAIM}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Eco Friendly</div>
                        <div className="text-xs text-gray-600">Zero emissions</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Durable</div>
                        <div className="text-xs text-gray-600">Industrial grade</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-gray-800">
              {WARRANTY_AND_BLOWER_CARE}
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappHref}
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

      <div id="savings-calculator" className="mt-16">
        <SavingsCalculator
          sectionId="product-savings"
          title={`Calculate Your Savings with ${product.name}`}
          description="See how much you can save on fuel costs with our efficient stoves"
        />
      </div>
    </section>
  );
}
