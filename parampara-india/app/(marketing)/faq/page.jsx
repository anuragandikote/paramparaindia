import Breadcrumbs from "@/components/common/breadcrumbNavigator";

export const metadata = {
  title: "FAQ | Parampara India",
  description:
    "Answers to common questions about Parampara India's wood gasifier stoves, savings, installation, and support.",
};

const faqs = [
  {
    question: "What is a wood gasifier stove?",
    answer:
      "A wood gasifier stove uses controlled combustion to convert wood into clean-burning gas, delivering higher efficiency and lower smoke compared to traditional wood stoves.",
  },
  {
    question: "How much can I save compared to LPG?",
    answer:
      "Most kitchens save up to 80% on monthly fuel spend when switching from LPG to a Parampara wood gasifier stove, depending on usage and fuel costs.",
  },
  {
    question: "Which model should I choose?",
    answer:
      "Model selection depends on daily cooking volume and kitchen scale. Domestic models suit small kitchens, while W4 and W8 models serve high-volume commercial use.",
  },
  {
    question: "What fuel can I use?",
    answer:
      "Seasoned wood, briquettes, and other biomass fuels work well. For best performance, use dry, low-moisture fuel.",
  },
  {
    question: "Is installation and demo available?",
    answer:
      "Yes. We provide installation guidance and live demos across India. Share your location and kitchen size to schedule a demo.",
  },
  {
    question: "How long does the stove last?",
    answer:
      "With proper maintenance, the cast-iron build ensures long-term durability for years of daily use.",
  },
  {
    question: "Is there smoke or soot in the kitchen?",
    answer:
      "Gasifier technology minimizes smoke and soot compared to traditional chulhas. A proper chimney setup further improves ventilation.",
  },
  {
    question: "Can I get support after purchase?",
    answer:
      "Yes. We offer after-sales support, spare parts assistance, and guidance for optimal performance.",
  },
];

export default function FaqPage() {
  return (
    <section className="bg-[#faf7f2] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <header className="max-w-3xl">
          <Breadcrumbs />
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-gray-700">
            Everything you need to know about wood gasifier stoves, fuel savings,
            installation, and support.
          </p>
        </header>

        <div className="mt-10 grid gap-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl bg-white p-6 shadow-sm group"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-gray-900">
                <span>{item.question}</span>
                <span className="float-right text-orange-600 transition group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
