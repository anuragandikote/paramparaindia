import Link from "next/link";
import { getWhatsAppLink } from "@/common/getWhatsappLink";
import {
  ADDRESS,
  CONTACT_EMAIL,
  LPG_SAVINGS_CLAIM,
  PHONES,
  WOOD_SAVINGS_CLAIM,
} from "@/data/site";

const FooterWaveBg = () => (
  <svg
    viewBox="0 0 1440 600"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className="absolute inset-0 w-full h-full z-0 rotate-180"
  >
    <defs>
      <linearGradient id="footerFade" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#EDEDED" />
        <stop offset="60%" stopColor="#f9fafb" />
        <stop offset="100%" stopColor="#e6e6e6" />
      </linearGradient>
    </defs>

    <path
      d="M0,450 
         C180,380 360,520 540,470 
         C720,420 900,300 1080,340 
         C1260,380 1380,450 1440,480 
         L1440,0 L0,0 Z"
      fill="url(#footerFade)"
    />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-white px-4 overflow-hidden pt-20 pb-12">
      {/* SVG Background */}
      <FooterWaveBg />

      {/* Main Content */}
      <div className="relative z-10 container py-8 grid gap-6 md:grid-cols-3 text-base text-gray-700">
        {/* Business Info */}
        <div>
          <h3 className="font-semibold text-black">Parampara India</h3>
          <p className="mt-2">
            High-efficiency <strong>wood gasifier stoves</strong> for 
            <strong> domestic, commercial, and industrial cooking</strong> in India.
          </p>
          <p className="mt-2 font-normal">
            📍 {ADDRESS.line}
            <br />
            {PHONES.map((phone) => (
              <span key={phone.tel}>
                📞{" "}
                <a href={`tel:${phone.tel}`} className="hover:underline">
                  {phone.display}
                </a>{" "}
                <a
                  href={getWhatsAppLink({ phone: phone.whatsapp, page: "contact" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
                <br />
              </span>
            ))}
            ✉{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>

        {/* Quick Links / Sitemap */}
        <div>
          <h3 className="font-semibold text-black">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            {/* <li><Link href="/products" className="hover:underline">Products</Link></li> */}
            {/* <li><Link href="/industries" className="hover:underline">Industries</Link></li> */}
            {/* <li><Link href="/how-it-works" className="hover:underline">How It Works</Link></li> */}
            {/* <li><Link href="/about" className="hover:underline">About Us</Link></li> */}
            {/* <li><Link href="/contact" className="hover:underline">Contact</Link></li> */}
          </ul>
        </div>

        {/* Benefits / USP */}
        <div>
          <h3 className="font-semibold text-black">Why Choose Us</h3>
          <ul className="mt-2 space-y-1">
            <li>✅ <strong>{LPG_SAVINGS_CLAIM}</strong></li>
            <li>✅ <strong>{WOOD_SAVINGS_CLAIM}</strong></li>
            <li>✅ Clean combustion with minimal smoke</li>
            <li>✅ Durable cast-iron build for long-term use</li>
            <li>✅ Trusted by hotels, temples, caterers & cloud kitchens</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 text-center text-xs text-gray-600 pb-4 mt-6">
        © {new Date().getFullYear()} Parampara India. All rights reserved.
      </div>
    </footer>
  );
}
