# D007 · Manual security review substituted for /security-review
Date: 2026-09-10 · Goal: G-001 · Status: active
Context: The skill needs `origin/HEAD`, absent before the first push.
Decision: Manual equivalent (no API routes, no server data, no secrets in `git ls-files`, JSON-LD escaped). No findings.
Rejected: pushing before review.
Consequence: Same gap as every svc-lab service.
Evidence: `lib/json-ld.tsx`.
