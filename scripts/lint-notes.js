#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const notesDir = path.join(repoRoot, 'notes');

if (!fs.existsSync(notesDir)) {
  console.error('[notes lint] notes/ directory not found. Create notes/ before running the lint.');
  process.exit(1);
}

const entries = fs.readdirSync(notesDir);
const supported = entries.filter((entry) => entry.endsWith('.md'));
const skip = new Set(['README.md', 'template.md']);

const requiredFields = [
  { name: 'Date', regex: /\*\*Date:\*\*\s*\d{4}-\d{2}-\d{2}/i },
  { name: 'Scope', regex: /\*\*Scope:\*\*/i },
  { name: 'Findings', regex: /\*\*Findings:\*\*/i },
  { name: 'Next steps', regex: /\*\*Next\s+steps:\*\*/i },
];

const backlinkPattern = /mission[-\s]?control/i;

let hasError = false;
const warnings = [];
const noteFiles = supported.filter((name) => !skip.has(name));

if (noteFiles.length === 0) {
  console.error('[notes lint] No note files found in notes/.');
  process.exit(1);
}

for (const file of noteFiles) {
  const filePath = path.join(notesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const missing = [];

  for (const field of requiredFields) {
    if (!field.regex.test(content)) {
      missing.push(field.name);
    }
  }

  if (missing.length) {
    console.error(`[notes lint] ${file} is missing required sections: ${missing.join(', ')}`);
    hasError = true;
  }

  if (!backlinkPattern.test(content)) {
    warnings.push(file);
  }
}

if (warnings.length) {
  console.warn('[notes lint] Optional backlinks missing for the following notes:');
  for (const warning of warnings) {
    console.warn(`  - ${warning}`);
  }
}

if (hasError) {
  process.exit(1);
}

process.exit(0);
