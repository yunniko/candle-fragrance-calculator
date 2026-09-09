"use client";

import { useMemo, useState } from "react";
import {
  calculateCandleCost,
  CandleCostCalculatorError,
} from "@/lib/candle-cost-calculator";

function round(n: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function CandleCostCalculatorForm() {
  const [waxWeightUsed, setWaxWeightUsed] = useState("500");
  const [waxCostPerUnitWeight, setWaxCostPerUnitWeight] = useState("0.01");
  const [fragranceWeightUsed, setFragranceWeightUsed] = useState("40");
  const [fragranceCostPerUnitWeight, setFragranceCostPerUnitWeight] = useState("0.05");
  const [wickCostPerCandle, setWickCostPerCandle] = useState("0.3");
  const [containerCostPerCandle, setContainerCostPerCandle] = useState("2");
  const [otherCostPerCandle, setOtherCostPerCandle] = useState("0.5");
  const [numberOfCandles, setNumberOfCandles] = useState("5");
  const [targetMarginPercent, setTargetMarginPercent] = useState("40");

  const result = useMemo(() => {
    try {
      return {
        error: null as string | null,
        value: calculateCandleCost({
          waxWeightUsed: Number(waxWeightUsed),
          waxCostPerUnitWeight: Number(waxCostPerUnitWeight),
          fragranceWeightUsed: Number(fragranceWeightUsed),
          fragranceCostPerUnitWeight: Number(fragranceCostPerUnitWeight),
          wickCostPerCandle: Number(wickCostPerCandle),
          containerCostPerCandle: Number(containerCostPerCandle),
          otherCostPerCandle: Number(otherCostPerCandle),
          numberOfCandles: Number(numberOfCandles),
          targetMarginPercent:
            targetMarginPercent.trim() === "" ? undefined : Number(targetMarginPercent),
        }),
      };
    } catch (e) {
      return {
        error: e instanceof CandleCostCalculatorError ? e.message : "Invalid input.",
        value: null,
      };
    }
  }, [
    waxWeightUsed,
    waxCostPerUnitWeight,
    fragranceWeightUsed,
    fragranceCostPerUnitWeight,
    wickCostPerCandle,
    containerCostPerCandle,
    otherCostPerCandle,
    numberOfCandles,
    targetMarginPercent,
  ]);

  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
        Use the same weight unit for wax and fragrance cost-per-unit as for
        the weight-used fields below (e.g. both priced and weighed in
        grams) — this calculator doesn&rsquo;t convert between units.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Wax weight used (batch total)</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={waxWeightUsed}
            onChange={(e) => setWaxWeightUsed(e.target.value)}
            aria-label="Wax weight used"
            inputMode="decimal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Wax cost per unit weight</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={waxCostPerUnitWeight}
            onChange={(e) => setWaxCostPerUnitWeight(e.target.value)}
            aria-label="Wax cost per unit weight"
            inputMode="decimal"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Fragrance oil weight used (batch total)</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={fragranceWeightUsed}
            onChange={(e) => setFragranceWeightUsed(e.target.value)}
            aria-label="Fragrance oil weight used"
            inputMode="decimal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Fragrance oil cost per unit weight</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={fragranceCostPerUnitWeight}
            onChange={(e) => setFragranceCostPerUnitWeight(e.target.value)}
            aria-label="Fragrance oil cost per unit weight"
            inputMode="decimal"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Wick cost per candle</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={wickCostPerCandle}
            onChange={(e) => setWickCostPerCandle(e.target.value)}
            aria-label="Wick cost per candle"
            inputMode="decimal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Container cost per candle</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={containerCostPerCandle}
            onChange={(e) => setContainerCostPerCandle(e.target.value)}
            aria-label="Container cost per candle"
            inputMode="decimal"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Other cost per candle (labels, dye, etc.)</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={otherCostPerCandle}
            onChange={(e) => setOtherCostPerCandle(e.target.value)}
            aria-label="Other cost per candle"
            inputMode="decimal"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Number of candles in batch</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={numberOfCandles}
            onChange={(e) => setNumberOfCandles(e.target.value)}
            aria-label="Number of candles"
            inputMode="decimal"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Target profit margin % (optional)</span>
          <input
            className="rounded border border-gray-300 px-3 py-2"
            value={targetMarginPercent}
            onChange={(e) => setTargetMarginPercent(e.target.value)}
            aria-label="Target margin percent"
            inputMode="decimal"
          />
        </label>
      </div>

      <div className="mt-6" data-testid="result">
        {result.error ? (
          <p className="text-red-600" role="alert">
            {result.error}
          </p>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-lg">
              Total batch cost:{" "}
              <span className="font-semibold">{round(result.value!.totalBatchCost)}</span>
            </p>
            <p className="text-lg">
              Cost per candle:{" "}
              <span className="font-semibold">{round(result.value!.costPerCandle)}</span>
            </p>
            {result.value!.suggestedPricePerCandle !== null && (
              <p className="text-lg">
                Suggested price per candle:{" "}
                <span className="font-semibold">
                  {round(result.value!.suggestedPricePerCandle)}
                </span>
              </p>
            )}
            <p className="mt-2 text-sm text-gray-600">
              Wax: {round(result.value!.waxCost)} · Fragrance:{" "}
              {round(result.value!.fragranceCost)} · Wicks:{" "}
              {round(result.value!.wickCostTotal)} · Containers:{" "}
              {round(result.value!.containerCostTotal)} · Other:{" "}
              {round(result.value!.otherCostTotal)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
