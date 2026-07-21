"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const primaryNav = [
    { label: "Products", href: "/products" },
    { label: "Stove Quiz", href: "/quiz" },
    { label: "Contact", href: "/contact" },
    { label: "How It Works", section: "how-it-works" },
    { label: "Save 80%", section: "savings-calculator" },
];

const resourceNav = [
    { label: "Videos", href: "/videos" },
    { label: "Industries", section: "industries" },
    { label: "Compare Models", section: "compare" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
        const onScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navigate = useCallback(
        (item) => {
            setMenuOpen(false);
            setDropdownOpen(false);

            if (item.href) {
                router.push(item.href);
                return;
            }

            if (pathname !== "/") {
                router.push(`/#${item.section}`);
                return;
            }

            const el = document.getElementById(item.section);
            el?.scrollIntoView({ behavior: "smooth" });
        },
        [pathname, router]
    );

    return (
        <>
            {/* HEADER */}
            <header
                className={`sticky top-0 z-[100] transition-all duration-300
        ${isClient && scrolled ? "bg-white/70 backdrop-blur shadow-sm" : "bg-white"}`}
            >
                <div className="container mx-auto h-16 flex items-center justify-between px-4">

                    {/* LOGO */}
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            alt="Parampara India"
                            width={140}
                            height={70}
                            priority
                            className="mix-blend-multiply"
                        />
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        {primaryNav.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => navigate(item)}
                                className="text-gray-700 hover:text-gray-900 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 hover:after:w-full transition-all cursor-pointer"
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* DROPDOWN */}
                        <div
                            className="relative"
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button
                                className="
      flex items-center gap-1.5
      text-gray-700 font-medium
      hover:text-gray-900
      transition
    "
                            >
                                Resources
                                <HiChevronDown
                                    className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`
      absolute top-full left-0 mt-3 w-52
      rounded-2xl border border-gray-100
      bg-white/80 backdrop-blur
      shadow-xl
      transition-all duration-200
      ${dropdownOpen
                                        ? "opacity-100 translate-y-0 visible"
                                        : "opacity-0 -translate-y-2 invisible"}
    `}
                            >
                                {resourceNav.map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => navigate(item)}
                                        className="
          w-full text-left px-4 py-3 text-sm cursor-pointer
          text-gray-700 hover:text-gray-900
          hover:bg-orange-100/90
          transition
        "
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </nav>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://wa.me/917019713708"
                            target="_blank"
                            className="hidden md:flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2 text-white font-semibold hover:bg-[#1EBE5D]"
                        >
                            <FaWhatsapp /> Chat
                        </a>

                        <button
                            onClick={() => setMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <HiMenu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>
            {/* MOBILE OVERLAY */}
            <div
                className={`
    fixed inset-0 z-[200] bg-black/40
    transition-opacity duration-300
    ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
  `}
                onClick={() => setMenuOpen(false)}
            />

            {/* MOBILE DRAWER */}
            <aside
                className={`
    fixed top-0 right-0 z-[201]
    h-full w-72
    bg-white/90 backdrop-blur
    rounded-l-2xl
    shadow-2xl
    transition-transform duration-500 ease-out
    ${menuOpen ? "translate-x-0" : "translate-x-full"}
  `}
            >
                {/* HEADER */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <span className="text-lg font-semibold text-gray-900">Menu</span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        <HiX className="h-6 w-6" />
                    </button>
                </div>

                {/* NAV ITEMS */}
                <nav className="flex flex-col gap-1 px-4 py-4">
                    {primaryNav.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => navigate(item)}
                            className="
          rounded-lg px-4 py-3 text-left text-sm font-medium
          text-gray-700 hover:bg-gray-100
          transition
        "
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className="mt-3 border-t pt-3">
                        <span className="px-4 text-xs font-semibold uppercase text-gray-400">
                            Resources
                        </span>

                        {resourceNav.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => navigate(item)}
                                className="
            mt-1 w-full rounded-lg px-4 py-3 text-left text-sm
            text-gray-700 hover:bg-gray-100
            transition
          "
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* BOTTOM WHATSAPP CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white/80 backdrop-blur">
                    <a
                        href="https://wa.me/917019713708"
                        target="_blank"
                        className="
        flex items-center justify-center gap-2
        w-full rounded-full
        bg-[#25D366]
        px-5 py-3 text-sm font-semibold text-white
        shadow-md hover:bg-[#1EBE5D]
        transition
      "
                    >
                        <FaWhatsapp className="h-5 w-5" />
                        Chat on WhatsApp
                    </a>
                </div>
            </aside>
        </>
    );
}
