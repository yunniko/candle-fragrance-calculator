# candle-fragrance-calculator

Three tools for candle makers: a fragrance-load calculator (wax weight →
fragrance oil amount, capped at a safe maximum for the selected wax type),
a sourced wax fragrance-load reference chart, and a per-candle cost
calculator (wax/fragrance/wick/container/other costs → cost per candle and
a suggested retail price). Part of the `svc-lab` portfolio (see
`E:\CLAUDE\projects\svc-lab\`).

## Running it

```
npm install --legacy-peer-deps
npm run dev
```

Production build/run: `docker compose --profile app up -d --build`
(no database — stateless).

## Tests

```
npx vitest run        # unit tests — lib/*.ts fragrance/cost math and reference data
npx playwright test   # e2e — real browser flows for all three tools
```

## Current state

See `HANDOVER.md` for the math/sourcing notes and `GOALS.md` for the full
build and deploy history.
