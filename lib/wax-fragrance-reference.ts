// Fragrance-load reference table for common candle waxes: a "recommended"
// starting percentage (fragrance oil weight / wax weight) most suppliers
// suggest testing from, and a "maximum" percentage above which fragrance
// oil commonly separates out ("sweats") on the candle's surface, saturates
// the wick, or causes an erratic/sooty flame. This is the table both
// lib/fragrance-calculator.ts's validation and app/wax-fragrance-reference
// draw from.
//
// Sources: retrieved 2026-09-10 via WebSearch-result synthesis (WebFetch
// was denied this session, same known limitation documented in
// svc-lab/HANDOVER.md's research-caveat decision), cross-corroborated
// across multiple independent, long-standing candle-supply/community
// sources per wax type rather than trusted from one source:
//   - CandleScience's own support article on calculating fragrance oil
//     (support.candlescience.com) and its CocoSol coconut wax product page
//   - The Flaming Candle's "Candle Fragrance Load Guide" and fragrance
//     load calculator
//   - Lone Star Candle Supply's "Fragrance Oils FAQ"
//   - Bramble Berry's "Soy Wax 101" guide
//   - Craftybase's "How to Calculate Fragrance Load" guide
//   - Let's Make Candles' palm wax reference page
//   - candlematerial.com's wax-to-fragrance ratio chart (beeswax)
// Every entry's figures fall inside the range independently reported by at
// least two of the above. See docs/domain-reference.md once the mandatory
// domain-expert review has run for this project's own confidence check.
//
// IMPORTANT caveats surfaced by the research itself, not just this
// project's own hedging:
// 1. These are general industry ranges for a *typical* wax of that type,
//    not a guarantee for any specific product — proprietary/blended waxes
//    (and additives like Vybar in paraffin) can shift the real maximum
//    meaningfully. Always check your own wax's data sheet and test a small
//    batch before committing to a full run.
// 2. Your fragrance oil supplier's own IFRA usage/maximum-usage
//    certificate for candles can specify a lower ceiling than what the wax
//    itself can physically hold — if so, the lower number governs. Under
//    IFRA's 49th Amendment, candles moved from Category 11 to Category 12
//    (air care, no skin contact); for most fragrance oils the Category 12
//    limit is 100%/unrestricted, so in practice this is usually a safety
//    backstop rather than the binding constraint — the wax's own maximum
//    is what usually governs day to day. A 2026-09-10 domain-expert review
//    found an earlier version of this note overstated how often the
//    fragrance-oil figure is the lower one; check your fragrance oil's own
//    IFRA certificate regardless, since some fragrance compositions do
//    carry a real Category 12 restriction below 100%.
// 3. "Coconut wax" sold at retail is very often a coconut-blend (commonly
//    coconut-soy or coconut-apricot) rather than 100% pure coconut wax,
//    which is soft and rarely sold alone for container candles. The same
//    review found the real spread across specific retail "coconut wax"
//    products is wide (roughly 6-15% depending on the exact product) —
//    see the coconut entry's own note below for why this table picks a
//    conservative figure rather than a single "safe" number for all of
//    them.

export interface WaxFragranceEntry {
  name: string;
  recommendedPercent: number;
  maxPercent: number;
  note: string;
}

export const WAX_FRAGRANCE_REFERENCE: WaxFragranceEntry[] = [
  {
    name: "Soy wax (container)",
    recommendedPercent: 6,
    maxPercent: 10,
    note: "Golden Brands 464, the reference soy container wax most other soy waxes are benchmarked against, is rated 10% max by its own suppliers, with a 7-10% working range commonly cited; CandleScience separately cites 6% as the average usage across all fragrance oils, which this table uses as the conservative recommended default. Specialty soy blends formulated for higher scent throw may be rated up to 12% by their own supplier — check your specific wax's data sheet before pushing past 10%.",
  },
  {
    name: "Paraffin wax (container, additive-blended)",
    recommendedPercent: 6,
    maxPercent: 10,
    note: "Assumes a container paraffin blended with a fragrance-binding additive (e.g. Vybar), which suppliers like IGI rate at 10% max in containers — but only 6% in tealights, since a tealight's small wax volume lowers the safe ceiling regardless of wax type. Plain paraffin with no additive can be limited closer to 3%, and too much Vybar can itself trap fragrance and reduce scent throw — check whether your wax already includes an additive before assuming the higher end applies.",
  },
  {
    name: "Coconut wax (blend)",
    recommendedPercent: 6,
    maxPercent: 8,
    note: "\"Coconut wax\" covers several materially different retail products with a real spread: a 2026-09-10 domain-expert review found specific named products ranging from a coconut-paraffin blend recommended at only 6-8% (to avoid a defect suppliers call \"shooting\"), to a coconut-soy pillar wax capped at 6% for freestanding pillars specifically (despite being rated much higher, up to 25%, for wax melts — a different product category this table doesn't cover), to a coconut-apricot blend rated up to 15%. This table picks the conservative 6-8% end of that spread rather than implying one number is safe for every product sold as \"coconut wax\" — check your specific product's own data sheet, especially before trusting a figure above 8%.",
  },
  {
    name: "Beeswax (100%)",
    recommendedPercent: 4,
    maxPercent: 6,
    note: "Beeswax has a naturally low fragrance-binding capacity, and its own natural honey scent competes with added fragrance — most sources recommend staying at the low end (3-5%) rather than testing toward a higher maximum.",
  },
  {
    name: "Palm wax (container/pillar)",
    recommendedPercent: 5,
    maxPercent: 6,
    note: "Palm wax candle makers typically start around 5-6% to avoid sweating; some individual fragrances may be pushed higher case-by-case with your own testing, but this table uses the conservative starting figure most sources cite.",
  },
];

export const CUSTOM_WAX_LABEL = "Custom / other wax (enter your own maximum)";
