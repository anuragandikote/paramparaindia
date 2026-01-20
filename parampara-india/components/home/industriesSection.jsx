import Image from "next/image";

const industries = [
    {
        id: "home",
        name: "Homes",
        description: "Efficient wood gasifier stoves for small to large-scale home kitchens, saving up to 80% on LPG.",
        icon: "/images/generic/home-kitchen.webp",
    },
    {
        id: "hotels",
        name: "Hotels",
        description: "Efficient wood gasifier stoves for small to large-scale hotel kitchens, saving up to 80% on LPG.",
        icon: "/images/generic/hotel-kitchen.webp",
    },
    {
        id: "temples",
        name: "Temples",
        description: "Cook for hundreds of devotees with clean, durable, and cost-effective stoves.",
        icon: "/images/generic/temple-kitchen.webp",
    },
    {
        id: "cloud-kitchens",
        name: "Cloud Kitchens",
        description: "Fast and energy-efficient cooking solutions for modern cloud kitchens and food startups.",
        icon: "/images/generic/cloud-kitchen.webp",
    },
    {
        id: "caterers",
        name: "Caterers & Events",
        description: "Reliable stoves for large-scale catering and events, ensuring consistent heat and minimal smoke.",
        icon: "/images/generic/catering-kitchen.webp",
    },
    {
        id: "factories",
        name: "Factories",
        description: "High-capacity stoves for industrial kitchens, designed for efficiency and durability.",
        icon: "/images/generic/factory.webp",
    },
];

export default function IndustriesSection() {
    return (
        <section id='industries' className="py-16 bg-gray-50">
            <div className="container mx-auto px-2 md:px-8">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    Segments We Serve
                </h2>
                <p className="mt-4 text-center text-gray-700">
                    Parampara India wood gasifier stoves are trusted across India for various sectors including hotels, temples, cloud kitchens, and large-scale catering.
                </p>

                {/* Industries Grid */}
                <div className="mt-10 grid grid-cols-2 md:flex gap-1 md:gap-6 overflow-x-auto py-4 snap-x snap-mandatory">
                    {industries.map((industry) => (
                        <div
                            key={industry.id}
                            className="max-w-[320px] bg-gray-100 rounded-xl border border-gray-300 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center shrink-0 snap-start"
                        >
                            {/* Image Container with fixed height */}
                            <div className="relative w-full h-40 md:h-56 md:mb-4">
                                <Image
                                    src={industry.icon}
                                    alt={industry.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h3 className="text-base font-semibold text-gray-900 p-2 md:px-6">{industry.name}</h3>
                            <p className="hidden md:block mt-2 text-gray-700 text-base px-6 mb-4">{industry.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
