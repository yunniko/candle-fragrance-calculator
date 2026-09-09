# Handover — candle-fragrance-calculator

Read this before touching the project. Goal in `GOALS.md` (G-001).
Company-wide standards in `E:\CLAUDE\COMPANY\`. Parent initiative:
`E:\CLAUDE\projects\svc-lab\`.

## Current state

Built, domain-expert reviewed (with real fixes applied — see D6), locally
verified clean (ESLint, production build, 21 Vitest unit tests, 11
Playwright e2e tests, all passing after the fixes). Three tools:
`/fragrance-calculator` (wax weight + wax type → fragrance oil amount and
fragrance content, capped at a safe maximum), `/wax-fragrance-reference`
(sourced chart), `/candle-cost-calculator` (batch costs → cost per candle
+ margin-based suggested price). No database, no accounts.

## How things fit together

Standard svc-lab stateless Next.js service — see `svc-lab/HANDOVER.md` for
the shared template/deploy pattern. Business logic lives in
`lib/fragrance-calculator.ts` (wax weight + load % → fragrance oil
weight), `lib/wax-fragrance-reference.ts` (the sourced per-wax
recommended/maximum load table both the calculator and the reference page
draw from), and `lib/candle-cost-calculator.ts` (batch cost roll-up +
margin-based suggested price), all pure functions/data, unit-tested in
`tests/unit/`. UI forms are in `app/_components/`, pages in
`app/fragrance-calculator`, `app/wax-fragrance-reference`,
`app/candle-cost-calculator`.

## Decision record

**D1 — Fragrance load is calculated as a percentage of WAX weight, not of
the total finished (wax + fragrance) weight.** This is the convention
CandleScience's own fragrance-calculation guidance and Craftybase's
fragrance-load guide both use, and the one this project's research found
most consistently cited. A minority of sources use the total-weight
convention instead; at the loads this calculator allows (under ~12%), the
two conventions diverge only slightly, but this is flagged explicitly in
`lib/fragrance-calculator.ts`'s header comment and the calculator page's
own FAQ rather than silently picking one and staying quiet about the
alternative — the same "give an honest caveat rather than present one
convention as the only one" pattern `soap-lye-calculator` and
`resin-mix-ratio-calculator` already established for their own
convention choices.

**D2 — `lib/fragrance-calculator.ts` and `lib/candle-cost-calculator.ts`
are deliberately unit-agnostic — no embedded gram/ounce/pound conversion
factor.** Considered adding a full weight-unit converter (grams ↔ ounces
↔ pounds ↔ kilograms) so a user could enter wax in pounds and get
fragrance oil in grams. Rejected for now: the fragrance-load math is a
pure percentage of the input weight, so it works correctly in ANY
consistent unit without conversion — building conversion logic would add
real surface area for a unit-mismatch bug (e.g. an ounce/fluid-ounce mixup,
a known real trap in this specific domain since fragrance oil is
sometimes priced by volume but used by weight) for a feature that isn't
actually needed for the math to be correct. Both forms surface this to the
user directly instead: the fragrance calculator lets you pick a unit label
that's purely cosmetic (the math doesn't care), and the cost calculator's
own copy explicitly warns to keep cost-per-unit and weight-used in the
same unit. If a real user need for actual unit conversion emerges later,
add it as an explicit, tested conversion step rather than folding it
silently into the existing math.

**D3 — Cost calculator uses profit MARGIN (percent of selling price), not
markup (percent of cost), for its suggested price.** These are commonly
confused in small-business pricing and give different answers for the
same target percentage (see `lib/candle-cost-calculator.ts`'s header
comment and its own regression test asserting the two are NOT equal for
the same inputs). Margin was chosen because it's the more common framing
in retail/small-business pricing guidance ("I want to keep 40% of what
I charge"), and the page's own FAQ states the distinction explicitly
rather than assuming the user already knows which one they mean.

**D4 — Wax fragrance-load reference table covers five wax types (soy,
paraffin, coconut, beeswax, palm) plus a custom-wax option, not an
exhaustive list.** These are the wax types every cross-checked source
covered with enough independent corroboration to cite confidently.
Soy-coconut and other proprietary blends were deliberately left out
rather than guessing an average — the custom-wax option lets a user with
a blended or supplier-specific wax enter their own known maximum instead
of this tool inventing a number for a product it can't verify.

**D5 — Sourcing: WebFetch denied this session, so every fragrance-load
figure comes from WebSearch-snippet synthesis, not a directly-read primary
document.** Same known limitation documented in `svc-lab/HANDOVER.md`'s
research-caveat decision. Cross-corroborated per wax type across multiple
independent, long-standing candle-supply/community sources (see
`lib/wax-fragrance-reference.ts`'s header comment for the full citation
list) rather than trusted from one source — every entry's recommended/max
figures fall inside the range independently reported by at least two
sources. Flagged for the mandatory domain-expert review (M1b in
`GOALS.md`) before shipping, per `docs/domain-reference.md` once that
review has run.

**D6 — Domain-expert review (2026-09-10) found real, fixable issues, not
just documentation gaps — all fixed before shipping.** Full detail,
citations, and confidence notes in `docs/domain-reference.md`; summary
here:
1. A UI rounding bug (fixed 1-decimal precision regardless of unit) could
   display a fragrance-oil weight that reads as exceeding the very
   maximum the calculation itself correctly enforced (e.g. 1 lb of soy at
   a valid 8% load rounded the displayed 0.08 lb up to "0.1 lb," which
   reads as a 10% load). The calculation was always correct; only the
   display precision was wrong. Fixed with unit-agnostic adaptive
   precision (`roundForDisplay` in the form component).
2. The project's own comment mischaracterized the "fragrance content"
   convention (FO ÷ total weight, used exclusively by Candle Shack and
   for EU CLP labelling) as "a small minority" of sources — it's a named,
   actively-used alternative to "fragrance load" (FO ÷ wax weight), not a
   fringe case. Fixed: the calculator now computes and displays both
   figures, and copy uses the correct industry vocabulary.
3. The coconut-wax reference row (previously 8% recommended / 10% max)
   implied one safe number for all "coconut wax" products, but real
   named retail products span roughly 6-15% depending on the specific
   blend. Lowered to the conservative end (6%/8%) and the note now names
   the real spread instead of a single figure.
4. The "exceeding the maximum" failure-mode copy described burn-quality
   effects (sweating, wick saturation, sputtering flame) but omitted that
   multiple suppliers treat pooled unbound fragrance oil on a *burning*
   candle as a fire-hazard mechanism in its own right — fixed across the
   lib comment and both pages' FAQ copy.
5. The custom-wax option had no sanity ceiling — a user could enter any
   positive number as a wax's "maximum" with no pushback. Fixed: a 20%
   hard ceiling (above the highest real per-product figure the review
   found, ~15%) now applies regardless of wax selection.
6. The IFRA caveat overstated how often a fragrance oil's own certified
   maximum is below what the wax can hold — under IFRA's Category 12
   (candles), most fragrance oils are unrestricted, so the wax's own
   maximum is what usually governs. Corrected the framing and named
   Category 12 explicitly.
7. Missing standard guidance: wick re-sizing after a fragrance-load
   change, and ASTM F2417/F2058/F2179 for anyone selling their candles —
   both added via copy (homepage safety note, calculator-page FAQ,
   cost-calculator-page FAQ).

Soy wax's recommended default was also lowered from 8% to 6% (matching
CandleScience's own cited "average usage" rather than sitting near the
enforced ceiling) as part of fix #3's broader conservatism pass. Paraffin,
beeswax, and palm wax figures, the core wax-weight-basis calculation, and
the flash-point copy's substance all came back grounded with no changes
needed (the flash-point copy specifically was called out as "neither
alarmist nor dangerously permissive" — better calibrated than most of the
industry's own copy, per the reviewer). Re-ran the full verification suite
after every fix (not just trusted the pre-fix run): ESLint clean,
production build clean, 21 Vitest unit tests, 11 Playwright e2e tests, all
passing.

## Next steps and open questions

- Security review and shipping (M2) not yet done as of this writing.
- Monetization: will be wired via the shared `ADSENSE_PUBLISHER_ID` env
  var at deploy time, awaiting AdSense's own per-domain approval, same as
  every other svc-lab service.
- The domain-expert review flagged cure-time guidance and a direct check
  of wax technical data sheets (vs. this project's WebSearch-snippet
  sourcing) as worthwhile follow-ups if a future session gets WebFetch
  access — see `docs/domain-reference.md`'s closing section for exactly
  what to check.
