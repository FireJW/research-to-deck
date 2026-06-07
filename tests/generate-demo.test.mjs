import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import test from 'node:test';

test('demo generator writes a traceable run bundle', () => {
  execFileSync(process.execPath, ['scripts/generate-demo.mjs'], { stdio: 'pipe' });

  const contract = JSON.parse(fs.readFileSync('dist/demo/deck_contract.json', 'utf8'));
  const result = JSON.parse(fs.readFileSync('dist/demo/run_result.json', 'utf8'));
  const html = fs.readFileSync('dist/demo/index.html', 'utf8');
  const qc = fs.readFileSync('dist/demo/qc_report.md', 'utf8');

  assert.equal(contract.schema_version, 'deck_contract/v1');
  assert.equal(contract.title, 'Research-to-Deck Briefing');
  assert.equal(contract.source_refs[0].path, 'examples/research-brief.md');
  assert.ok(contract.slides.length >= 3);
  assert.equal(result.ok, true);
  assert.match(html, /Research-to-Deck Briefing/);
  assert.match(qc, /ready for human review/);
});
