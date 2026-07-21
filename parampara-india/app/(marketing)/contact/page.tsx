"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/enquiries/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          type: "GENERAL",
          source: "website",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <section className="section py-20">
        <div className="container mx-auto max-w-lg px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Thank you!
          </h1>
          <p className="mb-8 text-gray-600">
            Your enquiry has been submitted. We&apos;ll get back to you soon.
          </p>
          <Link
            href="/"
            className="rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600"
          >
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section py-20">
      <div className="container mx-auto max-w-lg px-4">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="mb-8 text-gray-600">
          Have a question? Fill out the form below and we&apos;ll get back to
          you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                name="name"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              name="company"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              name="subject"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Message *
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>

          {formState === "error" && (
            <p className="text-sm text-red-600">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={formState === "submitting"}
            className="w-full rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            {formState === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
