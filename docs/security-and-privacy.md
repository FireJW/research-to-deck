# Security And Privacy

The public demo is safe to publish because it uses synthetic input and generated output only.

## Do Not Publish

- private research notes
- client decks
- customer names
- local vault paths
- local machine paths
- API keys
- account sessions
- browser profiles
- generated artifacts from confidential source packages

## Safe To Publish

- synthetic Markdown briefs
- deck contract examples
- HTML previews generated from synthetic input
- QC report examples
- architecture notes
- public portfolio case study

## Review Checklist

Before publishing updates, run a redaction scan for:

```text
token
cookie
session
password
authorization
bearer
api key
local drive paths
private user names
customer names
```

Manual review is still required. Redaction scans help catch obvious leaks; they do not prove a file is safe.
