import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import Marquee from "../ui/marquee";

export default function Banner() {
  return (
    <section className="relative bg-white z-51">
      {/* Container */}
      <div className="relative container mx-auto px-4 py-12 md:py-14 flex flex-col-reverse md:flex-row items-center justify-between gap-8">

        {/* Left Text Column */}
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-6 text-left md:text-left">
          {/* H1 */}
          <h1 className="text-xl sm:text-4xl md:text-5xl font-bold leading-snug text-gray-900">
            Cut Your LPG Bill by Up to 80% with Wood Gasifier Stoves
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-gray-700">
            Switch to Parampara India’s clean-combustion wood gasifier stoves and reduce fuel expenses without compromising cooking speed or quality. Trusted by commercial kitchens across India.
          </p>

          {/* USPs / Badges */}
          <ul className="flex gap-3 sm:gap-1 overflow-x-auto px-1 justify-start md:justify-start text-sm font-normal scrollbar-hide snap-x snap-mandatory">
            <li className="shrink-0 snap-center rounded-lg border border-gray-400 px-4 py-2 text-gray-900 font-bold">
              Save up to 80% on LPG
            </li>
            <li className="shrink-0 snap-center rounded-lg border border-gray-400 px-4 py-2 text-gray-900 font-bold">
              Minimal Smoke & Clean Heat
            </li>
            <li className="shrink-0 snap-center rounded-lg border border-gray-400 px-4 py-2 text-gray-900 font-bold">
              Durable Cast-Iron Build
            </li>
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4 sm:mt-6">
            <Link
              href="/products"
              className="rounded-md text-center px-6 py-3 text-white font-semibold bg-orange-700 hover:bg-red-600 transition-colors"
            >
              View Products
            </Link>

            <a
              href="https://wa.me/917019713708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3 font-semibold text-white hover:bg-[#1EBE5D] transition-colors"
            >
              <FaWhatsapp className="h-5 w-5" />
              Talk to Expert
            </a>
          </div>
        </div>

        {/* Right Image Column */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-end">
          <img
            src="/images/banner/website-banner.webp"
            alt="Wood Gasifier Stove in Commercial Kitchen"
            className="w-[100%] max-w-sm md:w-full md:max-w-xl h-auto rounded-xl drop-shadow-2xl object-contain"
          />
        </div>
      </div>
      <Marquee />

    </section>
  );
}
