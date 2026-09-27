# Handover — candle-fragrance-calculator
Last verified: 2026-09-12 at 06d05a9

svc-lab service #11. Goal: `GOALS.md` G-001. Shared conventions: `E:\CLAUDE\projects\svc-lab\`;
charter: `E:\CLAUDE\COMPANY\`.

## Current state

- **Live** at https://candle-fragrance-calculator.svc.julienika.cz (deployed 2026-09-10,
  port 30160; HTTP 200 re-checked 2026-09-12).
- Three tools, no database, no accounts: `/fragrance-calculator` (wax weight + type → fragrance
  oil amount, load and content, capped at the wax's maximum), `/wax-fragrance-reference`,
  `/candle-cost-calculator` (batch cost → cost per candle + margin-based price).
- Verification on 2026-09-12: `npm run test:unit` 21/21. e2e (11 specs) last green 2026-09-10.
- Domain-expert and manual security reviews done (D006, D007). Git tree clean.

## How things fit together

Standard svc-lab stateless Next.js service. Pure logic: `lib/fragrance-calculator.ts`,
`lib/wax-fragrance-reference.ts` (sourced table), `lib/candle-cost-calculator.ts`. Forms in
`app/_components/` (display rounding lives in `roundForDisplay`), pages under `app/<tool>/`.

## Rules in force

- Load is % of wax weight; content (% of total) is shown alongside (D001).
- No hardcoded weight-unit conversion (D002). Custom wax maximum capped at 20% (D006).
- A wrong maximum understates a real burn-quality/fire risk: change reference figures only with a
  cited source.
- `npm ci --legacy-peer-deps`; run unit, e2e and `npm run build` before calling work done.

## Next steps and open questions

- Cure-time guidance and a direct check of wax technical data sheets when WebFetch works
  (`docs/domain-reference.md`, closing section).
- AdSense per-domain approval unconfirmed (portfolio-wide).

## Deploy log

| Date | Commit | What changed | Verified how |
|---|---|---|---|
| 2026-09-10 | 06d05a9 | First deploy (port 30160); hub + sitemap index updated | Every route curl 200, sitemap/robots checked, sibling sites unaffected |

## Decisions

`docs/decisions/README.md` (D001–D008).
