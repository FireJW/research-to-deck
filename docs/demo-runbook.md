# Demo Runbook

## Goal

Show a complete research-to-deck run without using private material.

## Steps

1. Open `examples/research-brief.md`.
2. Run `npm test`.
3. Run `npm run generate`.
4. Open `dist/demo/deck_contract.json`.
5. Open `dist/demo/index.html`.
6. Open `dist/demo/qc_report.md`.
7. Open `dist/demo/run_result.json`.

## Demo Script

```text
This workflow starts from a grounded Markdown brief.
It does not jump directly to a pretty slide.
It first creates a deck contract, then renders HTML, then writes QC and run metadata.
That means a reviewer can inspect the source, the contract, the output, and the checks from the same run bundle.
```

## What To Point Out

- `source_manifest.json` preserves the source reference.
- `deck_contract.json` keeps slide structure independent from rendering.
- `index.html` is a preview, not the source of truth.
- `qc_report.md` gives a reviewer a concise status surface.
- `run_result.json` makes the run scriptable.

## What Not To Demo

- Private research notes.
- Customer decks.
- Local workspace paths.
- API keys or model outputs from private runs.
- Screenshots containing private tabs or accounts.
