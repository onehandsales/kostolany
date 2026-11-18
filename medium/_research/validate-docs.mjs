import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const research = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(research);
await fs.writeFile(path.join(research, 'validation.json'), JSON.stringify({ passed: false, status: 'Validation in progress' }) + '\n', 'utf8');
const read = async p => new TextDecoder('utf-8', { fatal: true }).decode(await fs.readFile(p));
const catalog = JSON.parse(await read(path.join(research, 'catalog.json')));
const manifest = JSON.parse(await read(path.join(research, 'image-manifest.json')));
const profiles = JSON.parse(await read(path.join(research, 'flow-profiles.json')));
const sources = JSON.parse(await read(path.join(research, 'sources.json')));
const r2Audit = JSON.parse(await read(path.join(research, 'r2-image-review.json')));
const r2Profiles = JSON.parse(await read(path.join(research, 'r2-flow-review.json')));
const r2Mcp = JSON.parse(await read(path.join(research, 'r2-mcp-comparison.json')));
const r2Tree = JSON.parse(await read(path.join(research, 'r2-live-tree.json')));
const flowSource = JSON.parse(await read(path.join(research, 'flow-screens-source.json')));
const flowImages = JSON.parse(await read(path.join(research, 'flow-image-manifest.json')));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const walk = async (dir, directories = []) => {
  const result = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { directories.push(p); result.push(...await walk(p, directories)); }
    else result.push(p);
  }
  return result;
};
const flowDirectories = [];
const flowFiles = await walk(path.join(root, 'flows'), flowDirectories);
const actualDocs = flowFiles.filter(p => path.basename(p) === 'ANALYSIS.md');
check(actualDocs.length === 63, 'Expected exactly 63 ANALYSIS.md files');
const expectedFlowIds = catalog.flows.map(f => f.flowId).sort();
check(equal(flowSource.flows.map(f => f.flowId).sort(), expectedFlowIds), 'Flow image MCP source coverage mismatch');
check(equal(flowImages.flows.map(f => f.flowId).sort(), expectedFlowIds), 'Flow image manifest coverage mismatch');
check(flowSource.flowCount === 63 && flowSource.stepReferences === 273, 'Flow image MCP source totals mismatch');
check(flowImages.flowCount === 63 && flowImages.imageFiles === 273 && flowImages.uniqueScreenIds === 200, 'Flow image manifest totals mismatch');
check(flowImages.sourceCheckedAt === flowSource.checkedAt, 'Flow image source timestamp mismatch');
const originalById = new Map(manifest.map(s => [s.id, s]));
const sourceByFlow = new Map(flowSource.flows.map(f => [f.flowId, f]));
const imagesByFlow = new Map(flowImages.flows.map(f => [f.flowId, f]));
const retainedFilesById = new Map();
for (const flow of flowImages.flows) for (const image of flow.screens) {
  if (!retainedFilesById.has(image.screenId)) retainedFilesById.set(image.screenId, new Set());
  retainedFilesById.get(image.screenId).add('flows/' + flow.path + '/' + image.file);
}
const standaloneImageFiles = (await fs.readdir(path.join(root, 'screens')).catch(error => {
  if (error.code === 'ENOENT') return [];
  throw error;
})).filter(name => /\.png$/i.test(name)).length;
if (flowImages.storageMode === 'flow-folders') {
  check(standaloneImageFiles === 0, 'Duplicate standalone screens remain');
  for (const item of manifest) {
    check(retainedFilesById.get(item.id)?.has(item.file), 'Canonical image is not retained in its Flow: ' + item.id);
    check(item.originalFile === 'screens/' + item.id + '.png', 'Missing original image provenance: ' + item.id);
  }
}
const expectedFlowImageFiles = [], expectedFlowImageDirectories = [];
let flowImageFiles = 0, flowImageBytes = 0, flowImageFolders = 0;
const observations = [];
for (const p of await walk(path.join(research, 'observations'))) observations.push(...JSON.parse(await read(p)));
const notes = new Map(observations.map(n => [n.id, n]));
check(observations.length === 200 && notes.size === 200, 'Expected 200 unique observations');
check(profiles.length === 63 && new Set(profiles.map(p => p.name)).size === 63, 'Profile coverage mismatch');
check(r2Profiles.length === 63 && new Set(r2Profiles.map(p => p.name)).size === 63, 'R2 flow coverage mismatch');
check(JSON.stringify([...r2Audit.reviewedIndexes].sort((a,b) => a-b)) === JSON.stringify(Array.from({length:200}, (_,i) => i+1)), 'R2 image review coverage mismatch');
check(new Set(r2Audit.patches.map(p => p.index)).size === r2Audit.patches.length, 'Duplicate R2 corrections');
check(r2Mcp.flows === 63 && r2Mcp.stepReferences === 273 && r2Mcp.differences.length === 0, 'R2 MCP comparison failed');
check(r2Tree.matches && r2Tree.nodes === 63, 'R2 live tree comparison failed');
check(new Set(r2Mcp.appScreenIds).size === 200 && r2Mcp.unmatched.length === 0, 'R2 latest screen inventory mismatch');
for (const s of catalog.screens) check(r2Mcp.appScreenIds.includes(s.id), 'R2 app inventory missing: ' + s.id);
check(observations.every(n => n.r2ReviewedDate === '2026-11-18'), 'Missing per-screen R2 review');
const treeNodes = new Map();
const visit = (nodes, parentId = null) => {
  for (const n of nodes) {
    check(n.parentId === parentId, 'Tree parent mismatch: ' + n.name);
    check(!treeNodes.has(n.id), 'Duplicate tree ID: ' + n.id);
    treeNodes.set(n.id, n);
    visit(n.children, n.id);
  }
};
visit(catalog.tree.flows);
check(treeNodes.size === 63 && catalog.tree.flows.length === 6, 'Tree coverage mismatch');
let stepCount = 0, localLinks = 0, sourceLinks = 0;
for (const flow of catalog.flows) {
  const file = path.join(root, 'flows', flow.path, 'ANALYSIS.md');
  const doc = await read(file);
  const r2 = r2Profiles.find(p => p.name === flow.flowName);
  check(!!r2 && [r2.entry,r2.result,r2.unseen].every(text => doc.includes(text)), 'Missing R2 flow analysis: ' + flow.path);
  check(doc.includes('**R2 누락·내용 재검토 완료') && doc.includes('| R2 |'), 'Missing R2 status/history: ' + flow.path);
  const live = r2Mcp.flowsSnapshot.find(f => f.flowId === flow.flowId);
  check(JSON.stringify(live?.screens.map(s => s.id)) === JSON.stringify(flow.screens.map(s => s.id)), 'Live MCP order mismatch: ' + flow.path);
  check(doc.startsWith('# ' + flow.flowName + ' 플로우 분석\n'), 'Title mismatch: ' + flow.path);
  check(doc.includes(flow.flowId), 'Missing Flow ID: ' + flow.path);
  const sections = [...doc.matchAll(/^## (\d+)\. /gm)].map(m => Number(m[1]));
  check(JSON.stringify(sections) === '[1,2,3,4,5,6,7,8,9]', 'Section mismatch: ' + flow.path);
  const ids = [...doc.matchAll(/^- Screen ID: `(sc_[a-z0-9]+)`$/gm)].map(m => m[1]);
  check(JSON.stringify(ids) === JSON.stringify(flow.screens.map(s => s.id)), 'Step order mismatch: ' + flow.path);
  const stepTable = doc.split('## 3. 전체 단계표')[1].split('## 4. 화면별 상세 분석')[0];
  const tableIds = [...stepTable.matchAll(/\| \d+ \| \[`(sc_[a-z0-9]+)`\]/g)].map(m => m[1]);
  check(JSON.stringify(tableIds) === JSON.stringify(ids), 'Step table mismatch: ' + flow.path);
  const current = sourceByFlow.get(flow.flowId), placed = imagesByFlow.get(flow.flowId);
  check(current?.flowName === flow.flowName && equal(current?.screens.map(s => s.id), flow.screens.map(s => s.id)), 'Image placement MCP order/name mismatch: ' + flow.path);
  check(placed?.flowName === flow.flowName && placed?.path === flow.path && equal(placed?.screens.map(s => s.screenId), flow.screens.map(s => s.id)), 'Image placement manifest order/path mismatch: ' + flow.path);
  const expectedFiles = flow.screens.map((s, i) => `screens/${String(i + 1).padStart(2, '0')}_${s.id}.png`);
  const imageDirectory = path.join(path.dirname(file), 'screens');
  expectedFlowImageDirectories.push(imageDirectory);
  expectedFlowImageFiles.push(...expectedFiles.map(f => path.join(path.dirname(file), f)));
  const docImageLinks = [...doc.matchAll(/^- 로컬 이미지: \[([^\]]+)\]\(<([^>]+)>\)$/gm)];
  check(equal(docImageLinks.map(m => m[2]), expectedFiles), 'Flow-local detail image links/order mismatch: ' + flow.path);
  check(equal(docImageLinks.map(m => m[1]), expectedFiles.map(f => path.posix.basename(f))), 'Flow-local image link labels mismatch: ' + flow.path);
  check(equal([...stepTable.matchAll(/\]\(<(screens\/[^>]+\.png)>\)/g)].map(m => m[1]), expectedFiles), 'Step table image links/order mismatch: ' + flow.path);
  check(doc.includes('| 이미지 배치 |'), 'Missing image placement history: ' + flow.path);
  try {
    const stat = await fs.lstat(imageDirectory);
    check(stat.isDirectory() && !stat.isSymbolicLink(), 'Flow screens must be a regular directory: ' + flow.path);
    check(equal((await fs.readdir(imageDirectory)).sort(), expectedFiles.map(f => path.posix.basename(f)).sort()), 'Missing or extra flow image files: ' + flow.path);
    flowImageFolders++;
  } catch (error) { errors.push('Missing/unreadable flow image directory: ' + flow.path + ' (' + error.code + ')'); }
  for (const [i, screen] of flow.screens.entries()) {
    const fresh = current?.screens[i], image = placed?.screens[i], original = originalById.get(screen.id);
    check(fresh?.screenUrl === screen.screenUrl && fresh?.width === screen.width && fresh?.height === screen.height, 'Image placement MCP metadata mismatch: ' + screen.id);
    check(image?.step === i + 1 && image?.file === expectedFiles[i] && image?.sourceFile === original?.file && image?.sourceUrl === screen.screenUrl, 'Image placement mapping mismatch: ' + flow.path + ' step ' + (i + 1));
    if (flowImages.storageMode === 'flow-folders') check(image?.originalSourceFile === original?.originalFile, 'Original source provenance mismatch: ' + screen.id);
    check(!!original && image?.width === original.width && image?.height === original.height && image?.bytes === original.bytes && image?.sha256 === original.sha256, 'Image placement manifest metadata mismatch: ' + screen.id);
    const target = path.join(path.dirname(file), expectedFiles[i]);
    try {
      const stat = await fs.lstat(target);
      check(stat.isFile() && !stat.isSymbolicLink(), 'Flow image must be a regular file: ' + target);
      const data = await fs.readFile(target);
      check(data.length >= 24 && data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), 'Flow image is not PNG: ' + target);
      check(data.length >= 24 && data.readUInt32BE(16) === original?.width && data.readUInt32BE(20) === original?.height, 'Flow image dimensions mismatch: ' + target);
      check(data.length === original?.bytes && crypto.createHash('sha256').update(data).digest('hex') === original?.sha256, 'Flow image original SHA-256/size mismatch: ' + target);
      flowImageFiles++;
      flowImageBytes += data.length;
    } catch (error) { errors.push('Missing/unreadable flow image: ' + target + ' (' + error.code + ')'); }
  }
  check(treeNodes.get(flow.flowId)?.stepCount === ids.length, 'Tree step count mismatch: ' + flow.path);
  check(doc.includes(`**${ids.length}/${ids.length}단계**`), 'Review count mismatch: ' + flow.path);
  check(!/\uFFFD|TODO|TBD|\{\{/.test(doc), 'Encoding or placeholder problem: ' + flow.path);
  for (const s of flow.screens) {
    check(notes.has(s.id), 'Missing observation: ' + s.id);
    check(doc.includes(s.webUrl) && doc.includes(s.screenUrl), 'Missing source URLs: ' + s.id);
    check((notes.get(s.id)?.r2Notes || []).every(t => doc.includes(t)), 'R2 observation omitted: ' + s.id);
    const fresh = live?.screens.find(x => x.id === s.id);
    check(fresh?.screenUrl === s.screenUrl && fresh?.width === s.width && fresh?.height === s.height, 'Live image source metadata changed: ' + s.id);
  }
  stepCount += ids.length;
}
check(stepCount === 273, 'Expected 273 step references');
check(equal(flowFiles.filter(f => /\.png$/i.test(f)).sort(), expectedFlowImageFiles.sort()), 'Flow PNG inventory has missing or unexpected files');
check(equal(flowDirectories.filter(d => path.basename(d) === 'screens').sort(), expectedFlowImageDirectories.sort()), 'Flow screens directory inventory mismatch');
check(flowImageFolders === 63 && flowImageFiles === 273 && flowImageBytes === flowImages.imageBytes, 'Flow image file/directory/byte totals mismatch');
check(new Set(catalog.flows.flatMap(f => f.screens.map(s => s.id))).size === 200, 'Expected 200 unique step images');
const docs = [...actualDocs, path.join(root, 'README.md'), path.join(root, 'SOURCES.md'), path.join(root, 'REVIEW_R2.md')];
for (const file of docs) {
  const doc = await read(file);
  for (const match of doc.matchAll(/\[[^\]]*\]\((?:<([^>]+)>|([^\)]+))\)/g)) {
    const target = match[1] || match[2];
    if (/^https?:\/\//.test(target)) { sourceLinks++; continue; }
    const [relative, anchor] = target.split('#');
    const dest = path.resolve(path.dirname(file), decodeURIComponent(relative));
    check(dest === root || dest.startsWith(root + path.sep), 'Link escapes research root: ' + target);
    try {
      const stat = await fs.stat(dest);
      if (anchor && stat.isFile()) {
        const text = await read(dest);
        check(text.includes(`id="${anchor}"`), 'Broken local anchor: ' + target);
      }
    } catch { errors.push('Broken local link: ' + target + ' from ' + file); }
    localLinks++;
  }
}
check(manifest.length === 200, 'Expected 200 manifest entries');
let bytes = 0;
for (const item of manifest) {
  const data = await fs.readFile(path.join(root, item.file));
  check(data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), 'Not PNG: ' + item.id);
  check(data.readUInt32BE(16) === item.width && data.readUInt32BE(20) === item.height, 'Dimension mismatch: ' + item.id);
  check(data.length === item.bytes && crypto.createHash('sha256').update(data).digest('hex') === item.sha256, 'Image integrity mismatch: ' + item.id);
  bytes += data.length;
}
const result = { checkedDate: '2026-11-18', reviewRound:'R2 + flow image placement integrity review', checks: 'Document structure, flow tree, step order, source IDs, UTF-8, local links and anchors, PNG dimensions and SHA-256, R2 live inventory/order/source metadata comparison and review propagation; fresh MCP flow order/source comparison, exact per-flow file sets, regular files, ordered document image links, original/copy metadata and SHA-256 equality', flows: actualDocs.length, stepReferences: stepCount, uniqueImages: manifest.length, observations: notes.size, r2ReviewedImages:r2Audit.reviewedIndexes.length, r2CorrectedOrExpandedScreens:r2Audit.patches.length, r2FlowReviews:r2Profiles.length, officialSources: sources.length, localLinks, externalLinkReferences: sourceLinks, imageBytes: bytes, flowImageSourceCheckedAt: flowSource.checkedAt, flowImageFolders, flowImageFiles, flowImageBytes, errors, passed: errors.length === 0, scope: 'Static documentation and original/flow image integrity only; image placement does not add a visual content review; no live account or app behavior test' };
result.storageMode = flowImages.storageMode || 'standalone-originals';
result.standaloneImageFiles = standaloneImageFiles;
result.checks += '; current canonical Flow image paths and original path provenance, standalone duplicate removal';
await fs.writeFile(path.join(research, 'validation.json'), JSON.stringify(result, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
