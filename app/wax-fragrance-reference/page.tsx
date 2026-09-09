import type { Metadata } from "next";
import Link from "next/link";
import { WAX_FRAGRANCE_REFERENCE } from "@/lib/wax-fragrance-reference";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Candle Wax Fragrance-Load Reference Chart",
  description:
    "Sourced recommended and maximum fragrance-oil load percentages for common candle waxes: soy, paraffin, coconut, beeswax, and palm.",
};

const FAQ = [
  {
    question: "What does \"fragrance load\" mean?",
    answer:
      "The weight of fragrance oil you add, as a percentage of your wax weight (not the total finished weight — that's a related but different figure some suppliers call \"fragrance content\"). A 500g batch of wax at a 6% load uses 30g of fragrance oil.",
  },
  {
    question: "Why is there a maximum?",
    answer:
      "Past a wax's maximum, fragrance oil that can't stay bound in the wax separates out onto the surface (\"sweats\") or migrates to the bottom of the container, can saturate the wick, and risks a sputtering, smoking, or unstable flame once burned — for a weaker scent, not a stronger one. Pooled unbound oil on a burning candle is also a real fire-hazard mechanism on its own, not just a burn-quality issue.",
  },
  {
    question: "My fragrance oil's own label gives a different maximum — which do I follow?",
    answer:
      "The lower one. Under IFRA's Category 12 (candles/air care), most fragrance oils are rated at 100%/unrestricted, so the wax's own maximum is usually what actually governs — but check your fragrance oil's own IFRA certificate regardless, since some fragrance compositions do carry a real restriction below 100%, and if so that lower number wins.",
  },
  {
    question: "Can I trust these figures for a commercial batch?",
    answer:
      "These are general industry ranges cross-corroborated across multiple independent candle-supply and community sources (see this project's docs/domain-reference.md for the full review), not a lab measurement of your specific product. Always check your own wax's data sheet and test a small batch first.",
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

      <h1 className="text-3xl font-semibold">Candle Wax Fragrance-Load Reference Chart</h1>
      <p className="mt-3 text-gray-600">
        Recommended starting points and safe maximum fragrance-oil loads for
        common candle waxes.
      </p>

      <table className="mt-6 w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 pr-4">Wax</th>
            <th className="py-2 pr-4">Recommended</th>
            <th className="py-2">Maximum</th>
          </tr>
        </thead>
        <tbody>
          {WAX_FRAGRANCE_REFERENCE.map((wax) => (
            <tr key={wax.name} className="border-b border-gray-100 align-top">
              <td className="py-2 pr-4 font-medium">
                {wax.name}
                <p className="mt-1 text-sm text-gray-500">{wax.note}</p>
              </td>
              <td className="py-2 pr-4">{wax.recommendedPercent}%</td>
              <td className="py-2">{wax.maxPercent}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-sm text-gray-500">
        Retrieved via web research and cross-corroborated across multiple
        independent candle-supply and community sources, cited in this
        project&rsquo;s
        <code className="mx-1 rounded bg-gray-100 px-1">
          lib/wax-fragrance-reference.ts
        </code>
        (see also{" "}
        <code className="mx-1 rounded bg-gray-100 px-1">
          docs/domain-reference.md
        </code>{" "}
        for the domain-expert review) — not independently re-measured for
        every wax. Use the{" "}
        <Link href="/fragrance-calculator" className="underline">
          fragrance calculator
        </Link>{" "}
        to apply these values to your own batch.
      </p>

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
