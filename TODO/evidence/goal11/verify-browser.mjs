import { chromium } from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// 원본 캡처를 보정하지 않고 실제 브라우저 화면과 측정 결과를 기록한다.
const output = 'TODO/evidence/goal11';
const previewFile = 'FE/src/features/profile/data/profilePreview.ts';
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
    const controls = [...root.querySelectorAll('[role="button"],[role="tab"],input,textarea')].filter(el => {
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
async function editor() { await button('프로필 편집').click(); await nameInput().waitFor(); }
async function closed() { await page.getByRole('dialog').waitFor({ state: 'hidden' }); }
async function scaleText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[dir="auto"],input,textarea')) {
    const style = getComputedStyle(el); el.dataset.goal11Style = el.getAttribute('style') || '';
    el.style.fontSize = `${parseFloat(style.fontSize) * 2}px`; el.style.lineHeight = `${parseFloat(style.lineHeight) * 2}px`;
  } });
}
async function resetText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[data-goal11-style]')) {
    el.setAttribute('style', el.dataset.goal11Style); delete el.dataset.goal11Style;
  } });
}
try {
  await open(); await capture('guest-profile-mobile'); await login();
  await page.getByText('예시 독자 A · 로그인됨', { exact: true }).waitFor(); await capture('profile-empty-mobile');
  await editor(); assert.equal(await nameInput().inputValue(), '예시 독자 A');
  await capture('editor-mobile');
  await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === '이름 · 필수');
  for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement?.closest('[aria-modal="true"]')), true); }
  await nameInput().fill('취소할 초안'); await page.keyboard.press('Escape'); await closed();
  assert.equal(await button('프로필 편집').evaluate(el => el === document.activeElement), true);
  await editor(); assert.equal(await nameInput().inputValue(), '예시 독자 A');
  await button('프로필 편집 취소').click(); await closed();
  checks.push('초기 이름·빈 소개, 모달 이름 입력 포커스·Tab 가두기·Escape/취소·진입 버튼 복귀·초안 폐기');
  await editor(); await nameInput().fill('  '); await button('프로필 저장').click();
  await page.getByText('이름을 입력해 주세요.', { exact: true }).waitFor(); await capture('name-error-mobile');
  await nameInput().fill('가'.repeat(51)); await button('프로필 저장').click();
  await page.getByText('이름은 50자까지 입력할 수 있어요.', { exact: true }).waitFor();
  await nameInput().fill('한글😀'); await nameInput().press('Enter');
  assert.equal(await nameInput().inputValue(), '한글😀');
  assert.equal(await page.getByRole('dialog').count(), 1);
  await nameInput().dispatchEvent('compositionstart', { data: 'ㅎ' });
  await nameInput().fill('한글을 읽고 경제를 공부하는 새로운 독자');
  await nameInput().dispatchEvent('compositionend', { data: '독자' });
  const editedName = '한글을 읽고 경제를 공부하는 새로운 독자';
  const bio = '금리와 환율을 천천히 이해하고\n내 생활 속 경제를 꾸준히 기록합니다. 😀';
  await input('짧은 소개').fill(bio); await capture('editor-filled-mobile');
  await page.setViewportSize({ width: 320, height: 740 }); await capture('editor-narrow');
  await scaleText(); await button('프로필 편집 닫기').scrollIntoViewIfNeeded(); await capture('editor-large-text-top');
  await input('짧은 소개').scrollIntoViewIfNeeded(); await capture('editor-large-text-input');
  await button('프로필 편집 취소').scrollIntoViewIfNeeded(); await capture('editor-large-text-bottom');
  await resetText(); await page.setViewportSize({ width: 390, height: 844 });
  await button('프로필 저장').click(); await closed();
  await page.getByText(editedName + ' · 로그인됨', { exact: true }).waitFor(); await capture('profile-saved-mobile');
  await page.setViewportSize({ width: 320, height: 740 }); await scaleText(); await capture('profile-large-text');
  await resetText(); await page.setViewportSize({ width: 390, height: 844 });
  await button('로그아웃').click(); await page.getByText(new RegExp(editedName + '의 프로필')).waitFor(); await capture('logout-renamed-mobile');
  await button('로그아웃 취소').click();
  await tab('홈').click();
  const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
  const like = page.getByRole('button', { name: new RegExp(`^좋아요, ${title},`) });
  const bookmark = page.getByRole('button', { name: new RegExp(`^북마크, ${title},`) });
  await like.click(); await bookmark.click();
  await page.waitForFunction(title => [...document.querySelectorAll('[aria-label]')].some(el => el.getAttribute('aria-label')?.startsWith('북마크, ' + title + ',') && el.getAttribute('aria-pressed') === 'true' && el.getAttribute('aria-busy') === 'false'), title);
  await tab('라이브러리').click(); await button('새 목록').click(); await page.getByRole('textbox', { name: /^목록 이름/ }).fill('프로필 수정 뒤에도 남는 목록');
  await button('목록 만들기').click(); await closed();
  await tab('프로필').click(); await editor(); assert.equal(await nameInput().inputValue(), editedName);
  await input('짧은 소개').fill(''); await button('프로필 저장').click(); await closed();
  await page.getByText('아직 짧은 소개가 없어요.', { exact: true }).waitFor();
  await logout(); await login('예시 독자 B'); await page.getByText('예시 독자 B · 로그인됨', { exact: true }).waitFor();
  await capture('profile-user-b-mobile');
  assert.equal(await page.getByText(editedName, { exact: true }).count(), 0);
  await logout(); await login(); await page.getByText(editedName + ' · 로그인됨', { exact: true }).waitFor();
  await tab('홈').click(); assert.equal(await like.getAttribute('aria-pressed'), 'true'); assert.equal(await bookmark.getAttribute('aria-pressed'), 'true');
  await tab('라이브러리').click(); await button('프로필 수정 뒤에도 남는 목록 열기, 저장한 기사 0개').waitFor();
  await tab('프로필').click(); await capture('profile-a-return-mobile');
  await page.setViewportSize({ width: 1365, height: 900 }); await capture('profile-desktop');
  await editor(); await capture('editor-desktop'); await button('프로필 편집 닫기').click();
  checks.push('검증 오류·NFC 한글/이모지·명시적 제출·줄바꿈 소개 저장/삭제·작은 폭/큰 CSS 글자/스크롤·저장 후 이름 일치·A/B/A 데이터 격리·좋아요/읽기 목록/사용자 목록 유지');
  await page.reload(); await tab('프로필').click(); await button('모의 로그인 시작').waitFor(); await login(); await page.getByText('예시 독자 A · 로그인됨', { exact: true }).waitFor();
  checks.push('전체 새로고침 후 비로그인과 최초 fixture 이름으로 초기화');
  await open('read-error'); await login(); await button('프로필 조회 다시 시도').waitFor(); await capture('profile-read-error-mobile');
  await button('프로필 조회 다시 시도').click(); await button('프로필 편집').waitFor();
  checks.push('조회 실패와 재시도');
  await open('save-error'); await login(); await editor(); await nameInput().fill('실패해도 남는 이름');
  await input('짧은 소개').fill('실패 후에도 유지되는 소개'); await button('프로필 저장').click();
  await button('프로필 저장 다시 시도').waitFor(); assert.equal(await nameInput().inputValue(), '실패해도 남는 이름');
  await capture('profile-save-error-mobile'); await nameInput().fill('고쳐서 다시 저장');
  await button('프로필 저장 다시 시도').click(); await closed(); await page.getByText('고쳐서 다시 저장 · 로그인됨', { exact: true }).waitFor();
  await capture('profile-retry-saved-mobile'); checks.push('저장 실패 초안 보존과 수정 후 재시도');
  await open('slow'); await login(); await capture('profile-loading-mobile'); await button('프로필 편집').waitFor();
  await editor(); await nameInput().fill('느린 저장 첫 이름'); await button('프로필 저장').click(); await capture('profile-saving-mobile');
  await nameInput().fill('느린 저장 마지막 이름'); await button('프로필 저장').click();
  await button('프로필 편집 닫기').click(); await closed(); await editor(); await nameInput().fill('새 편집의 미제출 초안');
  await page.waitForTimeout(8500); assert.equal(await nameInput().inputValue(), '새 편집의 미제출 초안');
  await button('프로필 편집 닫기').click(); await closed(); await page.getByText('느린 저장 마지막 이름 · 로그인됨', { exact: true }).waitFor();
  await capture('profile-latest-save-mobile'); checks.push('저장 중 추가 제출 직렬 처리·닫은 뒤 저장 계속·재진입 초안 보존·마지막 제출 이름 반영');
  assert.deepEqual(errors, []); assert.deepEqual(externalRequests, []);
  await writeFile(`${output}/browser-results.json`, JSON.stringify({ browser: await browser.version(), url: 'http://localhost:8081', date: new Date().toISOString(), checks, errors, externalRequests, measurements,
    limitations: ['CSS 2배는 OS 글자 확대 아님', '합성 composition 이벤트는 실제 OS 한글 IME 아님', '실제 키보드·Safe Area·VoiceOver/TalkBack·native 뒤로 가기 미검증'] }, null, 2));
  console.log(JSON.stringify({ checks: checks.length, screenshots: measurements.length, errors, externalRequests }));
} finally { await writeFile(previewFile, original); await browser.close(); }
