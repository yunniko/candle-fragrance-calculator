import { describe, expect, it } from "vitest";
import {
  calculateCandleCost,
  CandleCostCalculatorError,
} from "@/lib/candle-cost-calculator";

const BASE_INPUTS = {
  waxWeightUsed: 500,
  waxCostPerUnitWeight: 0.01,
  fragranceWeightUsed: 40,
  fragranceCostPerUnitWeight: 0.05,
  wickCostPerCandle: 0.3,
  containerCostPerCandle: 2,
  otherCostPerCandle: 0.5,
  numberOfCandles: 5,
};

describe("calculateCandleCost", () => {
  it("sums wax, fragrance, and per-candle costs into a total batch cost", () => {
    const result = calculateCandleCost(BASE_INPUTS);
    expect(result.waxCost).toBeCloseTo(5, 9); // 500 * 0.01
    expect(result.fragranceCost).toBeCloseTo(2, 9); // 40 * 0.05
    expect(result.wickCostTotal).toBeCloseTo(1.5, 9); // 0.3 * 5
    expect(result.containerCostTotal).toBeCloseTo(10, 9); // 2 * 5
    expect(result.otherCostTotal).toBeCloseTo(2.5, 9); // 0.5 * 5
    expect(result.totalBatchCost).toBeCloseTo(21, 9);
    expect(result.costPerCandle).toBeCloseTo(4.2, 9);
  });

  it("computes a suggested price using profit MARGIN, not markup", () => {
    const result = calculateCandleCost({ ...BASE_INPUTS, targetMarginPercent: 40 });
    // cost 4.2, margin 40% -> price = cost / (1 - 0.4) = 7.0
    expect(result.suggestedPricePerCandle).toBeCloseTo(7.0, 9);
    // Explicitly NOT a 40% markup, which would be 4.2 * 1.4 = 5.88
    expect(result.suggestedPricePerCandle).not.toBeCloseTo(5.88, 2);
  });

  it("returns null suggested price when no target margin is given", () => {
    const result = calculateCandleCost(BASE_INPUTS);
    expect(result.suggestedPricePerCandle).toBeNull();
  });

  it("rejects a negative cost or weight input", () => {
    expect(() =>
      calculateCandleCost({ ...BASE_INPUTS, waxWeightUsed: -1 })
    ).toThrow(CandleCostCalculatorError);
    expect(() =>
      calculateCandleCost({ ...BASE_INPUTS, waxCostPerUnitWeight: -0.01 })
    ).toThrow(CandleCostCalculatorError);
  });

  it("accepts zero-cost inputs (e.g. a free sample container)", () => {
    const result = calculateCandleCost({ ...BASE_INPUTS, containerCostPerCandle: 0 });
    expect(result.containerCostTotal).toBe(0);
  });

  it("rejects a non-positive number of candles", () => {
    expect(() =>
      calculateCandleCost({ ...BASE_INPUTS, numberOfCandles: 0 })
    ).toThrow(CandleCostCalculatorError);
  });

  it("rejects a margin of 100% or more (would divide by zero or go negative)", () => {
    expect(() =>
      calculateCandleCost({ ...BASE_INPUTS, targetMarginPercent: 100 })
    ).toThrow(CandleCostCalculatorError);
    expect(() =>
      calculateCandleCost({ ...BASE_INPUTS, targetMarginPercent: -5 })
    ).toThrow(CandleCostCalculatorError);
  });
});
