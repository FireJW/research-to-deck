# Architecture

Research-to-Deck is intentionally small, but it mirrors a larger deck generation architecture.

## Components

| Component | Responsibility | Demo file |
| --- | --- | --- |
| Source loader | Reads a grounded Markdown brief | `scripts/generate-demo.mjs` |
| Section parser | Splits headings, paragraphs, and lists | `scripts/generate-demo.mjs` |
| Contract builder | Creates `deck_contract/v1` | `dist/demo/deck_contract.json` |
| HTML renderer | Renders a simple browser preview | `dist/demo/index.html` |
| QC writer | Writes a human-readable review report | `dist/demo/qc_report.md` |
| Run result writer | Writes machine-readable output metadata | `dist/demo/run_result.json` |

## Contract Shape

```text
deck_contract/v1
  title
  source_refs[]
  slides[]
    id
    headline
    items[]
      paragraph | bullets
```

## Extension Points

- Add PPTX export behind the same contract.
- Add visual QA over generated HTML.
- Add source package adapters for reports, notes, and article bundles.
- Add evaluation cases for slide count, heading quality, and source coverage.
- Add theme hints without changing the source format.

## Why Contract-First

Rendering is only one output. The durable product layer is the contract because it can be inspected, tested, rendered multiple ways, and compared across runs.
