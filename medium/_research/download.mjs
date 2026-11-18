import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const catalog = JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'catalog.json'), 'utf8'));
const existing = new Map(JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'image-manifest.json'), 'utf8')).map(item => [item.id, item]));
const results = []; let cursor = 0;
async function worker() {
  while (cursor < catalog.screens.length) {
    const screen = catalog.screens[cursor++];
    const previous = existing.get(screen.id);
    const file = previous?.file || 'screens/' + screen.id + '.png';
    const target = path.join(root, file);
    try {
      if (!/^sc_[a-z0-9]+$/.test(screen.id) || new URL(screen.screenUrl).hostname !== 'storage.gummble.com') throw Error('Unexpected source');
      let bytes;
      try { bytes = await fs.readFile(target); } catch (e) {
        if (e.code !== 'ENOENT') throw e;
        const response = await fetch(screen.screenUrl, { signal: AbortSignal.timeout(45000) });
        if (!response.ok) throw Error('HTTP ' + response.status);
        bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.subarray(1,4).toString() !== 'PNG') throw Error('Expected PNG');
        await fs.mkdir(path.dirname(target), { recursive: true });
        await fs.writeFile(target, bytes, { flag: 'wx' });
      }
      results.push({ ...previous, id: screen.id, file, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
    } catch (e) { results.push({ id: screen.id, error: e.message }); }
    if (results.length % 25 === 0) console.log('Downloaded ' + results.length + '/' + catalog.screens.length);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
results.sort((a,b) => a.id.localeCompare(b.id));
await fs.writeFile(path.join(import.meta.dirname, 'image-manifest.json'), JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify({ total: results.length, failures: results.filter(r => r.error), bytes: results.reduce((n,r) => n + (r.bytes || 0), 0) }));
if (results.some(r => r.error)) process.exitCode = 1;
