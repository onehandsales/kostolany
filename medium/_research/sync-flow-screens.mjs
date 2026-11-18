import fs from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const research = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(research);
const flowRoot = path.join(root, 'flows');
const read = async name => JSON.parse(await fs.readFile(path.join(research, name), 'utf8'));
const catalog = await read('catalog.json');
const source = await read('flow-screens-source.json');
const originals = new Map((await read('image-manifest.json')).map(s => [s.id, s]));
const live = new Map(source.flows.map(f => [f.flowId, f]));
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
const inside = (base, target) => {
  const relative = path.relative(base, target);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw Error('Unexpected target: ' + target);
  return target;
};
const pending = [];
const manifestFlows = [];
if (source.flows.length !== catalog.flows.length || live.size !== catalog.flows.length) throw Error('Incomplete MCP flow inventory');

// Validate every source and destination before creating any flow-local files.
for (const flow of catalog.flows) {
  const actual = live.get(flow.flowId);
  if (!actual || actual.flowName !== flow.flowName || JSON.stringify(actual.screens.map(s => s.id)) !== JSON.stringify(flow.screens.map(s => s.id))) {
    throw Error('MCP flow order changed: ' + flow.path);
  }
  const dir = inside(flowRoot, path.resolve(flowRoot, flow.path));
  inside(await fs.realpath(flowRoot), await fs.realpath(dir));
  await fs.access(path.join(dir, 'ANALYSIS.md'));
  const screenDir = path.join(dir, 'screens');
  let existing = [];
  try {
    const stat = await fs.lstat(screenDir);
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw Error('Expected a regular screens directory: ' + screenDir);
    existing = await fs.readdir(screenDir);
  } catch (e) { if (e.code !== 'ENOENT') throw e; }
  const screens = [];
  for (let i = 0; i < flow.screens.length; i++) {
    const s = flow.screens[i], fresh = actual.screens[i], original = originals.get(s.id);
    if (!/^sc_[a-z0-9]+$/.test(s.id) || !original || fresh.screenUrl !== s.screenUrl || fresh.width !== s.width || fresh.height !== s.height) throw Error('Image source changed: ' + s.id);
    const from = inside(root, path.resolve(root, original.file));
    const bytes = await fs.readFile(from);
    if (hash(bytes) !== original.sha256 || bytes.length !== original.bytes || !bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || bytes.readUInt32BE(16) !== original.width || bytes.readUInt32BE(20) !== original.height) throw Error('Original image mismatch: ' + s.id);
    const filename = String(i + 1).padStart(2, '0') + '_' + s.id + '.png';
    const to = inside(screenDir, path.join(screenDir, filename));
    let exists = false;
    try {
      const stat = await fs.lstat(to);
      if (!stat.isFile() || stat.isSymbolicLink() || hash(await fs.readFile(to)) !== original.sha256) throw Error('Existing image differs; kept unchanged: ' + to);
      exists = true;
    } catch (e) { if (e.code !== 'ENOENT') throw e; }
    pending.push({from,to,exists});
    screens.push({step:i+1,screenId:s.id,file:'screens/'+filename,sourceFile:original.file,sourceUrl:s.screenUrl,width:original.width,height:original.height,bytes:original.bytes,sha256:original.sha256,...(original.originalFile ? {originalSourceFile:original.originalFile} : {})});
  }
  const names = new Set(screens.map(s => path.basename(s.file)));
  if (existing.some(name => !names.has(name))) throw Error('Unexpected files in screens; kept unchanged: ' + screenDir);
  manifestFlows.push({flowId:flow.flowId,flowName:flow.flowName,path:flow.path,screens});
}
let copied = 0;
for (const item of pending) {
  if (item.exists) continue;
  await fs.mkdir(path.dirname(item.to), {recursive:true});
  await fs.copyFile(item.from, item.to, constants.COPYFILE_EXCL);
  copied++;
}
const result = {
  checkedDate:source.checkedDate, sourceCheckedAt:source.checkedAt,
  method:'MCP flow screen order and source URLs re-queried; verified original PNGs copied as regular files without resizing',
  flows:manifestFlows, flowCount:manifestFlows.length, imageFiles:pending.length,
  uniqueScreenIds:new Set(manifestFlows.flatMap(f => f.screens.map(s => s.screenId))).size,
  imageBytes:manifestFlows.reduce((sum,f) => sum + f.screens.reduce((n,s) => n+s.bytes,0),0),
  storageMode:[...originals.values()].every(s => s.file.startsWith('flows/')) ? 'flow-folders' : 'standalone-originals'
};
await fs.writeFile(path.join(research, 'flow-image-manifest.json'), JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({flows:result.flowCount,images:result.imageFiles,uniqueImages:result.uniqueScreenIds,copied,reused:pending.length-copied,bytes:result.imageBytes}));
