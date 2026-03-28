const fs = require('fs');
const path = require('path');

const root = process.cwd();
const headPath = path.join(root, 'shell', 'head-open.html');
const bottomPath = path.join(root, 'shell', 'fixed-bottom.html');
const manifestPath = path.join(root, 'section-order.json');
const sectionsDir = path.join(root, 'sections');
const outPath = path.join(root, 'index.html');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/\uFEFF/g, '');
}

function ensureExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file: ${path.relative(root, filePath)}`);
  }
}

ensureExists(headPath);
ensureExists(bottomPath);
ensureExists(manifestPath);

const manifest = JSON.parse(read(manifestPath));
if (!Array.isArray(manifest.sections) || manifest.sections.length === 0) {
  throw new Error('section-order.json must include a non-empty "sections" array');
}

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function buildSectionAssetTags(files, folder, extension, tagBuilder) {
  return files
    .map((sectionFile) => {
      const baseName = path.parse(sectionFile).name;
      const assetFile = `${baseName}.${extension}`;
      const diskPath = path.join(root, folder, assetFile);
      if (!fs.existsSync(diskPath)) {
        return '';
      }

      const href = toPosix(path.join(folder, assetFile));
      return tagBuilder(href);
    })
    .filter(Boolean)
    .join('\n    ');
}

const sectionStyleTags = buildSectionAssetTags(
  manifest.sections,
  path.join('styles', 'sections'),
  'css',
  (href) => `<link rel="stylesheet" href="${href}">`
);

const sectionScriptTags = buildSectionAssetTags(
  manifest.sections,
  path.join('scripts', 'sections'),
  'js',
  (src) => `<script src="${src}"></script>`
);

const chunks = [];
const head = read(headPath)
  .replace('<!-- SECTION_STYLES -->', sectionStyleTags)
  .trimEnd();
chunks.push(head);

for (const sectionFile of manifest.sections) {
  const sectionPath = path.join(sectionsDir, sectionFile);
  ensureExists(sectionPath);
  chunks.push(read(sectionPath).trimEnd());
}

const bottom = read(bottomPath)
  .replace('<!-- SECTION_SCRIPTS -->', sectionScriptTags)
  .trimStart();
chunks.push(bottom);
const output = chunks.join('\n\n') + '\n';
fs.writeFileSync(outPath, output, 'utf8');
console.log(
  `Generated ${path.relative(root, outPath)} with ${manifest.sections.length} sections, ` +
  `${sectionStyleTags ? sectionStyleTags.split('\n').length : 0} section style file(s), and ` +
  `${sectionScriptTags ? sectionScriptTags.split('\n').length : 0} section script file(s).`
);
