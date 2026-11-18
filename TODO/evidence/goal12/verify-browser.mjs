import { chromium } from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// 원본 캡처를 보정하지 않고 실제 브라우저 화면과 측정 결과를 기록한다.
const output = 'TODO/evidence/goal12';
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
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => {
    if (/^https?:/.test(request.url()) && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(request.url())) externalRequests.push(request.url());
  });
  await page.waitForTimeout(800);
  await page.goto('http://localhost:8081');
  await tab('프로필').click();
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
async function closed() { await page.getByRole('dialog').waitFor({ state: 'hidden' }); }
async function scaleText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[dir="auto"],input,textarea')) {
    const style = getComputedStyle(el); el.dataset.goal12Style = el.getAttribute('style') || '';
    el.style.fontSize = `${parseFloat(style.fontSize) * 2}px`; el.style.lineHeight = `${parseFloat(style.lineHeight) * 2}px`;
  } });
}
async function resetText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[data-goal12-style]')) {
    el.setAttribute('style', el.dataset.goal12Style); delete el.dataset.goal12Style;
  } });
}
try {
  await open(); await capture('guest-profile'); await login();
  await page.getByText('예시 독자 A · 로그인됨', { exact: true }).waitFor(); await capture('profile-settings-entry');
  await settings(); await current('성인'); await capture('settings-mobile');
  await editor(); await selected('성인'); await capture('level-editor-mobile');
  for (let i = 0; i < 9; i++) { await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement?.closest('[aria-modal="true"]')), true); }
  await level('중학생').click(); await page.keyboard.press('Escape'); await closed();
  assert.equal(await button('기본 설명 수준 변경').evaluate(el => el === document.activeElement), true);
  await editor(); await selected('성인'); await button('기본 설명 수준 취소').click(); await closed();
  await editor(); await button('기본 수준 저장').click(); await closed(); await current('성인');
  checks.push('최초 성인·변경 없는 저장·취소·Escape·Tab 포커스 가두기·진입 버튼 포커스 복귀');
  await editor(); await level('중학생').click();
  await page.setViewportSize({ width: 320, height: 740 }); await capture('level-editor-narrow');
  await scaleText(); await capture('level-editor-large-text-top');
  await button('기본 설명 수준 취소').scrollIntoViewIfNeeded(); await capture('level-editor-large-text-bottom');
  await resetText(); await page.setViewportSize({ width: 390, height: 844 });
  await button('기본 수준 저장').click(); await closed(); await current('중학생'); await capture('settings-saved-mobile');
  await page.setViewportSize({ width: 320, height: 740 }); await scaleText(); await capture('settings-large-text');
  await resetText(); await page.setViewportSize({ width: 390, height: 844 });
  await button('프로필로 돌아가기').click(); await button('프로필 편집').click();
  await nameInput().fill('경제 뉴스를 천천히 읽고 이해하는 한글 이름의 독자'); await button('프로필 저장').click(); await closed();
  await button('설정 열기').click(); await current('중학생');
  await button('로그아웃').click(); await capture('logout-confirm-mobile');
  await button('로그아웃 취소').click(); await closed(); await current('중학생');
  checks.push('작은 폭·긴 한글·CSS 2배 글자·스크롤·이름 수정 후 설정 유지·설정 로그아웃 취소');
  await tab('홈').click();
  const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
  const article = () => page.getByRole('button', { name: new RegExp(`^${title}`) });
  const like = page.getByRole('button', { name: new RegExp(`^좋아요, ${title},`) });
  const bookmark = page.getByRole('button', { name: new RegExp(`^북마크, ${title},`) });
  await like.click(); await bookmark.click();
  await page.waitForFunction(title => [...document.querySelectorAll('[aria-label]')].some(el => el.getAttribute('aria-label')?.startsWith('북마크, ' + title + ',') && el.getAttribute('aria-pressed') === 'true' && el.getAttribute('aria-busy') === 'false'), title);
  async function readArticle(backLabel) {
    await article().click();
    const choice = page.getByRole('radio', { name: '중학생', exact: true });
    await choice.waitFor(); assert.equal(await choice.getAttribute('aria-checked'), 'true');
    await page.getByText('끝까지 읽었습니다.', { exact: true }).waitFor();
    await page.getByRole('heading', { name: '중학생 수준 설명', exact: true }).scrollIntoViewIfNeeded();
    await capture('article-middle-' + backLabel);
    await page.getByRole('radio', { name: '고등학생', exact: true }).click();
    await page.getByRole('heading', { name: '고등학생 수준 설명', exact: true }).waitFor();
    await button(backLabel).click();
  }
  await readArticle('홈으로 돌아가기');
  await readArticle('홈으로 돌아가기');
  await tab('탐색').click(); await button('기사 검색 열기').click(); await input('기사 검색어').fill('금리');
  await readArticle('탐색으로 돌아가기'); assert.equal(await input('기사 검색어').inputValue(), '금리');
  await tab('라이브러리').click(); await button('읽기 목록 열기, 저장한 기사 1개').click();
  await readArticle('읽기 목록으로 돌아가기');
  await tab('프로필').click(); await current('중학생');
  checks.push('기본값 저장→홈·동일 기사 재진입·검색·읽기 목록→중학생 선택/제목/예시·임시 수준 변경은 설정에 미반영·목록/검색 복귀');
  await page.setViewportSize({ width: 1365, height: 900 }); await capture('settings-desktop'); await editor(); await capture('level-editor-desktop');
  await button('기본 설명 수준 닫기').click(); await closed(); await page.setViewportSize({ width: 390, height: 844 });
  await button('로그아웃').click(); await button('모의 동작 선택 열기').click();
  await page.getByRole('radio', { name: '모의 결과: 실패', exact: true }).click(); await button('로그아웃 확인').click();
  await button('로그아웃 다시 시도').waitFor(); await capture('logout-error-mobile');
  await button('로그아웃 다시 시도').click(); await button('모의 로그인 시작').waitFor();
  await login('예시 독자 B'); await settings(); await current('성인'); await capture('settings-user-b');
  await editor(); await level('초등학생').click(); await button('기본 수준 저장').click(); await closed(); await current('초등학생');
  await logout(); await login(); await settings(); await current('중학생'); await capture('settings-a-return');
  await tab('홈').click(); assert.equal(await like.getAttribute('aria-pressed'), 'true'); assert.equal(await bookmark.getAttribute('aria-pressed'), 'true');
  checks.push('로그아웃 실패·재시도·개인 설정 화면 제거·A/B/A 설정 분리와 좋아요/저장 유지');
  await page.reload(); await tab('프로필').click(); await login(); await settings(); await current('성인');
  checks.push('전체 새로고침으로 인증과 기본 설정 초기화');
  await open('read-error'); await login(); await settings(); await button('설정 조회 다시 시도').waitFor(); await capture('settings-read-error');
  await button('설정 조회 다시 시도').click(); await current('성인'); checks.push('설정 조회 실패·재시도');
  await open('save-error'); await login(); await settings(); await current('성인'); await editor();
  await level('초등학생').click(); await button('기본 수준 저장').click(); await button('기본 수준 저장 다시 시도').waitFor();
  await selected('초등학생'); await capture('settings-save-error');
  await level('중학생').click(); await button('기본 수준 저장 다시 시도').click(); await closed(); await current('중학생');
  await capture('settings-retry-saved'); checks.push('저장 실패 선택 보존·수정 후 재시도');
  await open('slow'); await login(); await settings(); await capture('settings-loading'); await current('성인');
  await editor(); await level('초등학생').click(); await button('기본 수준 저장').click(); await capture('settings-saving');
  await level('중학생').click(); await button('기본 수준 저장').click(); await button('기본 설명 수준 닫기').click(); await closed();
  await editor(); await level('고등학생').click(); await page.waitForTimeout(8500); await selected('고등학생');
  await button('기본 설명 수준 닫기').click(); await closed(); await current('중학생'); await capture('settings-latest-submission');
  checks.push('저장 중 마지막 제출·닫아도 제출 처리·새 편집 미제출 선택 보존');
  assert.deepEqual(errors, []); assert.deepEqual(externalRequests, []);
  await writeFile(`${output}/browser-results.json`, JSON.stringify({ browser: await browser.version(), url: 'http://localhost:8081', date: new Date().toISOString(), checks, errors, externalRequests, measurements,
    limitations: ['CSS 2배는 OS 글자 확대 아님', 'Safe Area·VoiceOver/TalkBack·native 뒤로 가기/제스처 미검증', '수준 선택은 키보드 입력 폼이 아니며 native 접근성은 별도 검증 필요'] }, null, 2));
  console.log(JSON.stringify({ checks: checks.length, screenshots: measurements.length, errors, externalRequests }));
} finally { await writeFile(previewFile, original); await browser.close(); }
