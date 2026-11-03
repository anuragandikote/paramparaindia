"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { trackProductView, trackProductClick, trackWhatsappClick } from "@/lib/gtag";
import { getWhatsAppLink, productInterestMessage } from "@/common/getWhatsappLink";
import { LPG_SAVINGS_CLAIM, PRIMARY_WHATSAPP_NUMBER } from "@/data/site";

export default function ProductCard({ product, priority, listIndex = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  // Track product view when component mounts
  useEffect(() => {
    trackProductView(product, 'Product List');
  }, [product]);

  const handleProductClick = () => {
    trackProductClick(product, 'Product List', listIndex);
  };

  const interestMessage = productInterestMessage(product.model ?? product.name);
  const whatsappHref = getWhatsAppLink({ message: interestMessage });

  const handleWhatsappClick = (e) => {
    e.stopPropagation();
    trackWhatsappClick(PRIMARY_WHATSAPP_NUMBER, interestMessage, { 
      product_id: product.id,
      product_name: product.name 
    });
  };

  return (
    <article
      className="relative block group rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      <Link
        href={`/products/${product.id}`}
        aria-label={`Explore ${product.name}`}
        className="absolute inset-0 z-10"
        onClick={handleProductClick}
      />

      {/* Premium gradient overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-orange-50 via-transparent to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* IMAGE CONTAINER */}
      <div
        className="relative h-72 md:h-80 w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-all duration-700"
        />

        {/* Premium glassmorphism overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Premium quick actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
          <div
            className="relative group/btn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/90 backdrop-blur-md p-3 rounded-full shadow-2xl border border-white/50 transition-all  hover:bg-white">
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          
          <button className="relative group/btn">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-70 group-hover/btn:opacity-100 transition-opacity"></div>
            <div className="relative bg-red-500/90 backdrop-blur-md p-3 rounded-full shadow-2xl border border-red-400/50 transition-all  hover:bg-red-500">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Mobile touch indicator removed */}
      </div>

      {/* Premium content section */}
      <div className="relative p-6 bg-linear-to-b from-white to-gray-50">
        {/* Decorative element */}
        <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-orange-200 to-transparent"></div>
        
        {/* Product title with premium styling */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
            {product.name}
          </h3>
          {product.priceLabel && (
            <p className="text-lg font-bold text-gray-900">{product.priceLabel}</p>
          )}
          {product.capacityLabel && (
            <p className="mt-1 text-sm font-medium text-gray-600">{product.capacityLabel}</p>
          )}
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-px bg-linear-to-r from-orange-200 to-transparent"></div>
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="flex-1 h-px bg-linear-to-l from-orange-200 to-transparent"></div>
          </div>
        </div>

        {/* Enhanced description */}
        <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base line-clamp-3 font-medium">
          {product.description}
        </p>

        {/* Premium specs grid */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-3 border border-orange-200/50">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full mb-2 mx-auto">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-xs text-orange-600 font-medium text-center">Premium</div>
            <div className="text-xs font-bold text-orange-800 text-center">Cast Iron</div>
          </div>
          
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-3 border border-green-200/50">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full mb-2 mx-auto">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-xs text-green-600 font-medium text-center">LPG</div>
            <div className="text-[11px] font-bold leading-tight text-green-800 text-center">{LPG_SAVINGS_CLAIM}</div>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-3 border border-blue-200/50">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full mb-2 mx-auto">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="text-xs text-blue-600 font-medium text-center">Heat</div>
            <div className="text-xs font-bold text-blue-800 text-center">700°C</div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-2xl p-3 border border-purple-200/50">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full mb-2 mx-auto">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <div className="text-xs text-purple-600 font-medium text-center">Quality</div>
            <div className="text-xs font-bold text-purple-800 text-center">Premium</div>
          </div>
        </div>

        {/* Premium action buttons */}
        <div className="flex gap-3">
          <div
            className="flex-1 bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 text-white rounded-2xl px-6 py-3.5 text-sm font-bold text-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 active:scale-95 border border-orange-400/50 cursor-pointer"
          >
            Explore Product
          </div>
          
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={interestMessage}
            className="relative z-20 md:hidden bg-linear-to-r from-green-500 to-green-600 text-white rounded-2xl px-4 py-3.5 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:from-green-600 hover:to-green-700 active:scale-95 border border-green-400/50"
            onClick={handleWhatsappClick}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
