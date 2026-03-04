# Research notes

This directory is the home for structured investigations that build on the quick sketches in `NOTES.md`. Every file here represents a single research entry with a date, scope, findings, and next steps so the story stays discoverable.

## Template-driven workflow
1. Copy `notes/template.md` (or rename it) and fill in the sections for your new topic.
2. Keep each file under `notes/` and use a descriptive slug so other agents can find it later.
3. Whenever you add or update a note, run the lint script below to confirm the required fields are present.

## Validation
```bash
node scripts/lint-notes.js
```

The script enforces `Date`, `Scope`, `Findings`, and `Next steps`, and it also highlights when a note is missing a mission-control backlink so you remember to connect the research to the right task.