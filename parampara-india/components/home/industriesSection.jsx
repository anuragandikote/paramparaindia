import Image from "next/image";

const industries = [
    {
        id: "home",
        name: "Homes & Domestic Kitchens",
        description: "Efficient wood gasifier stoves for small to large-scale home kitchens, saving up to 80% on LPG.",
        icon: "/images/generic/industries-we-serve.jpg",
    },
    {
        id: "hotels",
        name: "Hotels & Restaurants",
        description: "Efficient wood gasifier stoves for small to large-scale hotel kitchens, saving up to 80% on LPG.",
        icon: "/images/generic/industries-we-serve.jpg",
    },
    {
        id: "temples",
        name: "Temples & Community Kitchens",
        description: "Cook for hundreds of devotees with clean, durable, and cost-effective stoves.",
        icon: "/images/generic/industries-we-serve.jpg",
    },
    {
        id: "cloud-kitchens",
        name: "Cloud Kitchens",
        description: "Fast and energy-efficient cooking solutions for modern cloud kitchens and food startups.",
        icon: "/images/generic/industries-we-serve.jpg",
    },
    {
        id: "caterers",
        name: "Caterers & Events",
        description: "Reliable stoves for large-scale catering and events, ensuring consistent heat and minimal smoke.",
        icon: "/images/generic/industries-we-serve.jpg",
    },
];

export default function IndustriesSection() {
    return (
        <section id='industries' className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                    Segments We Serve
                </h2>
                <p className="mt-4 text-center text-gray-700">
                    Parampara India wood gasifier stoves are trusted across India for various sectors including hotels, temples, cloud kitchens, and large-scale catering.
                </p>

                {/* Industries Grid */}
                <div className="mt-10 flex gap-6 overflow-x-auto py-4 px-2 snap-x snap-mandatory">
                    {industries.map((industry) => (
                        <div
                            key={industry.id}
                            className="max-w-[320px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center shrink-0 snap-start"
                        >
                            {/* Image Container with fixed height */}
                            <div className="relative w-full h-40 mb-4">
                                <Image
                                    src={industry.icon}
                                    alt={industry.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-base font-semibold text-gray-900 px-6">{industry.name}</h3>
                            <p className="mt-2 text-gray-700 text-base px-6 mb-4">{industry.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
