import { chromium } from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [], externalRequests = [], checks = [], measurements = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('request', request => {
  if (/^https?:/.test(request.url()) && !/^https?:\/\/(localhost|127\.0\.0\.1)/.test(request.url())) externalRequests.push(request.url());
});
const title = '금리가 오르면 예금과 대출에는 어떤 일이 생길까';
const listName = '금리와 환율을 함께 읽으며 생활 속 경제 변화를 이해하는 나의 공부 목록';
const button = name => page.getByRole('button', { name, exact: true });
const tab = name => page.getByRole('tab', { name, exact: true });
const radio = name => page.getByRole('radio', { name, exact: true });
const bookmark = () => page.getByRole('button', { name: new RegExp(`^북마크, ${title},`) });
const like = () => page.getByRole('button', { name: new RegExp(`^좋아요, ${title},`) });
const article = () => page.getByRole('button', { name: new RegExp(`^${title}`) });
async function signedState(saved, liked) {
  await page.waitForFunction(({ title, saved, liked }) => {
    const visible = el => el.getBoundingClientRect().width > 0 && !el.closest('[aria-hidden="true"]');
    const find = prefix => [...document.querySelectorAll('[aria-label]')].find(el => visible(el) && el.getAttribute('aria-label').startsWith(prefix + ', ' + title + ','));
    const save = find('북마크'), like = find('좋아요');
    return save?.getAttribute('aria-pressed') === String(saved) && like?.getAttribute('aria-pressed') === String(liked)
      && save?.getAttribute('aria-busy') === 'false' && like?.getAttribute('aria-busy') === 'false';
  }, { title, saved, liked });
}
async function capture(name) {
  await page.waitForTimeout(350);
  const measurement = await page.evaluate(() => {
    const dialog = document.querySelector('[aria-modal="true"]');
    const root = dialog || document;
    const controls = [...root.querySelectorAll('[role="button"],[role="radio"],[role="checkbox"],input')].filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && !el.closest('[aria-hidden="true"]') && rect.top >= 0 && rect.bottom <= innerHeight + 1;
    }).map(el => { const rect = el.getBoundingClientRect(); return { label: el.getAttribute('aria-label') || el.textContent, width: rect.width, height: rect.height }; });
    return { viewport: { width: innerWidth, height: innerHeight }, overflow: document.documentElement.scrollWidth > innerWidth,
      dialogOverflow: dialog ? dialog.scrollWidth > dialog.clientWidth : false, controls };
  });
  assert.equal(measurement.overflow, false, name + ' document overflow');
  assert.equal(measurement.dialogOverflow, false, name + ' dialog overflow');
  for (const control of measurement.controls) assert.ok(control.width >= 47.5 && control.height >= 47.5, `${name}: ${control.label} ${control.width}×${control.height}`);
  await page.screenshot({ path: `TODO/evidence/goal10/${name}.png` }); measurements.push({ name, ...measurement });
}
async function mode(name) { await button('모의 동작 선택 열기').click(); await radio('모의 결과: ' + name).click(); }
async function login(name = '예시 독자 A') {
  await button('모의 로그인 시작').click(); await radio(name).click(); await button('Google로 로그인 (모의)').click();
  await page.getByText(name + ' · 로그인됨', { exact: true }).waitFor();
  await page.waitForFunction(() => document.activeElement?.getAttribute('role') === 'heading');
}
async function logout() {
  await tab('프로필').click(); await button('로그아웃').click(); await button('로그아웃 확인').click();
  await button('모의 로그인 시작').waitFor();
}
async function scaleText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[dir="auto"]')) {
    const style = getComputedStyle(el); el.dataset.goal10Style = el.getAttribute('style') || '';
    el.style.fontSize = `${parseFloat(style.fontSize) * 2}px`; el.style.lineHeight = `${parseFloat(style.lineHeight) * 2}px`;
  } });
}
async function resetText() {
  await page.evaluate(() => { for (const el of document.querySelectorAll('[data-goal10-style]')) {
    el.setAttribute('style', el.dataset.goal10Style); delete el.dataset.goal10Style;
  } });
}
try {
  await page.goto('http://localhost:8081'); await bookmark().waitFor(); await capture('guest-home-mobile');
  await tab('프로필').click(); await capture('guest-profile-mobile');
  await button('모의 로그인 시작').click(); await capture('login-mobile');
  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => !!document.activeElement?.closest('[aria-modal="true"]')), true);
  }
  await page.keyboard.press('Escape'); await button('모의 로그인 시작').waitFor();
  assert.equal(await button('모의 로그인 시작').evaluate(el => el === document.activeElement), true);
  checks.push('로그인 모달 Tab 포커스 가두기·Escape 닫기·진입 버튼 포커스 복귀');
  await tab('탐색').click(); await button('기사 검색 열기').click(); await page.getByRole('textbox', { name: '기사 검색어' }).fill('금리');
  await article().click(); await page.getByRole('heading', { name: title, exact: true }).waitFor();
  await bookmark().click(); await mode('사용자 취소'); await button('Google로 로그인 (모의)').click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' }); assert.match(await bookmark().getAttribute('aria-label'), /로그인 필요/);
  assert.equal(await page.getByRole('alert').count(), 0);
  await bookmark().click(); await mode('실패'); await button('Google로 로그인 (모의)').click();
  await button('로그인 다시 시도').waitFor(); await capture('login-error-mobile');
  await page.setViewportSize({ width: 320, height: 740 }); await capture('login-error-narrow');
  await scaleText(); await button('로그인 닫기').scrollIntoViewIfNeeded(); await capture('login-large-text-top');
  await button('로그인 다시 시도').scrollIntoViewIfNeeded(); await capture('login-large-text-bottom');
  await resetText(); await page.setViewportSize({ width: 390, height: 844 }); await button('로그인 다시 시도').click();
  await page.getByRole('dialog').waitFor({ state: 'hidden' }); await signedState(false, false); await capture('article-login-return-mobile');
  assert.equal(await page.getByRole('heading', { name: title, exact: true }).evaluate(el => el === document.activeElement), true);
  await bookmark().click(); await like().click(); await signedState(true, true);
  await button('탐색으로 돌아가기').click(); assert.equal(await page.getByRole('textbox', { name: '기사 검색어' }).inputValue(), '금리');
  checks.push('검색→기사→모의 취소/실패/재시도→동일 기사·검색어 복귀, 성공 후 현재 제목 포커스, 자동 저장/좋아요 없음, 직접 한 번 눌러 저장/선택');
  await tab('라이브러리').click(); await button('새 목록').click(); await page.getByRole('textbox', { name: /^목록 이름/ }).fill(listName);
  await button('목록 만들기').click(); await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await tab('홈').click(); await signedState(true, true); await button('저장할 목록 선택, ' + title).click();
  await page.getByRole('checkbox', { name: listName, exact: true }).click(); await button('저장할 목록 적용').click(); await signedState(true, true);
  await tab('라이브러리').click(); await button(listName + ' 열기, 저장한 기사 1개').click();
  await article().click(); await page.getByRole('heading', { name: title, exact: true }).waitFor();
  await button('저장 목록으로 돌아가기').click(); await page.getByRole('heading', { name: listName, exact: true }).waitFor();
  await capture('user-a-list-mobile');
  checks.push('A 목록 생성·기사 추가·목록→기사→원래 목록 복귀, 홈·검색·상세 공유 상태');
  await tab('프로필').click(); await button('로그아웃').click(); await capture('logout-confirm-mobile');
  await button('로그아웃 취소').click(); await button('로그아웃').click(); await mode('실패'); await button('로그아웃 확인').click();
  await button('로그아웃 다시 시도').waitFor(); await capture('logout-error-mobile');
  await page.setViewportSize({ width: 320, height: 740 }); await scaleText(); await capture('logout-large-text-top');
  await button('로그아웃 다시 시도').scrollIntoViewIfNeeded(); await capture('logout-large-text-bottom');
  await resetText(); await page.setViewportSize({ width: 390, height: 844 }); await button('로그아웃 다시 시도').click();
  await button('모의 로그인 시작').waitFor(); await login('예시 독자 B'); await capture('user-b-profile-mobile');
  await tab('홈').click(); await signedState(false, false); await tab('라이브러리').click();
  await button('읽기 목록 열기, 저장한 기사 0개').waitFor(); assert.equal(await page.getByText(listName, { exact: true }).count(), 0);
  await capture('user-b-library-mobile'); await logout(); await login();
  await tab('홈').click(); await signedState(true, true); await tab('라이브러리').click();
  await button(listName + ' 열기, 저장한 기사 1개').waitFor(); await capture('user-a-library-restored-mobile');
  checks.push('로그아웃 취소·실패 유지·재시도, B에는 A 좋아요/저장/목록 없음, A 재로그인 데이터 복원·개인 상세 초기화');
  await tab('프로필').click(); await button('로그아웃').click(); await mode('느린 성공 (4초)'); await button('로그아웃 확인').click();
  await capture('logout-pending-mobile'); await button('로그아웃 취소').click(); await page.waitForTimeout(4300);
  await page.getByText('예시 독자 A · 로그인됨', { exact: true }).waitFor(); await logout();
  await button('모의 로그인 시작').click(); await mode('느린 성공 (4초)'); await button('Google로 로그인 (모의)').click();
  await capture('login-pending-mobile'); await page.keyboard.press('Escape'); await button('모의 로그인 시작').waitFor();
  await login('예시 독자 B'); await page.waitForTimeout(4300); await page.getByText('예시 독자 B · 로그인됨', { exact: true }).waitFor();
  checks.push('처리 중 로그아웃 취소 후 늦은 성공 무시, 느린 A 로그인 취소→B 로그인 후 늦은 A 성공 무시');
  await logout(); await page.setViewportSize({ width: 1365, height: 900 }); await button('모의 로그인 시작').click();
  await capture('login-desktop'); await button('로그인 닫기').click(); await login(); await capture('account-desktop');
  await page.reload(); await tab('프로필').click(); await button('모의 로그인 시작').waitFor(); await login();
  await tab('홈').click(); await signedState(false, false); await tab('라이브러리').click();
  await button('읽기 목록 열기, 저장한 기사 0개').waitFor(); assert.equal(await page.getByText(listName, { exact: true }).count(), 0);
  checks.push('새로고침 뒤 비로그인·A 개인 데이터 초기화, 데스크톱 8081 미리보기 유지');
  assert.deepEqual(errors, []); assert.deepEqual(externalRequests, []);
  await writeFile('TODO/evidence/goal10/browser-results.json', JSON.stringify({ browser: await browser.version(), checks, errors, externalRequests, measurements }, null, 2));
  process.stdout.write(JSON.stringify({ checks, captures: measurements.length, errors, externalRequests }) + '\n');
} catch (error) {
  await page.screenshot({ path: 'FE/.cache/goal10-browser-failure.png' });
  process.stderr.write(await page.locator('body').innerText()); throw error;
} finally { await browser.close(); }
