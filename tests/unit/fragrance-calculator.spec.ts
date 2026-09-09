import { describe, expect, it } from "vitest";
import {
  calculateFragranceLoad,
  FragranceCalculatorError,
} from "@/lib/fragrance-calculator";

describe("calculateFragranceLoad", () => {
  it("computes fragrance oil weight as wax weight times load percent", () => {
    const result = calculateFragranceLoad(500, 8, 10);
    expect(result.fragranceOilWeight).toBeCloseTo(40, 9);
    expect(result.totalWeight).toBeCloseTo(540, 9);
    expect(result.waxWeight).toBe(500);
    expect(result.fragranceLoadPercent).toBe(8);
  });

  it("is unit-agnostic — same math regardless of the unit represented", () => {
    const grams = calculateFragranceLoad(500, 8, 10);
    const ounces = calculateFragranceLoad(17.64, 8, 10);
    expect(ounces.fragranceOilWeight / ounces.waxWeight).toBeCloseTo(
      grams.fragranceOilWeight / grams.waxWeight,
      9
    );
  });

  it("rejects a load above the supplied maximum", () => {
    expect(() => calculateFragranceLoad(500, 15, 10)).toThrow(FragranceCalculatorError);
  });

  it("accepts a load exactly at the maximum", () => {
    const result = calculateFragranceLoad(500, 10, 10);
    expect(result.fragranceOilWeight).toBeCloseTo(50, 9);
  });

  it("rejects a non-positive wax weight", () => {
    expect(() => calculateFragranceLoad(0, 8, 10)).toThrow(FragranceCalculatorError);
    expect(() => calculateFragranceLoad(-100, 8, 10)).toThrow(FragranceCalculatorError);
  });

  it("rejects a non-positive fragrance load percent", () => {
    expect(() => calculateFragranceLoad(500, 0, 10)).toThrow(FragranceCalculatorError);
    expect(() => calculateFragranceLoad(500, -5, 10)).toThrow(FragranceCalculatorError);
  });

  it("rejects a non-positive maximum", () => {
    expect(() => calculateFragranceLoad(500, 5, 0)).toThrow(FragranceCalculatorError);
  });

  it("rejects non-finite inputs", () => {
    expect(() => calculateFragranceLoad(NaN, 8, 10)).toThrow(FragranceCalculatorError);
    expect(() => calculateFragranceLoad(500, NaN, 10)).toThrow(FragranceCalculatorError);
  });

  it("computes fragrance content (FO / total weight) alongside fragrance load", () => {
    const result = calculateFragranceLoad(1000, 10, 10);
    // 10% load -> 100g FO / 1100g total = 9.0909...% content, per
    // content = load / (1 + load).
    expect(result.fragranceContentPercent).toBeCloseTo(9.0909, 3);
    expect(result.fragranceContentPercent).toBeLessThan(result.fragranceLoadPercent);
  });

  it("rejects a custom maximum above the sanity ceiling regardless of the requested load", () => {
    expect(() => calculateFragranceLoad(500, 15, 25)).toThrow(FragranceCalculatorError);
  });

  it("accepts a maximum at the sanity ceiling", () => {
    const result = calculateFragranceLoad(500, 15, 20);
    expect(result.fragranceOilWeight).toBeCloseTo(75, 9);
  });
});
