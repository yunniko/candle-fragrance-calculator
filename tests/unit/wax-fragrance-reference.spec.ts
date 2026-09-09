import { describe, expect, it } from "vitest";
import { WAX_FRAGRANCE_REFERENCE } from "@/lib/wax-fragrance-reference";

describe("WAX_FRAGRANCE_REFERENCE", () => {
  it("lists soy, paraffin, coconut, beeswax, and palm wax", () => {
    const names = WAX_FRAGRANCE_REFERENCE.map((w) => w.name.toLowerCase());
    expect(names.some((n) => n.includes("soy"))).toBe(true);
    expect(names.some((n) => n.includes("paraffin"))).toBe(true);
    expect(names.some((n) => n.includes("coconut"))).toBe(true);
    expect(names.some((n) => n.includes("beeswax"))).toBe(true);
    expect(names.some((n) => n.includes("palm"))).toBe(true);
  });

  it("every entry has a recommended percent at or below its maximum", () => {
    for (const wax of WAX_FRAGRANCE_REFERENCE) {
      expect(wax.recommendedPercent).toBeGreaterThan(0);
      expect(wax.maxPercent).toBeGreaterThanOrEqual(wax.recommendedPercent);
    }
  });

  it("every entry has a non-empty sourcing note", () => {
    for (const wax of WAX_FRAGRANCE_REFERENCE) {
      expect(wax.note.length).toBeGreaterThan(20);
    }
  });
});
