# Research-to-Deck Briefing

## Why It Matters

- Strategy decks lose trust when reviewers cannot trace the source.
- HTML and PPTX outputs drift when each renderer invents its own structure.
- A deck generator should leave behind a reviewable run bundle.

## Product Shape

The workflow converts grounded Markdown into a deck contract before rendering. The contract is the durable layer: it records title, source references, slide headlines, and structured slide items.

## Review Gate

- Check that every output points back to the source manifest.
- Check that the contract has a non-empty title and slides.
- Check that the HTML preview renders the same slide count as the contract.
- Check that the QC report names the output paths.

## Next Step

Use the same contract to add richer layouts, visual QA, and optional PPTX export without changing the source brief.
