# D006 · Domain-expert review fixed seven real issues before shipping
Date: 2026-09-10 · Goal: G-001 · Status: active
Context: Mandatory domain gate.
Decision: Fixed: display rounding that could show a load exceeding the enforced maximum (adaptive precision); "fragrance content" mischaracterised (now computed and shown); coconut wax 8/10% → 6/8% with the real 6–15% spread noted; pooled oil on a burning candle named as a fire-hazard mechanism; 20% hard ceiling on custom wax; IFRA Category 12 framing corrected; wick re-sizing and ASTM F2417/F2058/F2179 guidance added. Soy default lowered 8% → 6%. Manual security review clean (D007).
Rejected: shipping the original figures.
Consequence: 21 unit + 11 e2e green after fixes.
Evidence: `docs/domain-reference.md`.
