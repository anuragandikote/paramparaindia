import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "@/common/getWhatsappLink";
import { DIWALI_OFFER, isDiwaliOfferActive } from "@/data/site";

function Rangoli({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke="#E8C872" strokeWidth="1.25">
        <circle cx="100" cy="100" r="78" opacity="0.45" />
        <circle cx="100" cy="100" r="54" opacity="0.7" />
        <circle cx="100" cy="100" r="24" opacity="0.9" />
        {Array.from({ length: 12 }, (_, index) => (
          <ellipse
            key={index}
            cx="100"
            cy="42"
            rx="11"
            ry="24"
            opacity="0.8"
            transform={`rotate(${index * 30} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="6" fill="#F6D98A" stroke="none" />
      </g>
    </svg>
  );
}

function Diya({ className }) {
  return (
    <svg className={className} viewBox="0 0 88 72" aria-hidden="true">
      <ellipse className="diwali-glow" cx="44" cy="22" rx="16" ry="18" fill="#FFB703" opacity="0.35" />
      <path
        className="diwali-flame"
        d="M44 6c4 7 8 10 8 16a8 8 0 1 1-16 0c0-6 4-9 8-16z"
        fill="#FFE08A"
      />
      <path d="M44 18c2 3 3.2 4.4 3.2 6.4a3.2 3.2 0 1 1-6.4 0c0-2 1.2-3.4 3.2-6.4z" fill="#FFF6E0" />
      <path d="M10 40c8 16 60 16 68 0-10 8-58 8-68 0z" fill="#E8C872" />
      <ellipse cx="44" cy="40" rx="30" ry="8" fill="#C9A24D" />
      <path d="M16 40h56" stroke="#8C5A12" strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

export default function DiwaliBanner() {
  if (!isDiwaliOfferActive()) return null;

  const whatsappHref = getWhatsAppLink({
    message: DIWALI_OFFER.whatsappMessage,
  });

  return (
    <section
      aria-labelledby="diwali-offer-heading"
      className="relative isolate overflow-hidden border-b border-[#E8C872]/40 bg-[#3C0D14] text-[#FFF8EE]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(246,217,138,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(224,122,31,0.28),transparent_36%),linear-gradient(115deg,#3C0D14_0%,#6B1A16_52%,#8A3A12_100%)]" />

      <Rangoli className="pointer-events-none absolute -left-16 top-1/2 hidden h-56 w-56 -translate-y-1/2 opacity-50 md:block" />
      <Rangoli className="pointer-events-none absolute -right-16 top-1/2 hidden h-56 w-56 -translate-y-1/2 opacity-50 md:block" />

      <span className="diwali-sparkle pointer-events-none absolute left-[12%] top-5 h-1.5 w-1.5 rounded-full bg-[#F6D98A]" />
      <span className="diwali-sparkle pointer-events-none absolute right-[18%] top-8 h-1 w-1 rounded-full bg-[#FFF8EE] [animation-delay:700ms]" />
      <span className="diwali-sparkle pointer-events-none absolute bottom-6 left-[28%] h-1 w-1 rounded-full bg-[#F6D98A] [animation-delay:1.2s]" />
      <span className="diwali-sparkle pointer-events-none absolute right-[30%] bottom-5 h-1.5 w-1.5 rounded-full bg-[#FFE08A] [animation-delay:400ms]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-8 text-center sm:py-10 md:flex-row md:justify-center md:gap-10 md:py-12 md:text-left">
        <Diya className="diwali-flame-wrap h-16 w-16 shrink-0 sm:h-20 sm:w-20" />

        <div className="max-w-xl">
          <p
            lang="kn"
            className="text-sm font-medium tracking-wide text-[#F6D98A] sm:text-base"
            style={{ fontFamily: '"Noto Sans Kannada", "Noto Serif Kannada", sans-serif' }}
          >
            {DIWALI_OFFER.greeting}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#F3E0C0]">
            {DIWALI_OFFER.label}
          </p>
          <p
            id="diwali-offer-heading"
            className="mt-1 text-4xl font-bold leading-none text-[#FFF8EE] sm:text-5xl"
          >
            {DIWALI_OFFER.headline}
          </p>
          <p className="mt-3 text-base font-medium text-[#FFF8EE] sm:text-lg">
            {DIWALI_OFFER.validTill}
          </p>
        </div>

        <div className="flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row md:w-auto md:flex-col">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#F6D98A] px-5 py-3 text-sm font-bold text-[#3C0D14] transition hover:bg-[#FFE7A8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8EE]"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            Enquire on WhatsApp
          </a>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#F6D98A] px-5 py-3 text-sm font-bold text-[#FFF8EE] transition hover:bg-[#F6D98A]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6D98A]"
          >
            View stoves
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .diwali-sparkle {
          animation: diwali-twinkle 2.4s ease-in-out infinite;
        }
        .diwali-flame {
          transform-origin: 44px 30px;
          animation: diwali-flame 1.6s ease-in-out infinite;
        }
        .diwali-glow {
          animation: diwali-twinkle 1.6s ease-in-out infinite;
        }
        @keyframes diwali-twinkle {
          0%,
          100% {
            opacity: 0.35;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes diwali-flame {
          0%,
          100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.12) translateY(-1px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .diwali-sparkle,
          .diwali-flame,
          .diwali-glow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
