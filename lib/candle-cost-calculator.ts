// Per-candle cost calculator: rolls up wax, fragrance oil, wick, container,
// and other per-candle costs (labels, dye, etc.) across a batch, then
// divides by the number of candles to get a cost per candle, with an
// optional suggested retail price at a target profit margin.
//
// Unit-agnostic like fragrance-calculator.ts: wax/fragrance cost-per-unit
// and the weight used must be given in the SAME weight unit (e.g. both in
// grams, or both in ounces) — this deliberately avoids embedding a
// gram/ounce/pound conversion factor, so pick one unit for the whole
// calculation and stay consistent (the UI labels this explicitly) rather
// than risk a silently wrong conversion.
//
// Margin vs. markup: this calculator uses PROFIT MARGIN (profit as a
// percentage of the selling price), not markup (profit as a percentage of
// cost) — these are commonly confused and give different suggested
// prices for the same target percentage. Margin formula: price = cost /
// (1 - margin/100). E.g. a $5 cost at a 40% margin suggests $8.33, not
// $7.00 (which would be a 40% markup instead).

export class CandleCostCalculatorError extends Error {}

export interface CandleCostInputs {
  waxWeightUsed: number;
  waxCostPerUnitWeight: number;
  fragranceWeightUsed: number;
  fragranceCostPerUnitWeight: number;
  wickCostPerCandle: number;
  containerCostPerCandle: number;
  otherCostPerCandle: number;
  numberOfCandles: number;
  targetMarginPercent?: number;
}

export interface CandleCostResult {
  waxCost: number;
  fragranceCost: number;
  wickCostTotal: number;
  containerCostTotal: number;
  otherCostTotal: number;
  totalBatchCost: number;
  costPerCandle: number;
  suggestedPricePerCandle: number | null;
}

function assertNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new CandleCostCalculatorError(`${label} must be zero or a positive number.`);
  }
}

export function calculateCandleCost(inputs: CandleCostInputs): CandleCostResult {
  const {
    waxWeightUsed,
    waxCostPerUnitWeight,
    fragranceWeightUsed,
    fragranceCostPerUnitWeight,
    wickCostPerCandle,
    containerCostPerCandle,
    otherCostPerCandle,
    numberOfCandles,
    targetMarginPercent,
  } = inputs;

  assertNonNegative(waxWeightUsed, "Wax weight used");
  assertNonNegative(waxCostPerUnitWeight, "Wax cost per unit weight");
  assertNonNegative(fragranceWeightUsed, "Fragrance oil weight used");
  assertNonNegative(fragranceCostPerUnitWeight, "Fragrance oil cost per unit weight");
  assertNonNegative(wickCostPerCandle, "Wick cost per candle");
  assertNonNegative(containerCostPerCandle, "Container cost per candle");
  assertNonNegative(otherCostPerCandle, "Other cost per candle");
  if (!Number.isFinite(numberOfCandles) || numberOfCandles <= 0) {
    throw new CandleCostCalculatorError("Number of candles must be a positive number.");
  }

  const waxCost = waxWeightUsed * waxCostPerUnitWeight;
  const fragranceCost = fragranceWeightUsed * fragranceCostPerUnitWeight;
  const wickCostTotal = wickCostPerCandle * numberOfCandles;
  const containerCostTotal = containerCostPerCandle * numberOfCandles;
  const otherCostTotal = otherCostPerCandle * numberOfCandles;
  const totalBatchCost = waxCost + fragranceCost + wickCostTotal + containerCostTotal + otherCostTotal;
  const costPerCandle = totalBatchCost / numberOfCandles;

  let suggestedPricePerCandle: number | null = null;
  if (targetMarginPercent !== undefined) {
    if (!Number.isFinite(targetMarginPercent) || targetMarginPercent < 0 || targetMarginPercent >= 100) {
      throw new CandleCostCalculatorError(
        "Target margin percent must be between 0% (inclusive) and 100% (exclusive) — a 100% margin would mean an infinite price."
      );
    }
    suggestedPricePerCandle = costPerCandle / (1 - targetMarginPercent / 100);
  }

  return {
    waxCost,
    fragranceCost,
    wickCostTotal,
    containerCostTotal,
    otherCostTotal,
    totalBatchCost,
    costPerCandle,
    suggestedPricePerCandle,
  };
}
