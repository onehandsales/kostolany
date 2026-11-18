import { chromium } from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// 원본 캡처를 보정하지 않고 실제 브라우저 화면과 측정 결과를 기록한다.
const output = 'TODO/evidence/goal13';
const previewFile = 'FE/src/features/settings/data/settingsPreview.ts';
const original = await readFile(previewFile, 'utf8');
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const checks = [], measurements = [], errors = [], externalRequests = [];
let page;
const button = name => page.getByRole('button', { name, exact: true });
const tab = name => page.getByRole('tab', { name, exact: true });
const input = name => page.getByRole('textbox', { name, exact: true });
const nameInput = () => input('이름 · 필수');
async function open(scenario = 'normal') {
  if (page) await page.close();
  await writeFile(previewFile, original.replace("= 'normal';", `= '${scenario}';`));
  page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  page.setDefaultTimeout(10000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => {
    if (/^https?:/.test(request.url()) && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(request.url())) externalRequests.push(request.url());
  });
  await page.waitForTimeout(800);
  await page.goto('http://localhost:8081');
}

async function login(account = '예시 독자 A') {
  await button('모의 로그인 시작').click();
  await page.getByRole('radio', { name: account, exact: true }).click();
  await button('Google로 로그인 (모의)').click();
  await button('로그아웃').waitFor();
}
async function logout() {
  await button('로그아웃').click(); await button('로그아웃 확인').click(); await button('모의 로그인 시작').waitFor();
}
async function capture(name) {
  await page.waitForTimeout(400);
  const measurement = await page.evaluate(() => {
    const dialog = document.querySelector('[aria-modal="true"]');
    const root = dialog || document;
    const controls = [...root.querySelectorAll('[role="button"],[role="tab"],[role="radio"],input,textarea')].filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && !el.closest('[aria-hidden="true"]') && rect.top >= 0 && rect.bottom <= innerHeight + 1;
    }).map(el => { const rect = el.getBoundingClientRect(); return { label: el.getAttribute('aria-label') || el.textContent, width: rect.width, height: rect.height }; });
    return { viewport: { width: innerWidth, height: innerHeight }, overflow: document.documentElement.scrollWidth > innerWidth,
      dialogOverflow: dialog ? dialog.scrollWidth > dialog.clientWidth : false, controls };
  });
  assert.equal(measurement.overflow, false, name + ' document overflow');
  assert.equal(measurement.dialogOverflow, false, name + ' modal overflow');
  for (const c of measurement.controls) assert.ok(c.width >= 47.5 && c.height >= 47.5, `${name}: ${c.label} ${c.width}×${c.height}`);
  await page.screenshot({ path: `${output}/${name}.png` }); measurements.push({ name, ...measurement });
}
async function settings() { await button('설정 열기').click(); }
async function editor() { await button('기본 설명 수준 변경').click(); await page.getByRole('radiogroup', { name: '기본 설명 수준 선택', exact: true }).waitFor(); }
const level = name => page.getByRole('radio', { name: name + ' 기본 수준', exact: true });
async function selected(name) { assert.equal(await level(name).getAttribute('aria-checked'), 'true'); }
async function current(name) { await page.getByText('현재 기본값 · ' + name, { exact: true }).waitFor(); }
async function closed() { await page.locator('[aria-modal="true"]').waitFor({ state: 'hidden' }); }
async function escape() { await page.getByRole('dialog').waitFor(); await page.keyboard.press('Escape'); }
async function scaleText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[dir="auto"],input,textarea')) {
    const style = getComputedStyle(el); el.dataset.goal13Style = el.getAttribute('style') || '';
    el.style.fontSize = `${parseFloat(style.fontSize) * 2}px`; el.style.lineHeight = `${parseFloat(style.lineHeight) * 2}px`;
  } });
}
async function resetText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[data-goal13-style]')) {
    el.setAttribute('style', el.dataset.goal13Style); delete el.dataset.goal13Style;
  } });
}

const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const article = () => page.getByRole('button', { name: new RegExp(`^${title}`) });
const like = () => page.getByRole('button', { name: new RegExp(`^좋아요, ${title},`) });
const bookmark = () => page.getByRole('button', { name: new RegExp(`^북마크, ${title},`) });
const heading = name => page.getByRole('heading', { name, exact: true });
const layoutChecks = [];
async function homeLayout(name) {
  const rectangles = await article().evaluate(el => {
    const body = el.children[1], text = body.children[0], thumbnail = body.querySelector('svg');
    return { textBottom: text.getBoundingClientRect().bottom, thumbnailTop: thumbnail.getBoundingClientRect().top };
  });
  assert.ok(rectangles.thumbnailTop >= rectangles.textBottom, `${name}: 제목/요약과 썸네일 겹침`);
  const tabs = await tab('최신').evaluate(el => {
    const viewport = el.closest('[role="tablist"]');
    return { targetHeight: el.getBoundingClientRect().height, viewportHeight: viewport.getBoundingClientRect().height };
  });
  assert.ok(tabs.viewportHeight >= tabs.targetHeight && tabs.targetHeight >= 48, `${name}: 정렬 탭 잘림`);
  layoutChecks.push({ name, ...rectangles, ...tabs });
}
async function saved(control, value) {
  await page.waitForFunction(({ prefix, value }) => [...document.querySelectorAll('[aria-label]')].some(el =>
    !el.closest('[aria-hidden="true"]') && el.getAttribute('aria-label')?.startsWith(prefix) &&
    el.getAttribute('aria-pressed') === String(value) && el.getAttribute('aria-busy') !== 'true'),
  { prefix: `${control}, ${title},`, value });
}
async function targets(names) {
  await button(`저장할 목록 선택, ${title}`).click();
  for (const name of names) await page.getByRole('checkbox', { name, exact: true }).click();
  await capture('save-targets'); await button('저장할 목록 적용').click(); await closed();
}
async function createList(name) {
  await button('새 목록').click(); await input('목록 이름 · 필수').fill(name);
  await capture('list-create'); await button('목록 만들기').click(); await closed();
  await button(`${name} 열기, 저장한 기사 0개`).waitFor();
}
async function read(levelName, backLabel, screenshot) {
  await article().click(); await heading(`${levelName} 수준 설명`).waitFor();
  assert.equal(await page.getByRole('radio', { name: levelName, exact: true }).getAttribute('aria-checked'), 'true');
  if (screenshot) { await heading(`${levelName} 수준 설명`).scrollIntoViewIfNeeded(); await capture(screenshot); }
  await page.getByRole('radio', { name: '고등학생', exact: true }).click();
  await heading('고등학생 수준 설명').waitFor(); await button(backLabel).click();
}

async function composition(field, value) {
  await field.focus(); await field.dispatchEvent('compositionstart', { data: '' });
  await field.fill(value); await field.dispatchEvent('compositionupdate', { data: value });
  await field.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 229, isComposing: true, bubbles: true });
  assert.equal(await field.inputValue(), value);
  await field.dispatchEvent('compositionend', { data: value });
}
async function focusTrap() {
  await page.getByRole('dialog').waitFor();
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => Boolean(document.activeElement?.closest('[aria-modal="true"]'))), true);
  }
}
try {
  await open(); await page.setViewportSize({ width: 320, height: 740 });
  await tab('프로필').click(); await button('모의 로그인 시작').click();
  await scaleText(); await capture('login-large-text-top');
  await button('Google로 로그인 (모의)').scrollIntoViewIfNeeded(); await capture('login-large-text-bottom');
  await resetText(); await button('Google로 로그인 (모의)').click(); await closed();
  await button('프로필 편집').click(); await page.getByRole('dialog').waitFor(); await composition(nameInput(), '조합 중인 한글 이름');
  assert.equal(await page.getByRole('dialog').count(), 1);
  await composition(input('짧은 소개'), '한글을 길게 입력한 소개입니다.\n줄바꿈과 가족 이모지 👨‍👩‍👧‍👦를 확인해요.');
  await focusTrap(); await nameInput().scrollIntoViewIfNeeded(); await scaleText(); await capture('profile-large-text-top');
  await button('프로필 편집 취소').scrollIntoViewIfNeeded(); await capture('profile-large-text-bottom');
  await resetText(); await escape(); await closed();
  assert.equal(await button('프로필 편집').evaluate(el => el === document.activeElement), true);
  await settings(); await editor(); await focusTrap(); await level('중학생').click();
  await scaleText(); await capture('settings-editor-large-text-top');
  await button('기본 설명 수준 취소').scrollIntoViewIfNeeded(); await capture('settings-editor-large-text-bottom');
  await resetText(); await escape(); await closed(); await current('성인');
  await button('로그아웃').click(); await scaleText(); await capture('logout-large-text-top');
  await button('로그아웃 취소').scrollIntoViewIfNeeded(); await capture('logout-large-text-bottom'); await resetText();
  await button('로그아웃 취소').click(); await closed();
  checks.push('320px 로그인·프로필·설정·로그아웃 CSS 2배·스크롤·Tab 가두기·Escape·프로필 진입 포커스 복귀');

  await tab('라이브러리').click(); await button('새 목록').click(); await page.getByRole('dialog').waitFor();
  await composition(input('목록 이름 · 필수'), '한글 목록 이름');
  await focusTrap(); assert.equal(await page.getByRole('dialog').count(), 1);
  await escape(); await closed(); assert.equal(await button('한글 목록 이름 열기, 저장한 기사 0개').count(), 0);
  await tab('탐색').click(); await button('기사 검색 열기').click(); await composition(input('기사 검색어'), '금리');
  await article().waitFor(); await scaleText(); await capture('search-large-text'); await resetText();
  assert.equal(await input('기사 검색어').inputValue(), '금리'); await article().click(); await heading('성인 수준 설명').waitFor();
  await page.getByRole('radio', { name: '중학생', exact: true }).click(); await heading('중학생 수준 설명').waitFor();
  await page.getByText('금리는 돈을 맡기거나 빌리는 약속에서 확인하는 조건이에요. 예시의 안내는 새 상품에 관한 것이므로 기존 계약도 같은 날 바뀐다고 볼 수는 없어요. 발표 내용과 개인에게 적용되는 조건을 구분해요.', { exact: true }).waitFor();
  await page.getByText('학교 매점이 다음 주부터 새 할인 카드를 만든다고 가정해요. 기존 카드에도 할인이 생기는지는 별도의 안내가 필요해요. 새 상품 소식과 내 계약의 변화도 구분해 보는 예시예요.', { exact: true }).waitFor();
  await heading('중학생 수준 설명').scrollIntoViewIfNeeded(); await scaleText(); await capture('article-large-text'); await resetText();
  await button('탐색으로 돌아가기').click();
  await button(`저장할 목록 선택, ${title}`).click(); await focusTrap(); await scaleText(); await capture('save-targets-large-text');
  await resetText(); await escape(); await closed();
  checks.push('이름·소개·목록·검색 합성 composition/Enter 값 보존·자동 저장 없음·검색/기사/저장 시트 큰 글자·중학생 제목/본문/예시 일치');
  assert.deepEqual(errors, []); assert.deepEqual(externalRequests, []);
  await writeFile(`${output}/accessibility-results.json`, JSON.stringify({ date: new Date().toISOString(), browser: await browser.version(), checks, measurements, errors, externalRequests,
    limitations: ['CSS 글자 2배는 실제 OS 글자 확대 검증이 아님', '합성 composition/Enter는 실제 한글 IME 입력·조합/후보창/키보드 검증이 아님', 'Safe Area·키보드 가림·VoiceOver/TalkBack·하드웨어 뒤로 가기·제스처는 네이티브 미검증'] }, null, 2));
  console.log(JSON.stringify({ checks: checks.length, screenshots: measurements.length, errors, externalRequests }));
} catch (error) {
  await page?.screenshot({ path: `${output}/accessibility-diagnostic.png` }); console.error(String(error)); throw error;
} finally { await writeFile(previewFile, original); await browser.close(); }
