'use client';

import { useEffect, useRef } from "react";
import { products } from "@/data/products";
import ProductCard from "../common/productCard";

export default function ProductsPreview() {
    const scrollRef = useRef(null);
    const sectionRef = useRef(null);
    const hasNudged = useRef(false);

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

                {/* Products Grid */}
                <div
                    ref={scrollRef}
                    className="
       mt-10
    grid grid-cols-2
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
    lg:grid-cols-4
    md:gap-4
  "
                >                    {products.map((product, idx) => (
                    <div key={idx} className="snap-center shrink-0">
                        <ProductCard product={product} />
                    </div>))}
                </div>
            </div>
        </section>
    );
}
