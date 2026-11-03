"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { getWhatsAppLink } from "@/common/getWhatsappLink";
import { DIWALI_OFFER, isDiwaliOfferActive } from "@/data/site";

/* ---------- String lights (wire + bulbs hanging in swags) ---------- */

const SWAGS = 4;
const BULBS_PER_SWAG = 6;
const WIRE_W = 1200;
const WIRE_H = 36;
const SWAG_CTRL_Y = 44; // quadratic control point -> max sag = 22px
const BULB_COLORS = ["#FFD27A", "#FF8A3D", "#FF5D8F", "#FFF3D6"];

const WIRE_PATH = Array.from({ length: SWAGS }, (_, s) => {
  const x0 = (WIRE_W / SWAGS) * s;
  const x1 = (WIRE_W / SWAGS) * (s + 1);
  return `${s === 0 ? `M${x0} 0 ` : ""}Q${(x0 + x1) / 2} ${SWAG_CTRL_Y} ${x1} 0`;
}).join(" ");

const BULBS = Array.from({ length: SWAGS * BULBS_PER_SWAG }, (_, i) => {
  const swag = Math.floor(i / BULBS_PER_SWAG);
  const j = i % BULBS_PER_SWAG;
  const t = (j + 1) / (BULBS_PER_SWAG + 1);
  return {
    left: ((swag + t) / SWAGS) * 100,
    top: 2 * t * (1 - t) * SWAG_CTRL_Y,
    color: BULB_COLORS[i % BULB_COLORS.length],
    delay: (i * 173) % 1800,
  };
});

function StringLights() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[36px]"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${WIRE_W} ${WIRE_H}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={WIRE_PATH} stroke="#8C5A12" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {BULBS.map((b, i) => (
        <span
          key={i}
          className="diwali-bulb absolute block h-2.5 w-2 rounded-b-full rounded-t-[40%] sm:h-3 sm:w-2.5"
          style={{
            left: `${b.left}%`,
            top: `${b.top}px`,
            color: b.color,
            backgroundColor: b.color,
            animationDelay: `${b.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Ornaments ---------- */

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
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="diwali-diya-halo absolute left-1/2 top-[8%] h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/4 rounded-full" />
      <svg className="relative h-full w-full" viewBox="0 0 88 72">
        <ellipse className="diwali-glow" cx="44" cy="22" rx="18" ry="20" fill="#FFB703" opacity="0.4" />
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
    </div>
  );
}

const EMBERS = [
  { left: "8%", size: 3, dur: 7.5, delay: 0 },
  { left: "21%", size: 2, dur: 9, delay: 2.1 },
  { left: "37%", size: 3, dur: 8, delay: 4.2 },
  { left: "52%", size: 2, dur: 10, delay: 1.1 },
  { left: "66%", size: 3, dur: 7, delay: 3.3 },
  { left: "79%", size: 2, dur: 9.5, delay: 5.4 },
  { left: "91%", size: 3, dur: 8.5, delay: 0.7 },
];

/* ---------- Fireworks (canvas, no dependencies) ---------- */

const FIREWORK_COLORS = ["#FFD27A", "#FF8A3D", "#FF5D8F", "#FFF3D6", "#FFB703", "#FF7AD9"];

function useFireworks(canvasRef, enabled) {
  useEffect(() => {
    if (!enabled) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let rafId = 0;
    let running = false;
    let visible = true;
    let nextLaunch = 0;
    const rockets = [];
    const sparks = [];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const launch = () => {
      const x = w * (0.08 + Math.random() * 0.84);
      rockets.push({
        x,
        y: h,
        tx: x + (Math.random() - 0.5) * 80,
        ty: h * (0.14 + Math.random() * 0.36),
        speed: 4.2 + Math.random() * 1.8,
        color: FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)],
      });
    };

    const explode = (r) => {
      const count = w < 640 ? 42 : 68;
      const second = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.15;
        const speed = 1.2 + Math.random() * 2.3;
        sparks.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.011 + Math.random() * 0.01,
          color: i % 3 === 0 ? second : r.color,
          size: 1.1 + Math.random() * 1.3,
        });
      }
    };

    const frame = (now) => {
      if (!running) return;

      // fade previous frame to leave soft trails on a transparent canvas
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (now >= nextLaunch) {
        launch();
        if (Math.random() < 0.3) launch();
        nextLaunch = now + 650 + Math.random() * 900;
      }

      for (let i = rockets.length - 1; i >= 0; i -= 1) {
        const r = rockets[i];
        const dx = r.tx - r.x;
        const dy = r.ty - r.y;
        const dist = Math.hypot(dx, dy);
        if (dist <= r.speed) {
          explode(r);
          rockets.splice(i, 1);
        } else {
          r.x += (dx / dist) * r.speed;
          r.y += (dy / dist) * r.speed;
          ctx.beginPath();
          ctx.arc(r.x, r.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = "#FFF3D6";
          ctx.fill();
        }
      }

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.vx *= 0.985;
        s.vy = s.vy * 0.985 + 0.03;
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      nextLaunch = performance.now() + 300;
      rafId = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [canvasRef, enabled]);
}

/* ---------- Banner ---------- */

export default function DiwaliBanner() {
  const canvasRef = useRef(null);
  const active = isDiwaliOfferActive();

  useFireworks(canvasRef, active);

  if (!active) return null;

  const whatsappHref = getWhatsAppLink({
    message: DIWALI_OFFER.whatsappMessage,
  });

  return (
    <section
      aria-labelledby="diwali-offer-heading"
      className="relative isolate overflow-hidden border-b border-[#E8C872]/40 bg-[#1B0610] text-[#FFF8EE]"
    >
      {/* night sky + warm horizon glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(255,140,40,0.45),transparent_55%),radial-gradient(circle_at_15%_30%,rgba(255,93,143,0.14),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(246,217,138,0.14),transparent_35%),linear-gradient(180deg,#14040C_0%,#3C0D14_55%,#7A2A12_100%)]" />

      {/* twinkling stars */}
      <div className="diwali-stars pointer-events-none absolute inset-0 opacity-70" />

      {/* fireworks */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* rising embers */}
      {EMBERS.map((e, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="diwali-ember pointer-events-none absolute bottom-0 rounded-full bg-[#FFB703]"
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}

      <Rangoli className="diwali-spin pointer-events-none absolute -left-20 top-1/2 hidden h-64 w-64 -translate-y-1/2 opacity-40 md:block" />
      <Rangoli className="diwali-spin-rev pointer-events-none absolute -right-20 top-1/2 hidden h-64 w-64 -translate-y-1/2 opacity-40 md:block" />

      <StringLights />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 pb-9 pt-14 text-center sm:pb-11 sm:pt-16 md:flex-row md:justify-center md:gap-12 md:pb-12 md:text-left">
        <Diya className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />

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
            className="diwali-title mt-1 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
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
            className="diwali-cta inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#F6D98A] px-6 py-3 text-sm font-bold text-[#3C0D14] transition hover:bg-[#FFE7A8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFF8EE]"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            Enquire on WhatsApp
          </a>
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#F6D98A] bg-[#3C0D14]/40 px-6 py-3 text-sm font-bold text-[#FFF8EE] backdrop-blur-sm transition hover:bg-[#F6D98A]/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6D98A]"
          >
            View stoves
          </Link>
        </div>
      </div>

      <style jsx global>{`
        /* string-light bulbs */
        .diwali-bulb {
          box-shadow: 0 0 8px 2px currentColor, 0 0 18px 4px currentColor;
          animation: diwali-bulb 1.8s ease-in-out infinite;
        }
        @keyframes diwali-bulb {
          0%,
          100% {
            opacity: 0.45;
            filter: brightness(0.8);
          }
          50% {
            opacity: 1;
            filter: brightness(1.25);
          }
        }

        /* diya */
        .diwali-flame {
          transform-origin: 44px 30px;
          animation: diwali-flame 1.6s ease-in-out infinite;
        }
        .diwali-glow {
          animation: diwali-twinkle 1.6s ease-in-out infinite;
        }
        .diwali-diya-halo {
          background: radial-gradient(circle, rgba(255, 183, 3, 0.45) 0%, rgba(255, 140, 40, 0.18) 40%, transparent 70%);
          animation: diwali-breathe 3.2s ease-in-out infinite;
        }
        @keyframes diwali-flame {
          0%,
          100% {
            transform: scaleY(1) skewX(0deg);
          }
          33% {
            transform: scaleY(1.14) skewX(2deg) translateY(-1px);
          }
          66% {
            transform: scaleY(1.06) skewX(-2deg);
          }
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
        @keyframes diwali-breathe {
          0%,
          100% {
            opacity: 0.7;
            transform: translate(-50%, -25%) scale(0.95);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -25%) scale(1.08);
          }
        }

        /* headline: molten gold shimmer */
        .diwali-title {
          background: linear-gradient(100deg, #f6d98a 0%, #fff8ee 25%, #ffb703 50%, #fff8ee 75%, #f6d98a 100%);
          background-size: 250% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 14px rgba(255, 183, 3, 0.45));
          animation: diwali-shimmer 5s linear infinite;
        }
        @keyframes diwali-shimmer {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: 250% 50%;
          }
        }

        /* CTA pulse */
        .diwali-cta {
          animation: diwali-cta 2.4s ease-out infinite;
        }
        @keyframes diwali-cta {
          0% {
            box-shadow: 0 0 0 0 rgba(246, 217, 138, 0.55);
          }
          70%,
          100% {
            box-shadow: 0 0 0 14px rgba(246, 217, 138, 0);
          }
        }

        /* stars */
        .diwali-stars {
          background-image: radial-gradient(1px 1px at 12% 28%, #fff8ee, transparent),
            radial-gradient(1px 1px at 27% 62%, #f6d98a, transparent),
            radial-gradient(1.5px 1.5px at 44% 20%, #fff8ee, transparent),
            radial-gradient(1px 1px at 58% 70%, #f6d98a, transparent),
            radial-gradient(1px 1px at 73% 34%, #fff8ee, transparent),
            radial-gradient(1.5px 1.5px at 88% 58%, #f6d98a, transparent),
            radial-gradient(1px 1px at 95% 18%, #fff8ee, transparent);
          animation: diwali-twinkle 3.6s ease-in-out infinite;
        }

        /* embers */
        .diwali-ember {
          opacity: 0;
          filter: blur(0.4px);
          box-shadow: 0 0 6px 2px rgba(255, 183, 3, 0.7);
          animation-name: diwali-ember;
          animation-timing-function: ease-out;
          animation-iteration-count: infinite;
        }
        @keyframes diwali-ember {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          100% {
            transform: translate(18px, -190px) scale(0.3);
            opacity: 0;
          }
        }

        /* rangoli */
        .diwali-spin {
          animation: diwali-rotate 70s linear infinite;
        }
        .diwali-spin-rev {
          animation: diwali-rotate 70s linear infinite reverse;
        }
        @keyframes diwali-rotate {
          to {
            transform: translateY(-50%) rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .diwali-bulb,
          .diwali-flame,
          .diwali-glow,
          .diwali-diya-halo,
          .diwali-title,
          .diwali-cta,
          .diwali-stars,
          .diwali-ember,
          .diwali-spin,
          .diwali-spin-rev {
            animation: none;
          }
          .diwali-ember {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}