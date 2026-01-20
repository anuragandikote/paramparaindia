import Image from "next/image";
import Link from "next/link";

export default function HowItWorks() {

    const steps = [
        {
            id: 1,
            title: "Load Wood",
            description: "Place sustainably sourced wood into the stove’s combustion chamber.",
            icon: "/images/generic/load-wood.png",
        },
        {
            id: 2,
            title: "Gasification",
            description: "Wood converts to combustible gas with minimal smoke, generating clean heat for cooking.",
            icon: "/images/generic/gasification-process.png",
        },
        {
            id: 3,
            title: "Efficient Cooking",
            description: "Cook meals quickly and uniformly while saving fuel costs and reducing LPG dependency.",
            icon: "/images/generic/efficient-cooking.png",
        },
        {
            id: 4,
            title: "Clean Ash Disposal",
            description: "Easy disposal of ash, leaving no residue or carbon deposits behind.",
            icon: "/images/generic/ash-disposal.png",
        },
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gray-100">
            <div className="container mx-auto px-4 md:px-8">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
                    How It Works
                </h2>
                <p className="mt-4 text-center text-gray-700 max-w-2xl mx-auto text-lg">
                    Clean, efficient wood gasification technology designed to save fuel,
                    money, and effort.
                </p>

                {/* Steps */}
                <div className="mt-14 flex gap-2 overflow-x-auto snap-x snap-mandatory snap-center pb-4 lg:gap-10 px-4">
                    {steps.map((step, idx) => (
                        <div
                            key={step.id}
                            className="
                min-w-[320px]
                bg-white rounded-2xl shadow-md hover:shadow-xl
                transition-all duration-500
                snap-center
                animate-fade-up
              "
                        >
                            {/* Image */}
                            <div className="relative h-72 w-full bg-gray-50">
                                <Image
                                    src={step.icon}
                                    alt={`${step.title} - Wood Gasifier Stove Process`}
                                    fill
                                    className="object-cover"
                                />

                                {/* Step Badge */}
                                <span className="absolute top-4 left-4 bg-orange-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
                                    Step {idx + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
