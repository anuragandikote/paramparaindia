import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCanonicalProductSlug } from "@/data/products";

export function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/products\/([^/]+)\/?$/);
  if (!match) {
    return NextResponse.next();
  }

  const requested = decodeURIComponent(match[1]);
  const canonical = getCanonicalProductSlug(requested);

  if (!canonical || canonical === requested) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/products/${canonical}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/products/:id",
};
