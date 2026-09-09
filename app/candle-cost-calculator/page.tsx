import type { Metadata } from "next";
import Link from "next/link";
import { CandleCostCalculatorForm } from "../_components/candle-cost-calculator-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Candle Cost-Per-Candle Calculator",
  description:
    "Roll up wax, fragrance oil, wick, container, and other per-candle costs into a total cost per candle and a suggested retail price at your target profit margin.",
};

const FAQ = [
  {
    question: "What units should I use?",
    answer:
      "Any weight unit, as long as you're consistent: enter your wax and fragrance oil cost per the SAME unit you enter their weight-used in (e.g. both in grams, or both in ounces). Mixing units (like a per-pound cost with a weight in grams) will give a wrong answer — this tool doesn't convert between units for you.",
  },
  {
    question: "Margin or markup — which does this use?",
    answer:
      "Profit margin (profit as a percent of the SELLING price), not markup (profit as a percent of cost) — these give different suggested prices for the same target percentage. A $5 cost at a 40% margin suggests an $8.33 price; a 40% markup on the same cost would only be $7.00.",
  },
  {
    question: "Does this include my labor time?",
    answer:
      "Not directly — \"other cost per candle\" is meant for materials like labels, dye, or boxes. If you want to price in your own labor, add a per-candle labor cost into that field, or set a higher target margin to cover it.",
  },
  {
    question: "Anything else to know before selling what I make?",
    answer:
      "This calculator only handles cost and pricing math — it doesn't check safety or labeling compliance. Candles sold in the US are generally expected to meet ASTM F2417 (fire safety: flame height, secondary ignition, stability) and carry the fire-safety warning label required by ASTM F2058; if you sell in glass containers, ASTM F2179 covers whether the glass itself is rated for candle use. Check the current standards directly rather than relying on this tool for compliance.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">
          ← All tools
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Candle Cost-Per-Candle Calculator</h1>
      <p className="mt-3 text-gray-600">
        Roll up your batch costs into a per-candle cost and a suggested
        retail price.
      </p>

      <div className="mt-6">
        <CandleCostCalculatorForm />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <dl className="mt-3 space-y-4">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-gray-900">{item.question}</dt>
              <dd className="mt-1 text-gray-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
