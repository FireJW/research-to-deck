# Case Study: Research-to-Deck

## Summary

Research-to-Deck is a contract-first workflow for turning grounded Markdown research into reviewable presentation artifacts. It writes a deck contract, browser preview, QC report, and machine-readable run result.

## User

An AI product manager, strategy operator, or research lead who needs to turn source-grounded notes into a deck without losing traceability.

## Job To Be Done

When a research brief is ready, the user needs a fast way to create a deck preview while preserving the source trail, slide structure, review status, and output bundle.

## Product Decisions

### 1. Contract Before Rendering

The workflow creates `deck_contract.json` before rendering HTML. This keeps slide structure inspectable and testable.

### 2. Bundle Every Run

Each run writes `request.json`, `source_manifest.json`, `deck_contract.json`, `index.html`, `qc_report.md`, and `run_result.json`. A reviewer can see both the source and the generated artifact.

### 3. Keep Public Fixtures Synthetic

The public demo does not include private research notes, customer decks, local workspace paths, or account data.

### 4. QC As A Product Surface

The QC report is not a log dump. It names source count, slide count, render path, and review notes so a human can decide whether the run is acceptable.

## Workflow

```text
Grounded Markdown
  -> parse sections
  -> build slide objects
  -> validate deck contract
  -> render HTML preview
  -> write QC report
  -> write run result
```

## Outcome

The demo shows a practical AI PM pattern: make AI-generated content auditable before making it impressive. The renderer can improve over time, but the stable contract and bundle shape keep the product trustworthy.

## Interview Talk Track

I designed this as a trust layer for AI-generated decks. The main product decision is that generation does not end with an HTML file. A good run also needs the request, source manifest, deck contract, QC report, and result metadata. That gives reviewers enough context to decide whether the deck is grounded, complete, and safe to share.
