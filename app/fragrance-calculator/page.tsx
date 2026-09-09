import type { Metadata } from "next";
import Link from "next/link";
import { FragranceCalculatorForm } from "../_components/fragrance-calculator-form";
import { JsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Candle Fragrance Load Calculator",
  description:
    "Calculate the fragrance oil amount for your candle wax, capped at a safe maximum load for your wax type.",
};

const FAQ = [
  {
    question: "How is the fragrance oil amount calculated?",
    answer:
      "Fragrance oil weight = wax weight × fragrance load percent. A 500g batch at 6% uses 30g of fragrance oil, for a 530g total finished weight.",
  },
  {
    question: "\"Fragrance load\" or \"fragrance content\" — which is this?",
    answer:
      "This calculator uses fragrance load (FO ÷ wax weight), the convention most US suppliers (CandleScience, The Flaming Candle, Lone Star) compute with. Some suppliers — Candle Shack is a well-known example — instead publish fragrance content (FO ÷ total finished weight), used in the EU for safety labelling. The two aren't the same: a 10% load is a 9.09% content. The result box shows both figures so you can match whichever convention your recipe uses.",
  },
  {
    question: "Why did it reject my fragrance load?",
    answer:
      "You entered a percentage above the selected wax's safe maximum (or, for a custom wax, above 20% — higher than any real candle wax this tool's research found rated). Past a wax's real maximum, fragrance oil that can't stay bound separates out on the surface (\"sweats\") or migrates to the bottom of the container, can saturate the wick, and risks a sputtering or sooty flame — for a WEAKER scent throw, not a stronger one. Pooled, unbound fragrance oil on a burning candle is also a real fire-hazard mechanism in its own right, not just a quality issue, particularly with an undersized wick.",
  },
  {
    question: "Is it dangerous to add fragrance oil to hot wax?",
    answer:
      "Fragrance oil is typically added to melted wax around 180°F (82°C), well below an open flame. A fragrance oil's flash point matters for storage and shipping (avoid sparks and open flame near the oil itself), not because mixing it into hot wax at pouring temperature is close to igniting it. One real exception: gel candles specifically require a fragrance oil rated for a flash point of 170°F or higher, because trapped vapor pockets inside burning gel can ignite — this tool doesn't cover gel wax. For ordinary wax candles, the real pouring-stage fire risk is overheated or unattended melting wax itself (wax flashes around 400-500°F), not the fragrance oil — never leave melting wax unattended on a heat source.",
  },
  {
    question: "Do I need to change my wick when I change the fragrance load?",
    answer:
      "Often, yes. A heavier fragrance (or dye) load commonly needs a wick one to three sizes larger to reach a full melt pool, and can clog a wick that burned cleanly without it. Re-test your wick any time you change the fragrance load rather than assuming your previous wick still fits — this calculator only computes the fragrance oil amount, it doesn't check wick sizing.",
  },
  {
    question: "Where do the wax maximums come from?",
    answer:
      "See the wax fragrance-load reference chart for sources and confidence notes on every wax type.",
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

      <h1 className="text-3xl font-semibold">Candle Fragrance Load Calculator</h1>
      <p className="mt-3 text-gray-600">
        Enter your wax weight and type to get a safe fragrance oil amount.
      </p>

      <div className="mt-6">
        <FragranceCalculatorForm />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Wax fragrance-load maximums are sourced and cited in this
        project&rsquo;s
        <code className="mx-1 rounded bg-gray-100 px-1">
          lib/wax-fragrance-reference.ts
        </code>
        (see also{" "}
        <code className="mx-1 rounded bg-gray-100 px-1">
          docs/domain-reference.md
        </code>{" "}
        for the full review) — a reference aid, not a substitute for
        checking your own wax and fragrance oil supplier&rsquo;s data
        sheets before a large or unfamiliar batch.
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
