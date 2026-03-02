"use client";

import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { getWhatsAppLink } from "@/common/getWhatsappLink";

export default function SavingsCalculatorGraph({
    sectionId = "savings-calculator",
    title = "Savings Calculator",
    subtitle = "Monthly savings compared to LPG usage",
    ctaLabel = "Get Exact Savings & Demo",
    ctaPage = "savings",
    model,
}) {
    // Keep input as string to allow empty value
    const [monthlyCost, setMonthlyCost] = useState(12000);

    // Safely convert string -> number
    const costNumber = monthlyCost === "" ? 0 : Number(monthlyCost);

    // Costs
    const lpgCost = costNumber;
    const woodCost = Math.round(costNumber * 0.5);
    const paramparaCost = Math.round(costNumber * 0.2);

    // SAVINGS compared to LPG
    const data = [
        { name: "LPG", savings: 0 },
        { name: "Traditional Wood", savings: lpgCost - woodCost },
        { name: "With Parampara Stoves", savings: lpgCost - paramparaCost },
    ];

    const savings = lpgCost - paramparaCost;

    return (
        <section id={sectionId} className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-8">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center">
                    {title}
                </h2>
                <p className="mt-3 text-center text-gray-700 max-w-2xl mx-auto">
                    {subtitle}
                </p>

                {/* MAIN LAYOUT */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    {/* LEFT: GRAPH */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip formatter={(v) => `₹${v.toLocaleString()}`} />

                                    <Bar dataKey="savings" radius={[8, 8, 0, 0]}>
                                        <Cell fill="#dc2626" />  {/* LPG – red */}
                                        <Cell fill="#f59e0b" />  {/* Traditional Wood – amber */}
                                        <Cell fill="#16a34a" />  {/* Parampara – green */}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* RIGHT: INPUT + SAVINGS */}
                    <div className="flex flex-col gap-6">

                        {/* Input */}
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <label className="block text-gray-800 font-semibold mb-2">
                                Monthly Fuel Spend (₹)
                            </label>
                            <input
                                type="number"
                                inputMode="numeric"
                                placeholder="Enter amount"
                                value={monthlyCost}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    // allow empty input
                                    if (value === "" || Number(value) >= 0) {
                                        setMonthlyCost(value);
                                    }
                                }}
                                className="
                                    w-full rounded-xl border border-gray-300
                                    px-4 py-4 text-2xl font-bold
                                    focus:outline-none focus:ring-2 focus:ring-orange-500
                                "
                            />
                        </div>

                        {/* Savings Highlight */}
                        <div className="bg-gray-900 text-white rounded-2xl p-8 text-center">
                            <p className="text-sm uppercase tracking-wide text-gray-400">
                                Estimated Monthly Savings
                            </p>

                            {monthlyCost ? (
                                <p className="mt-3 text-4xl font-extrabold text-green-400">
                                    ₹{savings.toLocaleString()}
                                </p>
                            ) : (
                                <p className="mt-3 text-lg text-gray-400">
                                    Enter your monthly spend
                                </p>
                            )}

                            <p className="mt-2 text-sm text-gray-300">
                                Save up to <strong>80%</strong> compared to LPG
                            </p>
                        </div>

                        {/* CTA */}
                        <a
                            href={getWhatsAppLink({
                                page: ctaPage,
                                model,
                                monthlyCost: costNumber,
                                savings,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                inline-flex items-center justify-center
                                bg-orange-600 text-white
                                px-8 py-4 rounded-xl
                                font-semibold text-sm md:text-lg
                                hover:bg-orange-700 transition
                                shadow-lg
                            "
                        >
                            {ctaLabel}
                        </a>

                        <p className="text-center text-sm text-gray-600">
                            Trusted by hotels, temples & commercial kitchens across India
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
