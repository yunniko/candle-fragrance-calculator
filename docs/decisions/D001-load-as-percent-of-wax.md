# D001 · Fragrance load is a percentage of wax weight; fragrance content (of total) is shown alongside
Date: 2026-09-10 · Goal: G-001 · Status: active
Context: CandleScience and Craftybase compute load as FO ÷ wax weight; Candle Shack and EU CLP labelling use FO ÷ total weight ("fragrance content").
Decision: Calculate load on wax weight; also compute and display fragrance content with the correct industry vocabulary (added by the domain review, D006, which found the earlier "small minority" framing wrong).
Rejected: silently picking one convention.
Consequence: Both figures stay on the calculator page and FAQ.
Evidence: `lib/fragrance-calculator.ts` header; `docs/domain-reference.md`.
