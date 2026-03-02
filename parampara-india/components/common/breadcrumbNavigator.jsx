'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

function formatLabel(segment) {
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => ({
    label: formatLabel(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center text-sm text-gray-500 tracking-widest">
        {/* Home */}
        <li className="flex items-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 hover:underline transition"
          >
            Home
          </Link>
          {breadcrumbs.length > 0 && (
            <span className="mx-2 text-gray-400">›</span>
          )}
        </li>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.href} className="flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={crumb.href}
                    className="text-blue-600 hover:text-blue-700 hover:underline transition"
                  >
                    {crumb.label}
                  </Link>
                  <span className="mx-2 text-gray-400">›</span>
                </>
              ) : (
                <span className="font-medium text-gray-700">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
