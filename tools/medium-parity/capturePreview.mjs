import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const index = arg.indexOf('=');
  if (index < 3) throw new Error('Use --name=value');
  return [arg.slice(2, index), arg.slice(index + 1)];
}));
if (!args.browser) throw new Error('--browser=<existing Chromium executable> is required');
const origin = args.url ?? 'http://localhost:8081';
if (!['localhost', '127.0.0.1'].includes(new URL(origin).hostname)) throw new Error('Local preview only');
const output = resolve(root, args.out ?? 'TODO/evidence/parity-01/browser');
await mkdir(output, { recursive: true });
if ((await readdir(output)).length) throw new Error('Output directory must be empty; preserve earlier evidence and choose a new --out');
const scenarios = JSON.parse(await readFile(resolve(root, args.scenarios ?? 'tools/medium-parity/previewScenarios.json'), 'utf8'));
if (!Array.isArray(scenarios) || !scenarios.length || scenarios.some(s => !/^S\d{3}$/.test(s.id)) || new Set(scenarios.map(s => s.id)).size !== scenarios.length) throw new Error('Expected nonempty scenarios with unique screen IDs');
const run = { startedAt: new Date().toISOString(), finishedAt: null, status: 'running', requestedScreens: scenarios.map(s => s.id), consoleErrors: null };
const userData = await mkdtemp(join(tmpdir(), 'kostolany-parity-browser-'));
const browser = spawn(args.browser, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${userData}`, '--no-first-run', '--no-default-browser-check', '--disable-background-networking', 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
const endpoint = await new Promise((resolveEndpoint, reject) => {
  let outputText = '';
  const timer = setTimeout(() => { browser.kill(); reject(new Error('Chromium endpoint timeout')); }, 20000);
  browser.on('error', (error) => { clearTimeout(timer); reject(error); });
  browser.stderr.on('data', (data) => {
    outputText += data.toString();
    const match = /DevTools listening on (ws:\/\/[^\s]+)/.exec(outputText);
    if (match) { clearTimeout(timer); resolveEndpoint(match[1]); }
  });
});
const socket = new WebSocket(endpoint);
await new Promise((resolveOpen, reject) => { socket.onopen = resolveOpen; socket.onerror = reject; });
let serial = 0;
let session;
const pending = new Map();
const events = [];
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const request = pending.get(message.id);
    if (!request) return;
    clearTimeout(request.timer);
    pending.delete(message.id);
    if (message.error) request.reject(new Error(JSON.stringify(message.error)));
    else request.resolve(message.result);
  } else if (['Runtime.exceptionThrown', 'Log.entryAdded', 'Runtime.consoleAPICalled'].includes(message.method)) {
    events.push(message);
  }
};
function send(method, params = {}, sessionId = session) {
  const id = ++serial;
  return new Promise((resolveRequest, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 30000);
    pending.set(id, { resolve: resolveRequest, reject, timer });
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
const wait = (ms) => new Promise((resolveWait) => setTimeout(resolveWait, ms));
async function waitFor(expression) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await evaluate(expression)) return;
    await wait(500);
  }
  throw new Error(`DOM wait failed: ${expression}`);
}
async function click(label) {
  const point = await evaluate(`(() => {
    const label = ${JSON.stringify(label)};
    const elements = [...document.querySelectorAll('[aria-label],button,[role="button"],[role="tab"],[role="radio"]')];
    const element = elements.find((node) => (node.getAttribute('aria-label') === label || node.innerText === label) && node.getBoundingClientRect().width > 0 && !node.closest('[aria-hidden="true"]'));
    if (!element) return null;
    element.scrollIntoView({ block: 'nearest' });
    const rect = element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  })()`);
  if (!point) throw new Error(`Visible control missing: ${label}`);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
  await wait(800);
}
const captures = [];
async function writeCaptureLog() {
  await writeFile(join(output, 'captures.json'), JSON.stringify({ profile: 'CP-WEB-01', run, captures, events }, null, 2));
}
async function assertState(assertions = []) {
  // 글자 존재 여부와 선택 상태를 구분하고 화면 안에 보이는 조작 대상의 실제 속성을 검증한다.
  const actual = await evaluate(`(${JSON.stringify(assertions)}).map(expected => {
    const node = document.querySelector(expected.selector);
    const rect = node?.getBoundingClientRect();
    const visible = Boolean(rect && rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth && !node.closest('[aria-hidden="true"]'));
    return { selector: expected.selector, visible, text: node?.innerText ?? null, attributes: Object.fromEntries(Object.keys(expected.attributes ?? {}).map(key => [key, node?.getAttribute(key) ?? null])) };
  })`);
  assertions.forEach((expected, index) => {
    const value = actual[index];
    if (!value.visible || (expected.text !== undefined && value.text !== expected.text) || (expected.contains !== undefined && !value.text?.includes(expected.contains)) || Object.entries(expected.attributes ?? {}).some(([key, wanted]) => value.attributes[key] !== wanted)) {
      throw new Error(`State assertion failed: ${JSON.stringify({ expected, actual: value })}`);
    }
  });
  return actual;
}
async function capture(id, steps, assertions) {
  const snapshot = await evaluate(`({ text: document.body.innerText, labels: [...document.querySelectorAll('[aria-label]')].filter(n => n.getBoundingClientRect().width > 0 && !n.closest('[aria-hidden="true"]')).map(n => n.getAttribute('aria-label')), viewport: [innerWidth, innerHeight], dpr: devicePixelRatio, userAgent: navigator.userAgent, date: new Date().toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, fonts: [...new Set([...document.querySelectorAll('[role="heading"],p,input')].map(n => getComputedStyle(n).fontFamily))], scroll: [...document.querySelectorAll('*')].filter(n => n.scrollTop || n.scrollLeft).map(n => ({label:n.getAttribute('aria-label'), top:n.scrollTop, left:n.scrollLeft})) })`);
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  const bytes = Buffer.from(screenshot.data, 'base64');
  await writeFile(join(output, `${id}.png`), bytes);
  captures.push({ id, capturedAt: new Date().toISOString(), steps, assertions, snapshot, imageSha256: createHash('sha256').update(bytes).digest('hex'), status: 'current-web-capture; reference parity not passed' });
  await writeCaptureLog();
  console.log(JSON.stringify({ captured: id, labels: snapshot.labels.slice(-25) }));
}
try {
  const target = await send('Target.createTarget', { url: 'about:blank' }, null);
  session = (await send('Target.attachToTarget', { targetId: target.targetId, flatten: true }, null)).sessionId;
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setTimezoneOverride', { timezoneId: 'UTC' });
  await send('Emulation.setLocaleOverride', { locale: 'en-US' });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  // 비교 브라우저에서만 시계를 고정하고 저장소의 기본 공급부는 수정하지 않는다.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `const OriginalDate = Date; globalThis.Date = class extends OriginalDate { constructor(...args) { super(...(args.length ? args : ['2025-06-13T12:00:00.000Z'])); } static now() { return 1749816000000; } };` });
  for (const scenario of scenarios) {
    if (scenario.navigate !== undefined) {
      const destination = new URL(scenario.navigate, origin);
      if (destination.origin !== new URL(origin).origin) throw new Error('Scenario must stay in local preview');
      await send('Page.navigate', { url: destination.href });
      await waitFor('Boolean(document.querySelector("[role=tab]"))');
      await wait(1500);
    }
    for (const label of scenario.click ?? []) await click(label);
    if (scenario.waitText) await waitFor(`document.body.innerText.includes(${JSON.stringify(scenario.waitText)})`);
    await capture(scenario.id, scenario, await assertState(scenario.assert));
  }
  run.consoleErrors = events.filter(event => event.method === 'Runtime.exceptionThrown' || event.params?.type === 'error' || event.params?.entry?.level === 'error').length;
  if (run.consoleErrors) throw new Error(`Browser reported ${run.consoleErrors} runtime/console errors`);
  run.status = 'completed';
  run.finishedAt = new Date().toISOString();
  await writeCaptureLog();
} catch (error) {
  run.status = 'failed';
  run.finishedAt = new Date().toISOString();
  await writeCaptureLog();
  await writeFile(join(output, 'failure.json'), JSON.stringify({ message: String(error), events, text: await evaluate('document.body.innerText').catch(() => null) }, null, 2));
  throw error;
} finally {
  await send('Browser.close', {}, null).catch(() => browser.kill());
  socket.close();
}
