import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Candle Fragrance & Cost Calculators",
  description:
    "Free tools for candle makers: fragrance-oil load by wax type with a safe-maximum guard, a sourced wax fragrance-load reference chart, and a per-candle cost calculator.",
};

const TOOLS = [
  {
    href: "/fragrance-calculator",
    title: "Fragrance load calculator",
    description:
      "Enter your wax weight and wax type — get the fragrance oil amount, capped at that wax's safe maximum.",
  },
  {
    href: "/wax-fragrance-reference",
    title: "Wax fragrance-load reference chart",
    description:
      "Sourced recommended and maximum fragrance-load percentages for soy, paraffin, coconut, beeswax, and palm wax.",
  },
  {
    href: "/candle-cost-calculator",
    title: "Candle cost calculator",
    description:
      "Roll up wax, fragrance, wick, container, and other costs into a cost-per-candle and a suggested retail price.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Candle Fragrance & Cost Calculators</h1>
      <p className="mt-3 text-gray-600">
        Free tools for candle makers — safe fragrance-load amounts by wax
        type, a sourced reference chart, and a cost-per-candle calculator.
      </p>

      <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>Before you fragrance a batch:</strong> exceeding a wax&rsquo;s
        safe maximum load doesn&rsquo;t make a stronger-scented candle — the
        excess fragrance oil separates out, can saturate the wick, and
        risks a sputtering or sooty flame. Changing your fragrance load
        also often means re-testing your wick size. See the{" "}
        <Link href="/fragrance-calculator" className="underline">
          fragrance calculator
        </Link>{" "}
        for the full guidance, including wick and flash-point notes. If
        you plan to sell what you make, US candles are also expected to
        meet ASTM fire-safety and labeling standards (F2417, F2058) —
        this tool doesn&rsquo;t check that for you.
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            data-testid={`tool-card-${tool.href.slice(1)}`}
            className="rounded-lg border border-gray-200 p-5 hover:border-gray-400"
          >
            <h2 className="font-semibold text-blue-700">{tool.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
