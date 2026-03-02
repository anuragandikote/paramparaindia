"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product, priority }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group rounded-2xl bg-white shadow-sm ring-1 ring-transparent hover:ring-orange-200 transition">

      {/* DESKTOP CLICK OVERLAY */}
      <Link
        href={`/products/${product.id}`}
        className="absolute inset-0 z-10 hidden md:block"
        aria-label={`View ${product.name}`}
      />

      {/* IMAGE */}
      <div
        className="relative h-72 md:h-80 w-full overflow-hidden rounded-t-2xl bg-gray-100 cursor-pointer md:cursor-default"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Mobile hint */}
        <div className="absolute bottom-3 left-3 md:hidden rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
          Tap to view details
        </div>
      </div>

      {/* DESKTOP CONTENT */}
      <div className="hidden md:block p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          {product.name}
        </h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* MOBILE EXPANDABLE CONTENT */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-out
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="p-5 border-t">
          <h2 className="text-base font-semibold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {product.description}
          </p>

          {product.category?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.category.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href={`/products/${product.id}`}
            className="mt-4 inline-block text-sm font-semibold text-orange-700"
          >
            View product →
          </Link>
        </div>
      </div>
    </div>
  );
}
