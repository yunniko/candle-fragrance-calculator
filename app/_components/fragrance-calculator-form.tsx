"use client";

import { useId, useMemo, useState } from "react";
import {
  calculateFragranceLoad,
  FragranceCalculatorError,
} from "@/lib/fragrance-calculator";
import {
  CUSTOM_WAX_LABEL,
  WAX_FRAGRANCE_REFERENCE,
} from "@/lib/wax-fragrance-reference";

function round(n: number, decimals = 1): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

// A fixed 1-decimal rounding looks fine for a 500g wax weight but silently
// misrepresents a small result: 1 lb of wax at 8% is 0.08 lb of fragrance
// oil, which round(x, 1) turns into "0.1 lb" — a number that reads as a
// 10% load, right at a wax's enforced maximum, even though the actual
// validated calculation was correctly 8%. Found by a 2026-09-10
// domain-expert review. Picks more decimal places for smaller magnitudes
// instead of a fixed precision, so the displayed number stays consistent
// with what was actually validated regardless of unit.
function roundForDisplay(n: number): number {
  if (n < 1) return round(n, 3);
  if (n < 10) return round(n, 2);
  return round(n, 1);
}

function waxEntry(name: string) {
  return WAX_FRAGRANCE_REFERENCE.find((w) => w.name === name);
}

export function FragranceCalculatorForm() {
  const [waxName, setWaxName] = useState(WAX_FRAGRANCE_REFERENCE[0].name);
  const [waxWeight, setWaxWeight] = useState("500");
  const [weightUnit, setWeightUnit] = useState("g");
  const [fragrancePercent, setFragrancePercent] = useState(
    String(WAX_FRAGRANCE_REFERENCE[0].recommendedPercent)
  );
  const [customMax, setCustomMax] = useState("10");
  const formId = useId();

  const isCustom = waxName === CUSTOM_WAX_LABEL;
  const maxPercent = isCustom ? Number(customMax) : waxEntry(waxName)?.maxPercent ?? NaN;

  function handleWaxChange(name: string) {
    setWaxName(name);
    const entry = waxEntry(name);
    if (entry) setFragrancePercent(String(entry.recommendedPercent));
  }

  const result = useMemo(() => {
    try {
      return {
        error: null as string | null,
        value: calculateFragranceLoad(
          Number(waxWeight),
          Number(fragrancePercent),
          maxPercent
        ),
      };
    } catch (e) {
      return {
        error: e instanceof FragranceCalculatorError ? e.message : "Invalid input.",
        value: null,
      };
    }
  }, [waxWeight, fragrancePercent, maxPercent]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Wax type</span>
          <select
            className="w-64 rounded border border-gray-300 px-3 py-2"
            value={waxName}
            onChange={(e) => handleWaxChange(e.target.value)}
            aria-label="Wax type"
          >
            {WAX_FRAGRANCE_REFERENCE.map((wax) => (
              <option key={wax.name} value={wax.name}>
                {wax.name}
              </option>
            ))}
            <option value={CUSTOM_WAX_LABEL}>{CUSTOM_WAX_LABEL}</option>
          </select>
        </label>

        {isCustom && (
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Your wax&rsquo;s maximum %</span>
            <input
              className="w-28 rounded border border-gray-300 px-3 py-2"
              value={customMax}
              onChange={(e) => setCustomMax(e.target.value)}
              aria-label="Custom wax maximum percent"
              inputMode="decimal"
            />
          </label>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Wax weight</span>
          <input
            className="w-32 rounded border border-gray-300 px-3 py-2"
            value={waxWeight}
            onChange={(e) => setWaxWeight(e.target.value)}
            aria-label="Wax weight"
            inputMode="decimal"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Unit</span>
          <select
            className="w-24 rounded border border-gray-300 px-3 py-2"
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            aria-label="Weight unit"
          >
            <option value="g">grams</option>
            <option value="oz">ounces</option>
            <option value="lb">pounds</option>
            <option value="kg">kilograms</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Fragrance load %</span>
          <input
            className="w-28 rounded border border-gray-300 px-3 py-2"
            value={fragrancePercent}
            onChange={(e) => setFragrancePercent(e.target.value)}
            aria-label="Fragrance load percent"
            inputMode="decimal"
          />
        </label>
      </div>

      {!isCustom && (
        <p className="mt-3 text-sm text-gray-500">
          Recommended for {waxName}: {waxEntry(waxName)?.recommendedPercent}% ·
          Maximum: {waxEntry(waxName)?.maxPercent}%
        </p>
      )}

      <div className="mt-6" data-testid="result" id={formId}>
        {result.error ? (
          <p className="text-red-600" role="alert">
            {result.error}
          </p>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-lg">
              Fragrance oil:{" "}
              <span className="font-semibold">
                {roundForDisplay(result.value!.fragranceOilWeight)} {weightUnit}
              </span>
            </p>
            <p className="text-lg">
              Total finished weight:{" "}
              <span className="font-semibold">
                {roundForDisplay(result.value!.totalWeight)} {weightUnit}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Wax: {roundForDisplay(result.value!.waxWeight)} {weightUnit} at{" "}
              {result.value!.fragranceLoadPercent}% fragrance load (
              {round(result.value!.fragranceContentPercent, 2)}% fragrance
              content — see FAQ below if your recipe uses that convention
              instead)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
