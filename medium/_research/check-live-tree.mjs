import fs from 'node:fs/promises';
const dir = new URL('./', import.meta.url);
const html = await fs.readFile(new URL('r2-app-page.html', dir), 'utf8');
const chunks = [...html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)].map(m => JSON.parse(m[1])).join('');
const offset = chunks.indexOf('"flows":[');
if (offset < 0) throw Error('No flow tree in page');
const start = offset + '"flows":'.length;
let depth = 0, quoted = false, escaped = false, end;
for (let i = start; i < chunks.length; i++) {
  const c = chunks[i];
  if (quoted) { if (escaped) escaped = false; else if (c === '\\') escaped = true; else if (c === '"') quoted = false; }
  else if (c === '"') quoted = true;
  else if (c === '[') depth++;
  else if (c === ']' && --depth === 0) { end = i + 1; break; }
}
const tree = JSON.parse(chunks.slice(start, end));
const catalog = JSON.parse(await fs.readFile(new URL('catalog.json', dir), 'utf8'));
const flat = nodes => nodes.flatMap(n => [{id:n.id, name:n.name, parentId:n.parentId, stepCount:n.stepCount}, ...flat(n.children)]);
const live = flat(tree), saved = flat(catalog.tree.flows);
const result = {checkedDate:'2026-11-18', url:'https://gummble.com/apps/medium-ios?tab=flows', roots:tree.length, nodes:live.length, matches:JSON.stringify(live)===JSON.stringify(saved), tree};
await fs.writeFile(new URL('r2-live-tree.json', dir), JSON.stringify(result, null, 2)+'\n');
console.log(JSON.stringify({roots:result.roots,nodes:result.nodes,matches:result.matches}));
if (!result.matches) process.exitCode = 1;
