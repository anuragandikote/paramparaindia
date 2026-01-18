import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white px-4" /* style={{ background: "linear-gradient(to right, #1F2937, #374151)" }} */>
      <div className="container py-8 grid gap-6 md:grid-cols-3 text-base text-gray-700">
        {/* Business Info */}
        <div>
          <h3 className="font-semibold text-black">Parampara India</h3>
          <p className="mt-2">
            High-efficiency <strong>wood gasifier stoves</strong> for 
            <strong> domestic, commercial, and industrial cooking</strong> in India.
          </p>
          <p className="mt-2 font-normal">
            📍 Karnataka, India<br />
            📞 <a href="tel:+917019713708" className="hover:underline">+91 70197 13708</a><br />
            ✉ <a href="mailto:info@paramparaindia.com" className="hover:underline">info@paramparaindia.com</a>
          </p>
        </div>

        {/* Quick Links / Sitemap */}
        <div>
          <h3 className="font-semibold text-black">Quick Links</h3>
          <ul className="mt-2 space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/industries" className="hover:underline">Industries</Link></li>
            <li><Link href="/how-it-works" className="hover:underline">How It Works</Link></li>
            <li><Link href="/about" className="hover:underline">About Us</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Benefits / USP */}
        <div>
          <h3 className="font-semibold text-black">Why Choose Us</h3>
          <ul className="mt-2 space-y-1">
            <li>✅ Save up to <strong>80% on LPG</strong></li>
            <li>✅ Save up to <strong>50% on wood</strong></li>
            <li>✅ Clean combustion with minimal smoke</li>
            <li>✅ Durable cast-iron build for long-term use</li>
            <li>✅ Trusted by hotels, temples, caterers & cloud kitchens</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-white pb-4 mt-6">
        © {new Date().getFullYear()} Parampara India. All rights reserved.
      </div>
    </footer>
  );
}
