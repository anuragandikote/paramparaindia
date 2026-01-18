"use client";

import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
    { label: "Products", section: "products" },
    { label: "Videos", href: "/videos" }, // page route stays
    { label: "How It Works", section: "how-it-works" },
    { label: "Industries", section: "industries" },
    { label: "Save 80%", section: "savings-calculator" },
    { label: "Compare Models", section: "compare" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleNavClick = (item) => {
        setMenuOpen(false);

        // Normal page navigation
        if (item.href) {
            router.push(item.href);
            return;
        }

        // Section navigation
        if (pathname !== "/") {
            router.push(`/#${item.section}`);
        } else {
            const el = document.getElementById(item.section);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    };


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Header */}
            <header
                className={`
          sticky top-0 z-[101]
          transition-all duration-300
          ${scrolled ? "bg-white/50 backdrop-blur shadow-md" : "bg-white"}
        `}
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4">

                    {/* Logo */}
                    <Link href="/" className="group">
                        <Image
                            src="/images/logo.png"
                            alt="Parampara India"
                            width={140}
                            height={70}
                            priority
                            className="mix-blend-multiply object-contain transition-transform duration-300"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        {navItems.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item)}
                                className="
        relative transition-colors duration-300
        text-gray-700 hover:text-gray-900
        after:absolute after:-bottom-1 after:left-0
        after:h-[2px] after:bg-orange-500
        after:transition-all after:duration-300
        hover:after:w-full
      "
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">

                        {/* Desktop WhatsApp */}
                        <a
                            href="https://wa.me/917019713708"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                hidden md:inline-flex items-center gap-2
                rounded-full bg-[#25D366]
                px-5 py-2 text-sm font-semibold text-white
                shadow-md transition-all duration-300
                hover:bg-[#1EBE5D]
                hover:shadow-lg hover:-translate-y-[1px]
              "
                        >
                            <FaWhatsapp className="h-5 w-5" />
                            <span>Chat with us</span>
                        </a>

                        {/* Mobile WhatsApp */}
                        <a
                            href="https://wa.me/917019713708"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                md:hidden flex items-center justify-center
                h-10 w-10 rounded-full
                bg-[#25D366] text-white
                shadow-md hover:bg-[#1EBE5D]
                transition-all
              "
                        >
                            <FaWhatsapp className="h-5 w-5" />
                        </a>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            <HiMenu className="h-6 w-6 text-gray-800" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`
          fixed inset-0 z-[200] bg-black/40
          transition-opacity duration-300
          ${menuOpen ? "opacity-50 visible" : "opacity-0 invisible"}
        `}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Drawer */}
            <aside
                className={`
    fixed top-0 right-0 z-[201]
    h-full w-72
    bg-white/80 backdrop-blur
    rounded-l-2xl
    shadow-2xl
    transition-transform duration-500 ease-out
    ${menuOpen ? "translate-x-0" : "translate-x-full"}
  `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Menu</span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition"
                        aria-label="Close menu"
                    >
                        <HiX className="h-6 w-6 text-gray-700" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 px-4 py-4">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavClick(item)}
                            className="
        rounded-lg px-4 py-3 text-sm font-medium
        text-left text-gray-700
        hover:bg-gray-100 transition
      "
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Bottom WhatsApp CTA */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white/70 backdrop-blur">
                    <a
                        href="https://wa.me/917019713708"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
        flex items-center justify-center gap-2
        w-full rounded-full
        bg-[#25D366]
        px-5 py-3
        text-sm font-semibold text-white
        shadow-md
        transition-all duration-300
        hover:bg-[#1EBE5D]
        hover:shadow-lg
        hover:-translate-y-[1px]
        active:translate-y-0
      "
                    >
                        <FaWhatsapp className="h-5 w-5" />
                        <span>Chat on WhatsApp</span>
                    </a>
                </div>
            </aside>
        </>
    );
}
