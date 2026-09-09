# Goals — candle-fragrance-calculator

Owner writes goals here; The Company plans, executes, and logs against them.
Statuses: `DRAFT` · `ACTIVE` · `BLOCKED` · `DONE`.
Parent initiative: `E:\CLAUDE\projects\svc-lab\` (same milestone-gate waiver
and standing deploy pre-approval apply here). Template/numbering
conventions in `E:\CLAUDE\COMPANY\GOALS.md`.

## Active goals

### G-001 · Candle-making fragrance-load and cost calculators — ACTIVE
- **What:** Three tools: a fragrance-load calculator (`/fragrance-calculator`
  — wax weight and wax type → fragrance oil amount, capped at a safe
  maximum for that wax type), a sourced wax fragrance-load reference chart
  (`/wax-fragrance-reference`), and a per-candle cost calculator
  (`/candle-cost-calculator` — wax/fragrance/wick/container/other costs →
  cost per candle and a suggested retail price at a target profit margin).
  No database, no accounts.
- **Why:** svc-lab backlog idea #13 — reasoned signal (competitor-gap:
  existing tools work but are scattered across many small ad-heavy
  supplier sites). A genuine craft-chemistry domain with real (if more
  modest than soap's caustic-burn risk) safety stakes — over-fragrancing
  causes fragrance separation, wick saturation, and an unstable/sooty
  flame — the same shape as the soap/resin/clay/sourdough calculators that
  already proved this pattern out well.
- **Acceptance criteria:** Fragrance-load math unit-tested (including a
  maximum-load rejection check), wax fragrance-load reference values
  sourced and cross-corroborated across independent references,
  domain-expert-reviewed before shipping, cost-calculator math unit-tested
  (including the margin-vs-markup distinction), a real browser flow
  verified (e2e-tested), live and reachable over HTTPS, sitemap present,
  clear fragrance-load safety guidance on the calculator page.
- **Constraints:** No database, no accounts, no paid dependencies.

**Milestones:**
- [x] M1 — Build: fragrance-load calculation math (wax-weight-basis
      percentage, safe-maximum rejection), a sourced wax fragrance-load
      reference table (soy, paraffin, coconut, beeswax, palm, plus a
      custom-wax option), a per-candle cost calculator (margin-based
      suggested pricing), 3 tool pages, unit tests, e2e tests.
      ✔ 2026-09-10.
- [x] M1b — Domain-expert review (candle-making fragrance-load chemistry
      and burn safety). Found and fixed real issues, not just gaps: a UI
      rounding bug that could display a fragrance-oil weight reading as
      above the very maximum the calculation correctly enforced, a
      mischaracterized "fragrance content" convention (a named industry
      alternative, not a fringe case — now computed and displayed
      alongside fragrance load), an overly-uniform coconut-wax figure
      (real retail products span ~6-15%, not one safe number), an
      incomplete failure-mode description (missing the fire-hazard
      mechanism of pooled unbound oil on a burning candle), a
      custom-wax option with no sanity ceiling, and overstated IFRA
      framing. ✔ 2026-09-10 — see `docs/domain-reference.md` and
      `HANDOVER.md` D6.
- [ ] M2 — Ship: git init, security review, push via `init-repo.ps1`,
      deploy via `deploy-service.ps1`, verify live, update hub page and
      sitemap index.
- [ ] M3 — Monetization once an ad account exists for this domain (already
      wired via the shared `ADSENSE_PUBLISHER_ID` env var, awaiting
      AdSense's own per-domain approval, same as every other svc-lab
      service).

**Progress log** (newest first):
- 2026-09-10 — M1b complete this run. Domain-expert review of the
  candle-making fragrance-load chemistry/safety claims found six real,
  fixable issues — not just documentation gaps: (1) a UI display-rounding
  bug (fixed 1-decimal precision regardless of unit) that could show a
  fragrance-oil weight reading as above the very maximum the underlying
  calculation correctly enforced; (2) the project's own comment
  mischaracterized "fragrance content" (FO ÷ total weight, used
  exclusively by a major UK/EU supplier and for EU safety labelling) as
  "a small minority" convention — it's a named, actively-used alternative
  to "fragrance load," now computed and displayed alongside it; (3) the
  coconut-wax reference row implied one safe number when real named
  retail products span roughly 6-15% — lowered to a conservative 6%/8%
  and the note now names the real spread; (4) the "exceeding the maximum"
  failure-mode copy omitted that pooled unbound fragrance oil on a
  burning candle is itself a fire-hazard mechanism per multiple suppliers,
  not just a burn-quality issue; (5) the custom-wax option had no sanity
  ceiling — fixed with a 20% hard cap; (6) the IFRA caveat overstated how
  often a fragrance oil's own certified maximum is the binding constraint
  (under Category 12, most are unrestricted) — corrected and named the
  category explicitly. Also added previously-missing standard guidance
  (wick re-sizing after a load change; ASTM F2417/F2058/F2179 for anyone
  selling their candles) via copy. Paraffin, beeswax, palm figures, the
  core wax-weight-basis calculation convention, and the flash-point
  copy's substance all came back grounded with no changes needed — the
  flash-point copy was specifically called out as better-calibrated than
  most of the industry's own copy. Full detail in
  `docs/domain-reference.md` and `HANDOVER.md` D6. Re-ran the full
  verification suite fresh after every fix (not just trusted the pre-fix
  run): ESLint clean, production build clean, 21 Vitest unit tests (added
  3 for the fix), 11 Playwright e2e tests (added 1), all passing.
- 2026-09-10 — M1 complete this run (svc-lab daily automation). Sourcing
  note: WebFetch was denied this session (confirmed, same known
  limitation as prior runs — see `svc-lab/HANDOVER.md`'s research-caveat
  decision), so the wax fragrance-load reference table is sourced via
  WebSearch synthesis, cross-corroborated across multiple independent
  candle-supply/community references per wax type (CandleScience's own
  support article and CocoSol product page, The Flaming Candle's
  fragrance load guide, Lone Star Candle Supply's fragrance FAQ, Bramble
  Berry's Soy Wax 101, Craftybase's fragrance-load guide, Let's Make
  Candles' palm wax page, candlematerial.com's beeswax ratio chart) that
  converged on the same ranges within normal variation for every wax type.
  Full citations in `lib/wax-fragrance-reference.ts`'s header comment.
  Flagging this explicitly for the mandatory domain-expert review (M1b)
  before shipping, same pattern as every prior svc-lab service's sourcing
  caveat.
