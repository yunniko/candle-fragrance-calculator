# D003 · Suggested price uses profit margin (of selling price), not markup (of cost)
Date: 2026-09-10 · Goal: G-001 · Status: active
Context: The two are commonly confused and give different prices for the same percentage.
Decision: Margin, the more common small-business framing; the FAQ states the distinction; a regression test asserts margin ≠ markup for the same inputs.
Rejected: markup.
Consequence: Keep the test and the FAQ wording if the formula changes.
Evidence: `lib/candle-cost-calculator.ts`; `tests/unit/`.
