# Domain reference — candle fragrance-load chemistry & craft practice

Reviewed 2026-09-10 by the `domain-expert` subagent before shipping, per
`COMPANY\STANDARDS.md`'s "Domain depth" gate. WebFetch was denied to the
reviewer (same limitation as this project's own build), so this is also
WebSearch-snippet synthesis rather than primary-document reads — findings
below are flagged with the reviewer's own confidence level per item.

## Fragrance load vs. fragrance content

Two distinct, named industry conventions, not interchangeable rounding:
- **Fragrance load** = FO weight ÷ wax weight. Used by CandleScience, The
  Flaming Candle, Lone Star Candle Supply, Craftybase — the convention
  this project's calculator uses.
- **Fragrance content** = FO weight ÷ (wax + FO) total weight. Candle
  Shack (a major UK/EU supplier) uses content exclusively in its published
  recipes; EU guidance uses content specifically for CLP safety labelling.
- Conversion: content = load / (1 + load). A 10% load is a 9.09% content
  — a ~10% relative difference, not negligible.

**Fix applied:** the original build's comment called the content
convention "a small minority" of sources — corrected. `calculateFragranceLoad`
now returns `fragranceContentPercent` alongside the load figure, and the
fragrance-calculator page displays both with an FAQ entry explaining the
distinction. Confidence: high (a named, sourced industry term, not a
judgment call).

## Per-wax figures

| Wax | Recommended | Max | Review outcome |
|---|---|---|---|
| Soy wax (container) | 6% (was 8%) | 10% | Max confirmed against Golden Brands 464's own 10% rating. Recommended lowered from 8% to 6% to match CandleScience's own cited "average usage" rather than sitting near the ceiling. |
| Paraffin (container, additive-blended) | 6% | 10% | Confirmed against IGI 4630 (10% container max). Added a sourced caveat: IGI 4630 itself drops to 6% max in tealights — form factor, not just wax type, moves the ceiling. |
| Coconut wax (blend) | 6% (was 8%) | 8% (was 10%) | **Real finding, fixed.** "Coconut wax" spans a wide range depending on the specific retail product: a coconut-paraffin blend recommended at only 6-8%, a coconut-soy pillar wax capped at 6% for freestanding pillars (despite being rated to 25% for wax melts — a different product category), and a coconut-apricot blend rated up to 15%. The original 8%/10% figures implied one safe number for all of them; lowered to the conservative end (6%/8%) and the note now names the real spread instead of a single number. |
| Beeswax (100%) | 4% | 6% | Confirmed against multiple sources (3-6% consensus). No change. |
| Palm wax (container/pillar) | 5% | 6% | Confirmed against Let's Make Candles' 5-6% starting figure. No change. |

## Failure mode when a wax's maximum is exceeded

Original copy described sweating/wick saturation/sputtering flame — accurate
but incomplete. **Real finding, fixed:** multiple suppliers explicitly
describe pooled, unbound fragrance oil on or under a *burning* candle as a
fire-hazard mechanism in its own right (not just a burn-quality issue),
particularly with an undersized wick. Copy across `lib/fragrance-calculator.ts`,
the calculator page's FAQ, and the reference page's FAQ now states this
explicitly, alongside the previously-missing detail that oil can migrate
to the bottom of the container (not just the surface) and that exceeding
the maximum gives a *weaker* scent throw, not a stronger one. Confidence:
medium-high (consistent across independent suppliers, though suppliers
have an incentive to over-warn; no measured incident data found).

## Flash point

Original copy (fragrance oil added around 180°F, well below an open flame;
flash point governs storage/shipping, not pouring-stage combustion) was
independently confirmed as accurate and well-calibrated — "neither
alarmist nor dangerously permissive," per the reviewer. Two refinements
applied: (1) gel candles are a genuine exception (require FO rated ≥170°F
flash point, since trapped vapor pockets in burning gel can ignite) — this
tool doesn't cover gel wax, now stated explicitly; (2) added the real
pouring-stage fire risk that the original copy's "not a fire during
pouring" line omitted — overheated or unattended melting wax itself
(flash point ~400-500°F). Confidence: high (uniform across four
independent supplier sources).

## Custom-wax sanity ceiling

**Real finding, fixed.** The custom-wax option originally validated only
that a user-entered maximum was a positive number — someone could enter
60% and get a result with no warning. No real candle wax the review found
is rated above roughly 15%. `calculateFragranceLoad` now rejects any
maximum above 20% (a small margin above the highest real figure found,
coconut-apricot's 15%) regardless of wax selection.

## Wick sizing

**Real gap, addressed via copy, not code** (this tool doesn't calculate
wick sizes — sourcing and validating a wick-size table is out of scope for
this ship). Added an FAQ entry and a homepage safety note: changing
fragrance (or dye) load commonly requires a wick one to three sizes
larger to reach a full melt pool, and re-testing the wick after any load
change is standard practice, not optional. Confidence: high (consistent
across CandleScience's and Lone Star's own wicking guides).

## IFRA / regulatory framing

Original copy said fragrance-oil suppliers "often" publish a lower
maximum than the wax allows. **Corrected:** under IFRA's 49th Amendment,
candles are Category 12 (air care), and most fragrance oils are rated
100%/unrestricted in that category — the wax's own maximum is what
usually governs in practice, not the fragrance oil's. The "check the
lower number" guidance is kept (some compositions do carry a real
Category 12 restriction), but the framing no longer implies this is the
common case. Category 12 is now named explicitly.

## ASTM standards

Added (previously absent): F2417 (fire safety — flame height, secondary
ignition, stability), F2058 (mandatory fire-safety warning labelling),
F2179 (soda-lime glass container thermal-shock rating) as an FAQ entry on
the cost calculator page (the tool that implies commercial sale via its
suggested-price feature) and a one-line pointer on the homepage. This
tool doesn't check compliance — it only names the standards a seller
should check directly.

## Cost calculator (business math, not a real-world domain claim)

No domain error found. The margin formula (`cost / (1 - margin/100)`,
explicitly not markup) was verified correct against the reviewer's own
worked example ($5 cost at 40% margin → $8.33).

## What wasn't fixed, and why

- **Cure time** was flagged by the reviewer as a real gap (candles often
  need to cure before their true scent throw develops, which is the exact
  situation that tempts someone to over-fragrance instead of waiting) but
  the reviewer's own confidence in a specific cure-time figure was low
  ("recalled consensus, unsourced this session"). Per this project's
  honesty standard, no unsourced number was added — this is left as an
  open question for a future update with a real citation, rather than
  guessing.
- **Wax technical data sheets** were not read directly (WebFetch denied to
  both this build and the review) — every figure above is WebSearch-snippet
  synthesis. If a future session gets WebFetch access, the reviewer
  specifically flagged reconciling the coconut-wax spread against real TDS
  PDFs (Golden Brands 464, IGI 4630, IGI 6046, CandleScience Coconut
  Apricot and CocoSol) as the highest-value follow-up.
- **Palm wax sourcing/sustainability (RSPO)** was noted by the reviewer as
  a live industry issue not investigated this session — not a
  fragrance-load correctness issue, so left out of this ship's scope.
