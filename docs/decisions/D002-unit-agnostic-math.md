# D002 · Fragrance and cost calculators are unit-agnostic; no built-in weight conversion
Date: 2026-09-10 · Goal: G-001 · Status: active
Context: Fragrance oil is sometimes priced by volume but used by weight; an ounce/fluid-ounce mix-up is a real trap.
Decision: Pure percentage/ratio math; the unit label is cosmetic and the cost form warns to keep units consistent.
Rejected: a grams/ounces/pounds converter (new surface for unit-mismatch bugs, not needed for correctness).
Consequence: If real users need conversion, add it as an explicit tested step, never folded into the math.
Evidence: `lib/fragrance-calculator.ts`; `lib/candle-cost-calculator.ts`.
