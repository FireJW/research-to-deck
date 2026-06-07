import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const sourcePath = path.join(root, 'examples', 'research-brief.md');
const outDir = path.join(root, 'dist', 'demo');

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const readSource = () => {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source file: ${path.relative(root, sourcePath)}`);
  }
  const markdown = fs.readFileSync(sourcePath, 'utf8').trim();
  if (!markdown) throw new Error('Source brief is empty');
  return markdown;
};

const parseMarkdown = (markdown) => {
  const lines = markdown.split(/\r?\n/);
  const titleLine = lines.find((line) => line.startsWith('# '));
  if (!titleLine) throw new Error('Source brief must start with an H1 title');

  const title = titleLine.replace(/^#\s+/, '').trim();
  const slides = [];
  let current = null;

  for (const line of lines.slice(1)) {
    if (line.startsWith('## ')) {
      if (current) slides.push(current);
      current = {
        id: `slide-${slides.length + 1}`,
        headline: line.replace(/^##\s+/, '').trim(),
        items: []
      };
      continue;
    }

    if (!current || !line.trim()) continue;

    if (line.startsWith('- ')) {
      const point = line.replace(/^-\s+/, '').trim();
      const last = current.items[current.items.length - 1];
      if (last?.kind === 'bullets') {
        last.points.push(point);
      } else {
        current.items.push({ kind: 'bullets', points: [point] });
      }
      continue;
    }

    current.items.push({ kind: 'paragraph', text: line.trim() });
  }

  if (current) slides.push(current);
  if (slides.length === 0) throw new Error('Source brief must include at least one H2 section');

  return { title, slides };
};

const buildContract = ({ title, slides }) => ({
  schema_version: 'deck_contract/v1',
  title,
  source_refs: [
    {
      id: 'primary',
      path: 'examples/research-brief.md'
    }
  ],
  slides
});

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const renderItems = (items) =>
  items
    .map((item) => {
      if (item.kind === 'bullets') {
        return `<ul>${item.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}</ul>`;
      }
      return `<p>${escapeHtml(item.text)}</p>`;
    })
    .join('\n');

const renderHtml = (contract) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(contract.title)}</title>
  <style>
    :root { color-scheme: light; font-family: Georgia, "Times New Roman", serif; }
    body { margin: 0; background: #f6f4ef; color: #1f2933; }
    main { max-width: 980px; margin: 0 auto; padding: 48px 20px 72px; }
    header { border-bottom: 2px solid #1f2933; margin-bottom: 28px; padding-bottom: 18px; }
    h1 { font-size: clamp(2rem, 4vw, 4rem); line-height: 1; margin: 0 0 12px; }
    .meta { color: #52606d; font-size: 0.95rem; }
    section { background: #ffffff; border: 1px solid #d9d2c3; margin: 18px 0; padding: 24px; border-radius: 8px; }
    h2 { margin: 0 0 12px; font-size: 1.35rem; }
    p, li { font-size: 1rem; line-height: 1.65; }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>${escapeHtml(contract.title)}</h1>
      <div class="meta">${contract.slides.length} slides generated from ${escapeHtml(contract.source_refs[0].path)}</div>
    </header>
    ${contract.slides
      .map(
        (slide) => `<section id="${escapeHtml(slide.id)}">
      <h2>${escapeHtml(slide.headline)}</h2>
      ${renderItems(slide.items)}
    </section>`
      )
      .join('\n')}
  </main>
</body>
</html>
`;

const writeJson = (filePath, value) => {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
};

const main = () => {
  const markdown = readSource();
  const parsed = parseMarkdown(markdown);
  const contract = buildContract(parsed);
  ensureDir(outDir);

  const request = {
    command: 'npm run generate',
    source: 'examples/research-brief.md',
    output: 'html',
    profile: 'briefing'
  };
  const sourceManifest = {
    schema_version: 'source_manifest/v1',
    primary: {
      id: 'primary',
      path: 'examples/research-brief.md',
      bytes: Buffer.byteLength(markdown, 'utf8')
    }
  };
  const qcReport = [
    '# QC Report',
    '',
    `Source: \`${sourceManifest.primary.path}\``,
    `Slides: \`${contract.slides.length}\``,
    'Contract: `deck_contract.json`',
    'HTML preview: `index.html`',
    '',
    'Result: ready for human review'
  ].join('\n');
  const runResult = {
    ok: true,
    outputs: {
      request: 'dist/demo/request.json',
      source_manifest: 'dist/demo/source_manifest.json',
      deck_contract: 'dist/demo/deck_contract.json',
      html: 'dist/demo/index.html',
      qc_report: 'dist/demo/qc_report.md'
    },
    slide_count: contract.slides.length
  };

  writeJson(path.join(outDir, 'request.json'), request);
  writeJson(path.join(outDir, 'source_manifest.json'), sourceManifest);
  writeJson(path.join(outDir, 'deck_contract.json'), contract);
  fs.writeFileSync(path.join(outDir, 'index.html'), renderHtml(contract));
  fs.writeFileSync(path.join(outDir, 'qc_report.md'), `${qcReport}\n`);
  writeJson(path.join(outDir, 'run_result.json'), runResult);

  console.log(JSON.stringify(runResult, null, 2));
};

main();
