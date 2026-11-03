'use client';

import { useEffect, useRef } from "react";
import { products, STARTING_PRICE_LABEL } from "@/data/products";
import ProductCard from "../common/productCard";
import { trackSocialClick } from "@/lib/gtag";

export default function ProductsPreview() {
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);
    const hasNudged = useRef(false);

    const handleInstagramClick = () => {
        trackSocialClick('instagram', 'follow', { 
            source: 'products_preview_section',
            handle: '@indiaparampara'
        });
    };

    useEffect(() => {
        if (!sectionRef.current || !scrollRef.current) return;

        // Only on mobile
        if (window.innerWidth >= 768) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasNudged.current) {
                    hasNudged.current = true;

                    const el = scrollRef.current;

                    // Small right nudge then back
                    setTimeout(() => {
                        el.scrollBy({ left: 40, behavior: "smooth" });

                        setTimeout(() => {
                            el.scrollBy({ left: -40, behavior: "smooth" });
                        }, 600);
                    }, 300);

                    observer.disconnect(); // clean up after first trigger
                }
            },
            {
                threshold: 0.4, // triggers when ~40% visible
            }
        );

        observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="products"
            ref={sectionRef}
            className="py-16 bg-white"
        >
            <div className="container mx-auto px-2 md:px-8">

                {/* Section Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    Our Products
                </h2>
                <p className="mt-4 text-center text-gray-700 max-w-2xl mx-auto">
                    Explore our range of energy-efficient and durable wood gasifier stoves.
                </p>
                <p className="mt-3 text-center text-lg font-semibold text-gray-900">
                    {STARTING_PRICE_LABEL}
                </p>

                {/* Products Grid */}
                <div
                    ref={scrollRef}
                    className="
       mt-10
    grid grid-cols-1
    gap-2
    overflow-x-auto
    snap-x snap-mandatory
    scrollbar-hide

    /* mobile card sizing */
    [&>*]:min-w-[85%]
    sm:[&>*]:min-w-[70%]

    /* desktop layout */
    md:grid
    md:grid-cols-3
    md:gap-4
  "
                >                    {products.map((product, idx) => (
                    <div key={idx} className="snap-center shrink-0">
                        <ProductCard product={product} listIndex={idx} />
                    </div>))}
                </div>

                {/* Instagram Highlight Section */}
                <div className="mt-20 relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 rounded-3xl opacity-10"></div>
                    
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-linear-to-tr from-orange-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
                        
                        <div className="relative z-10 text-center">
                            {/* Instagram icon */}
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl shadow-xl mb-6 mx-auto transform rotate-3 hover:rotate-6 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
                                    <circle cx="18.406" cy="5.594" r="1.44"/>
                                </svg>
                            </div>

                            {/* Main heading */}
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                <span className="bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                                    Follow Us on Instagram
                                </span>
                            </h3>

                            {/* Handle display */}
                            <div className="mb-6">
                                <div className="inline-flex items-center bg-linear-to-r from-purple-50 to-pink-50 rounded-full px-6 py-3 border border-purple-200">
                                    <span className="text-xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        @indiaparampara
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                                Join our community for daily inspiration, cooking tips, customer stories, and exclusive behind-the-scenes content from Parampara India.
                            </p>

                            {/* Call-to-action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="https://instagram.com/indiaparampara"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
                                    onClick={handleInstagramClick}
                                >
                                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                                        <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
                                        <circle cx="18.406" cy="5.594" r="1.44"/>
                                    </svg>
                                    Follow on Instagram
                                </a>

                                <div className="flex items-center space-x-2 text-gray-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                    <span className="font-medium">Daily Updates</span>
                                </div>
                            </div>

                            {/* Feature highlights */}
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Visual Stories</h4>
                                    <p className="text-sm text-gray-600">Behind-the-scenes content</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Customer Love</h4>
                                    <p className="text-sm text-gray-600">Real stories & reviews</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Cooking Tips</h4>
                                    <p className="text-sm text-gray-600">Expert recipes & hacks</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Stove Quiz</h4>
                                    <p className="text-sm text-gray-600">Find your perfect match</p>
                                </div>
                            </div>

                            {/* Quiz CTA Section */}
                            <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    Not sure which stove is right for you?
                                </h3>
                                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                    Take our 30-second quiz and get personalized recommendations based on your kitchen needs, cooking volume, and budget. Calculate your exact LPG savings instantly.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="/quiz"
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                        </svg>
                                        Take Quiz Now
                                    </a>
                                    <a
                                        href="/products"
                                        className="inline-flex items-center px-6 py-3 bg-white border-2 border-orange-200 text-orange-700 font-semibold rounded-full hover:bg-orange-50 transition-all duration-200"
                                    >
                                        Browse All Models
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
