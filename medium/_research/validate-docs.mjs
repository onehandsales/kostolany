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
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const walk = async dir => {
  const result = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    result.push(...(entry.isDirectory() ? await walk(p) : [p]));
  }
  return result;
};
const actualDocs = (await walk(path.join(root, 'flows'))).filter(p => path.basename(p) === 'ANALYSIS.md');
check(actualDocs.length === 63, 'Expected exactly 63 ANALYSIS.md files');
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
const result = { checkedDate: '2026-11-18', reviewRound:'R2', checks: 'Document structure, flow tree, step order, source IDs, UTF-8, local links and anchors, PNG dimensions and SHA-256, R2 live inventory/order/source metadata comparison and review propagation', flows: actualDocs.length, stepReferences: stepCount, uniqueImages: manifest.length, observations: notes.size, r2ReviewedImages:r2Audit.reviewedIndexes.length, r2CorrectedOrExpandedScreens:r2Audit.patches.length, r2FlowReviews:r2Profiles.length, officialSources: sources.length, localLinks, externalLinkReferences: sourceLinks, imageBytes: bytes, errors, passed: errors.length === 0, scope: 'Static documentation and original image integrity only; no live account or app behavior test' };
await fs.writeFile(path.join(research, 'validation.json'), JSON.stringify(result, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
