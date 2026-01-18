"use client";

export default function Marquee() {
    const items = [
        "🔥 Save up to 80% on LPG costs",
        "🏭 Built for commercial kitchens",
        "♻️ Smokeless & eco-friendly combustion",
        "🧱 Heavy-duty cast iron build",
        "⚡ High heat output, low fuel usage",
        "🇮🇳 Made in India • PAN India delivery",
        "⏱️ Trusted by hotels, hostels & temples",
    ];

    return (
        <section className="relative overflow-hidden">
            {/* Premium background */}
            <div className="bg-gradient-to-r from-[#0f172a] via-[#020617] to-[#0f172a] py-4">

                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10" />

                {/* Marquee */}
                <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
                    {[...items, ...items].map((text, index) => (
                        <span
                            key={index}
                            className="mx-8 text-sm md:text-base font-medium text-gray-200 tracking-wide"
                        >
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            {/* Animation */}
            <style jsx>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
            `}</style>
        </section>
    );
}
