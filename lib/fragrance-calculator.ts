// Candle fragrance-load calculation: given a wax weight and a target
// fragrance load percentage, computes the fragrance oil weight and the
// total finished (wax + fragrance) weight.
//
// Convention used: FRAGRANCE LOAD, not fragrance content — two distinct,
// named industry terms, not interchangeable rounding of the same idea:
//   - Fragrance LOAD = FO weight ÷ WAX weight (fragrance oil = wax weight
//     × load%). This is the convention CandleScience, The Flaming Candle,
//     Lone Star Candle Supply, and Craftybase all compute with, and the
//     one this calculator uses throughout.
//   - Fragrance CONTENT = FO weight ÷ (wax weight + FO weight). At least
//     one major supplier (Candle Shack, UK/EU) uses content exclusively
//     in all its published recipes, and the EU convention is to use load
//     to check what the wax can hold but content for CLP safety-labelling
//     compliance. Content = load / (1 + load), e.g. a 10% load is a 9.09%
//     content — a ~10% relative difference, not a rounding-level one. A
//     2026-09-10 domain-expert review found an earlier version of this
//     comment wrongly called the content convention "a small minority" of
//     sources; it's a named, actively-used alternative, not a fringe case.
//     `calculateFragranceLoad`'s result includes both figures so a user
//     working from a content-based recipe isn't left to convert by hand.
//
// This module is deliberately unit-agnostic: pass the wax weight in
// whatever unit you like (grams, ounces, pounds) and the fragrance oil
// weight comes back in that same unit, since the math is a pure
// percentage of the input. The UI is responsible for labeling the unit
// consistently AND for using enough decimal precision when displaying a
// small result — the same 2026-09-10 review caught the original UI
// rounding a computed value to a fixed 1 decimal place regardless of
// magnitude, which for e.g. 1 lb of wax at 8% (0.08 lb of FO) rounded the
// DISPLAYED number up to 0.1 lb — a value that reads as a 10% load, at
// the enforced ceiling, even though the actual validated calculation was
// correctly 8%. The calculation itself was never wrong, only the
// display's precision; see app/_components/fragrance-calculator-form.tsx's
// adaptive-precision rounding for the fix.
//
// Fragrance load maximums come from lib/wax-fragrance-reference.ts, each
// capped by this module at MAX_SANITY_FRAGRANCE_LOAD_PERCENT regardless of
// what a user enters for a custom wax — no real candle wax the review
// found is rated above roughly 15%, so a custom-wax entry above that is
// rejected outright rather than trusted at face value.
//
// Exceeding a wax's maximum doesn't produce a stronger-scented candle —
// the opposite: past the maximum the excess fragrance oil can't stay
// bound in the wax, so it separates out onto the surface ("sweats"), can
// migrate to the bottom of the container, and can saturate and clog the
// wick, causing a sputtering, smoking, or unstable flame and WEAKER scent
// throw, not stronger. This is primarily a burn-quality/wick-performance
// risk, but multiple candle suppliers are explicit that pooled, unbound
// fragrance oil sitting on or under a BURNING candle is itself a real
// fire-hazard mechanism, particularly with an undersized wick — a
// different mechanism from the flash-point framing on
// app/fragrance-calculator/page.tsx (which is about mixing fragrance into
// hot wax during pouring, not about a finished candle burning with excess
// unbound oil in it). Changing your fragrance load also changes how much
// heat the candle needs to fully melt and combust — always re-check your
// wick size after a load change rather than assuming an old wick still
// fits; see the calculator page's own safety note.

const MAX_SANITY_FRAGRANCE_LOAD_PERCENT = 20;

export class FragranceCalculatorError extends Error {}

export interface FragranceLoadResult {
  waxWeight: number;
  fragranceOilWeight: number;
  totalWeight: number;
  fragranceLoadPercent: number;
  /** FO weight / (wax + FO) × 100 — the "fragrance content" convention some suppliers use instead of load. */
  fragranceContentPercent: number;
}

function assertPositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new FragranceCalculatorError(`${label} must be a positive number.`);
  }
}

/**
 * Computes the fragrance oil weight for a given wax weight and fragrance
 * load percentage, rejecting a load above the supplied maximum (from the
 * wax's own reference entry, or a user-entered custom maximum).
 */
export function calculateFragranceLoad(
  waxWeight: number,
  fragranceLoadPercent: number,
  maxFragranceLoadPercent: number
): FragranceLoadResult {
  assertPositive(waxWeight, "Wax weight");
  if (!Number.isFinite(fragranceLoadPercent) || fragranceLoadPercent <= 0) {
    throw new FragranceCalculatorError(
      "Fragrance load percent must be a positive number."
    );
  }
  if (
    !Number.isFinite(maxFragranceLoadPercent) ||
    maxFragranceLoadPercent <= 0
  ) {
    throw new FragranceCalculatorError(
      "Maximum fragrance load percent must be a positive number."
    );
  }
  if (maxFragranceLoadPercent > MAX_SANITY_FRAGRANCE_LOAD_PERCENT) {
    throw new FragranceCalculatorError(
      `A maximum above ${MAX_SANITY_FRAGRANCE_LOAD_PERCENT}% is above what any real candle wax this tool's research found is rated for — double-check your wax's own data sheet before entering a custom maximum this high.`
    );
  }
  if (fragranceLoadPercent > maxFragranceLoadPercent) {
    throw new FragranceCalculatorError(
      `${fragranceLoadPercent}% is above this wax's ${maxFragranceLoadPercent}% maximum — fragrance oil that can't stay bound in the wax separates out on the surface ("sweats") or migrates to the bottom of the container, can saturate the wick, and risks a sputtering or sooty flame (and pooled unbound oil on a burning candle is itself a fire-hazard mechanism, not just a quality issue) — all for a WEAKER scent throw, not a stronger one. Lower the fragrance load or switch to a wax rated for a higher load.`
    );
  }

  const fragranceOilWeight = waxWeight * (fragranceLoadPercent / 100);
  const totalWeight = waxWeight + fragranceOilWeight;
  return {
    waxWeight,
    fragranceOilWeight,
    totalWeight,
    fragranceLoadPercent,
    fragranceContentPercent: (fragranceOilWeight / totalWeight) * 100,
  };
}
