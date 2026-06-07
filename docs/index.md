# Research-to-Deck

Research-to-Deck is a public-safe portfolio demo for turning grounded research notes into a traceable presentation bundle.

## The Product Idea

Most AI deck demos optimize for a pretty slide. This one optimizes for product trust:

- What source generated the deck?
- What contract did the renderer receive?
- What output files were written?
- What checks did the run perform?
- Can a human review the result without guessing?

## Demo Flow

```text
Markdown brief
  -> source_manifest.json
  -> deck_contract.json
  -> index.html
  -> qc_report.md
  -> run_result.json
```

## Why It Matters

Research and strategy work often crosses teams. A deck generator that cannot explain its source trail becomes risky quickly. The contract-first approach keeps content, rendering, and QC separated so the workflow can be tested, reviewed, and extended.

## Public Demo

Run:

```bash
npm test
npm run generate
```

Then open `dist/demo/index.html`.

## Best Entry Points

- [README](../README.md)
- [Case study](case-study.md)
- [Architecture](architecture.md)
- [Demo runbook](demo-runbook.md)
- [Security and privacy](security-and-privacy.md)
