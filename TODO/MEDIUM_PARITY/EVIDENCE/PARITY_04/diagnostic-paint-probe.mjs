import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
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
if (!Array.isArray(scenarios) || !scenarios.length || scenarios.some(s => !/^(S\d{3}|Q12-[a-z0-9-]+)$/.test(s.id)) || new Set(scenarios.map(s => s.id)).size !== scenarios.length) throw new Error('Expected nonempty scenarios with unique screen IDs');
const viewport = (args.viewport ?? '390x844').split('x').map(Number);
if (viewport.length !== 2 || viewport.some(n => !Number.isInteger(n) || n < 240 || n > 1920)) throw new Error('Invalid --viewport=widthxheight');
const textScale = Number(args['text-scale'] ?? 1);
if (![1, 2].includes(textScale)) throw new Error('Supported diagnostic text scales: 1, 2');
const run = { startedAt: new Date().toISOString(), finishedAt: null, status: 'running', requestedScreens: scenarios.map(s => s.id), consoleErrors: null, viewport, textScale, textScaleMethod: 'CSS diagnostic only; RN/OS fontScale unchanged' };
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
  // 스크롤에 따른 헤더 숨김과 레이아웃 변경이 끝난 뒤 실제 클릭 좌표를 읽는다.
  await evaluate(`(() => { const label = ${JSON.stringify(label)}; const node = [...document.querySelectorAll('[aria-label],button,[role="button"],[role="tab"],[role="radio"]')].find(n => (n.getAttribute('aria-label') === label || n.innerText === label) && n.getBoundingClientRect().width > 0 && !n.closest('[aria-hidden="true"]')); node?.scrollIntoView({block:'center'}); })()`);
  await wait(300);
  const point = await evaluate(`(() => {
    const label = ${JSON.stringify(label)};
    const elements = [...document.querySelectorAll('[aria-label],button,[role="button"],[role="tab"],[role="radio"]')];
    const element = elements.find((node) => (node.getAttribute('aria-label') === label || node.innerText === label) && node.getBoundingClientRect().width > 0 && !node.closest('[aria-hidden="true"]'));
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
    if (!element.contains(document.elementFromPoint(x, y))) return null;
    return { x, y };
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
    return { selector: expected.selector, visible, text: node?.innerText ?? null, value: node?.value ?? null, scrollTop: node?.scrollTop ?? null, fontSize: node ? parseFloat(getComputedStyle(node).fontSize) : null, width: rect?.width ?? 0, height: rect?.height ?? 0, inside: Boolean(rect && rect.x >= 0 && rect.y >= 0 && rect.right <= innerWidth + 1 && rect.bottom <= innerHeight + 1), attributes: Object.fromEntries(Object.keys(expected.attributes ?? {}).map(key => [key, node?.getAttribute(key) ?? null])) };
  })`);
  assertions.forEach((expected, index) => {
    const value = actual[index];
    if ((expected.value !== undefined && expected.value !== value.value) || (expected.scrollTop !== undefined && (value.scrollTop === null || Math.abs(expected.scrollTop - value.scrollTop) > 1))) {
      throw new Error(`Input/scroll assertion failed: ${JSON.stringify({ expected, actual: value })}`);
    }
    if ((!expected.geometryOnly && (expected.visible ?? true) !== value.visible) || (expected.inside && !value.inside) || value.width < (expected.minWidth ?? 0) || value.height < (expected.minHeight ?? 0) || (expected.baseFontSize && value.fontSize !== expected.baseFontSize * textScale) || (expected.aspectRatio && (!value.height || Math.abs(value.width / value.height - expected.aspectRatio) > 0.01)) || (expected.text !== undefined && value.text !== expected.text) || (expected.contains !== undefined && !value.text?.includes(expected.contains)) || Object.entries(expected.attributes ?? {}).some(([key, wanted]) => value.attributes[key] !== wanted)) {
      throw new Error(`State assertion failed: ${JSON.stringify({ expected, actual: value })}`);
    }
  });
  return actual;
}
async function capture(id, steps, assertions) {
  const snapshot = await evaluate(`({ text: document.body.innerText, labels: [...document.querySelectorAll('[aria-label]')].filter(n => n.getBoundingClientRect().width > 0 && !n.closest('[aria-hidden="true"]')).map(n => n.getAttribute('aria-label')), viewport: [innerWidth, innerHeight], dpr: devicePixelRatio, userAgent: navigator.userAgent, date: new Date().toISOString(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, fonts: [...new Set([...document.querySelectorAll('[role="heading"],p,input')].map(n => getComputedStyle(n).fontFamily))], scroll: [...document.querySelectorAll('*')].filter(n => n.scrollTop || n.scrollLeft).map(n => ({label:n.getAttribute('aria-label'), top:n.scrollTop, left:n.scrollLeft})) })`);
  snapshot.focus = await evaluate(`({label: document.activeElement?.getAttribute('aria-label'), text: document.activeElement?.innerText?.slice(0, 120)})`);
  snapshot.inputs = await evaluate(`[...document.querySelectorAll('input,textarea')].map(n => ({label:n.getAttribute('aria-label'),value:n.value,start:n.selectionStart,end:n.selectionEnd}))`);
  snapshot.layout = await evaluate(`(${JSON.stringify(steps.measure ?? ['[role="heading"]', '[aria-label="기사 본문"]', '[aria-label="글자 크기"]', '[aria-label="타인 하이라이트 표시"]', '[role="img"]'])}).flatMap(selector => [...document.querySelectorAll(selector)].map(node => { const rect = node.getBoundingClientRect(); const css = getComputedStyle(node); return { selector, label: node.getAttribute('aria-label'), text: node.innerText?.slice(0, 100), x:rect.x, y:rect.y, width:rect.width, height:rect.height, clientWidth:node.clientWidth, scrollWidth:node.scrollWidth, scrollHeight:node.scrollHeight, scrollTop:node.scrollTop, overflowY:css.overflowY, fontFamily:css.fontFamily, fontSize:css.fontSize, lineHeight:css.lineHeight, background:css.backgroundColor }; }))`);
  await send('DOM.getDocument');
  snapshot.resolvedFonts = [];
  for (const selector of ['[role="heading"]', '[aria-label="글자 크기"]']) {
    const { result } = await send('Runtime.evaluate', { expression: `[...document.querySelectorAll(${JSON.stringify(selector)})].find(n => { const r = n.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight && !n.closest('[aria-hidden="true"]'); })` });
    if (result.objectId) {
      const { nodeId } = await send('DOM.requestNode', { objectId: result.objectId });
      snapshot.resolvedFonts.push({ selector, ...(await send('CSS.getPlatformFontsForNode', { nodeId })) });
      await send('Runtime.releaseObject', { objectId: result.objectId });
    }
  }
  snapshot.paintProbe = await evaluate(`(() => { const n = document.querySelector('[aria-label="Reading history stories"]'); const h = [...document.querySelectorAll('[role="heading"]')].find(x => x.textContent==='Refine recommendations'); return {list:n?.outerHTML.slice(0,1600), header:h?.getBoundingClientRect().toJSON(), hit: document.elementFromPoint(100,80)?.outerHTML.slice(0,1200), parents:n ? [...(function*(n){while(n){yield n;n=n.parentElement;}})(n)].map(x=>({tag:x.tagName,style:x.getAttribute('style'),rect:x.getBoundingClientRect().toJSON(),overflow:getComputedStyle(x).overflowY})):[]}; })()`);
  const screenshot = await send('Page.captureScreenshot' , { format: 'png', captureBeyondViewport: false });
  const bytes = Buffer.from(screenshot.data, 'base64');
  await writeFile(join(output, `${id}.png`), bytes);
  captures.push({ id, capturedAt: new Date().toISOString(), steps, assertions, snapshot, imageSha256: createHash('sha256').update(bytes).digest('hex'), status: 'current-web-capture; reference parity not passed' });
  await writeCaptureLog();
  console.log(JSON.stringify({ captured: id, assertions: assertions.length }));
}
try {
  const target = await send('Target.createTarget', { url: 'about:blank' }, null);
  session = (await send('Target.attachToTarget', { targetId: target.targetId, flatten: true }, null)).sessionId;
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('DOM.enable');
  await send('CSS.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: viewport[0], height: viewport[1], deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setTimezoneOverride', { timezoneId: 'UTC' });
  await send('Emulation.setLocaleOverride', { locale: 'en-US' });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  // 비교 브라우저에서만 시계를 고정하고 저장소의 기본 공급부는 수정하지 않는다.
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `const OriginalDate = Date; globalThis.Date = class extends OriginalDate { constructor(...args) { super(...(args.length ? args : ['2025-06-13T12:00:00.000Z'])); } static now() { return 1749816000000; } };` });
  if (textScale !== 1) {
    // CSS 글자 확대는 OS 접근성 검증과 구분하며 비교 브라우저에만 적용한다.
    await send('Page.addScriptToEvaluateOnNewDocument', { source: `addEventListener('DOMContentLoaded', () => {
      const scaled = new WeakSet();
      const scale = () => { const changes = [...document.querySelectorAll('div,span,p,input,textarea,button,h1,h2,h3,h4,h5,h6,label,a,li')].filter(n => !scaled.has(n) && (n.matches('input,textarea') || [...n.childNodes].some(c => c.nodeType === 3 && c.textContent.trim()))).map(n => { const css = getComputedStyle(n); return [n, parseFloat(css.fontSize), parseFloat(css.lineHeight)]; }); for (const [n, size, height] of changes) { scaled.add(n); n.style.setProperty('font-size', size * ${textScale} + 'px', 'important'); if (Number.isFinite(height)) n.style.setProperty('line-height', height * ${textScale} + 'px', 'important'); } };
      new MutationObserver(scale).observe(document.body, { childList: true, subtree: true }); scale();
    });` });
  }
  for (const scenario of scenarios) {
    if (scenario.navigate !== undefined) {
      const destination = new URL(scenario.navigate, origin);
      if (destination.origin !== new URL(origin).origin) throw new Error('Scenario must stay in local preview');
      await send('Page.navigate', { url: destination.href });
      await waitFor('Boolean(document.querySelector("[role=tab]"))');
      await wait(1500);
    }
    for (const label of scenario.click ?? []) await click(label);
    for (const input of scenario.input ?? []) {
      await click(input.label);
      await send('Input.insertText', { text: input.text });
      await wait(800);
    }
    for (const key of scenario.keys ?? []) {
      const virtualKey = { Escape: 27, Tab: 9, Enter: 13 }[key];
      if (!virtualKey) throw new Error('Unsupported diagnostic key');
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key, windowsVirtualKeyCode: virtualKey });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key, windowsVirtualKeyCode: virtualKey });
      await wait(300);
    }
    if (scenario.scroll) {
      // RN Web의 ref가 덮어쓴 scrollTo 대신 DOM 위치를 설정해 실제 스크롤 결과를 검증한다.
      await evaluate(`(() => { const node = document.querySelector(${JSON.stringify(scenario.scroll.selector)}); if (node) node.scrollTop = ${Number(scenario.scroll.top)}; })()`);
      await wait(300);
    }
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
