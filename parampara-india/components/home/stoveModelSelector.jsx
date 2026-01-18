"use client";

import { useState } from "react";
import Link from "next/link";
import { getWhatsAppLink } from "@/common/getWhatsappLink";

export default function StoveModelSelector() {
    const [people, setPeople] = useState(50);

    const stoveModels = [
        { model: "W1", min: 2, max: 12, use: "Homes, Small Families" },
        { model: "W2", min: 13, max: 25, use: "Tea Shops, Small Hotels, PGs" },
        { model: "W3", min: 26, max: 49, use: "Tea Shops, Small Hotels, PGs" },
        { model: "W4", min: 50, max: 300, use: "Medium Hotels, Hostels, Temples" },
        { model: "W8", min: 301, max: 1000, use: "Mid-Day Meals, Industrial Kitchens" },
    ];

    const selectedModel =
        stoveModels.find(
            (model) => people >= model.min && people <= model.max
        ) || stoveModels[0];

    return (
        <section id="compare" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-8">

                {/* Heading */}
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 text-center">
                    Which Stove Model Fits You?
                </h2>
                <p className="mt-3 text-center text-gray-700 max-w-2xl mx-auto">
                    Move the slider to instantly find the most fuel-efficient stove for your kitchen
                </p>

                {/* MAIN LAYOUT */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* LEFT: SLIDER */}
                    <div className="bg-gray-50 rounded-2xl p-8 shadow">
                        <p className="text-sm text-gray-600 text-center">
                            Number of people served daily
                        </p>

                        <p className="mt-3 text-6xl font-extrabold text-orange-600 text-center">
                            {people}
                        </p>

                        <input
                            type="range"
                            min={4}
                            max={1000}
                            step={1}
                            value={people}
                            onChange={(e) => setPeople(Number(e.target.value))}
                            className="mt-8 w-full accent-orange-600"
                        />

                        <p className="mt-4 text-center text-sm text-gray-500">
                            From small homes to industrial kitchens
                        </p>
                    </div>

                    {/* RIGHT: RECOMMENDATION */}
                    <div className="bg-gray-900 text-white rounded-2xl p-10 text-center shadow-lg">
                        <p className="text-sm uppercase tracking-wide text-gray-400">
                            Recommended Model
                        </p>

                        <p className="mt-3 text-3xl md:text-5xl font-extrabold text-orange-400">
                            Parampara {selectedModel.model}
                        </p>

                        <p className="mt-5 text-gray-200 text-sm md:text-lg">
                            Ideal for cooking for
                            <br />
                            <strong className="text-white">
                                {selectedModel.min} – {selectedModel.max} people
                            </strong>
                        </p>

                        <p className="mt-3 text-sm text-gray-200">
                            Best suited for: <br/> 
                            <strong className="text-white">
                                {selectedModel.use}
                            </strong>
                        </p>

                        {/* CTA */}
                        <a
                            href={getWhatsAppLink({
                                page: "selector",
                                model: selectedModel.model,
                                people,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
    mt-8 inline-flex items-center justify-center
    bg-orange-600 text-white
    px-8 py-4 rounded-xl
    font-semibold text-sm md:text-lg
    hover:bg-orange-700 transition
    shadow-lg
  "
                        >
                            Get Exact Price & Demo
                        </a>

                        <p className="mt-4 text-xs text-gray-400">
                            Expert guidance • PAN India delivery
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
