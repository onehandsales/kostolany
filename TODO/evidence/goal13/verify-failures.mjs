import { chromium } from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// 원본 캡처를 보정하지 않고 실제 브라우저 화면과 측정 결과를 기록한다.
const output = 'TODO/evidence/goal13';
const files = { feed: 'feed/data/feedPreview.ts', search: 'search/data/searchPreview.ts', article: 'article/data/articlePreview.ts', explanation: 'article/data/explanationPreview.ts', likes: 'likes/data/likePreview.ts', bookmarks: 'bookmarks/data/bookmarkPreview.ts', lists: 'bookmarks/data/userListPreview.ts', profile: 'profile/data/profilePreview.ts', settings: 'settings/data/settingsPreview.ts' };
const originals = Object.fromEntries(await Promise.all(Object.entries(files).map(async ([key, path]) => [key, await readFile('FE/src/features/' + path, 'utf8')])));
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const checks = [], measurements = [], errors = [], externalRequests = [];
let page;
const button = name => page.getByRole('button', { name, exact: true });
const tab = name => page.getByRole('tab', { name, exact: true });
const input = name => page.getByRole('textbox', { name, exact: true });
const nameInput = () => input('이름 · 필수');
async function open(flags = {}) {
  if (page) await page.close();
  for (const [key, path] of Object.entries(files)) await writeFile('FE/src/features/' + path, originals[key].replace("= 'normal';", `= '${flags[key] || 'normal'}';`));
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
  name = 'failure-' + name;
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

async function signIn() { await tab('프로필').click(); await login(); }
async function retry(label, shot) { await button(label).waitFor(); if (shot) await capture(shot); await button(label).click(); }
try {
  await open({ feed: 'empty' }); await page.getByText('아직 표시할 기사가 없어요', { exact: true }).waitFor(); await capture('feed-empty');
  await open({ feed: 'initial-error' }); await retry('다시 시도', 'feed-read-error'); await article().waitFor();
  await open({ feed: 'page-error' }); await button('기사 더 보기').click(); await retry('추가 불러오기 다시 시도', 'feed-more-error');
  await page.getByText('모든 기사를 확인했어요', { exact: true }).waitFor();
  checks.push('홈 빈 상태·첫 조회 실패·추가 조회 실패·재시도');
  await open({ article: 'initial-error', explanation: 'initial-error', search: 'initial-error' });
  await tab('탐색').click(); await button('기사 검색 열기').click(); await input('기사 검색어').fill('금리');
  await retry('검색 다시 시도', 'search-read-error'); await article().click();
  await retry('다시 시도', 'article-read-error');
  await retry('설명 다시 시도', 'explanation-error'); await heading('성인 수준 설명').waitFor();
  await button('탐색으로 돌아가기').click(); assert.equal(await input('기사 검색어').inputValue(), '금리');
  checks.push('검색→기사→설명 각각 실패·재시도·검색어 보존');

  await open({ likes: 'read-error', bookmarks: 'read-error', lists: 'lists-read-error' }); await signIn(); await tab('홈').click();
  await retry(`좋아요 조회 다시 시도, ${title}`, 'personal-read-error');
  await retry(`북마크 조회 다시 시도, ${title}`); await saved('좋아요', false); await saved('북마크', false);
  await tab('라이브러리').click(); await button('읽기 목록 열기, 저장한 기사 0개').waitFor();
  checks.push('좋아요·기본 읽기 목록·사용자 목록 조회 실패와 북마크 통합 재시도');
  await open({ likes: 'write-error', bookmarks: 'save-error' }); await signIn(); await tab('홈').click();
  await like().click(); await bookmark().click(); await retry(`좋아요 변경 다시 시도, ${title}`, 'personal-write-error');
  await retry(`북마크 변경 다시 시도, ${title}`); await saved('좋아요', true); await saved('북마크', true);
  await tab('라이브러리').click(); await button('읽기 목록 열기, 저장한 기사 1개').click(); await saved('좋아요', true); await saved('북마크', true);
  await open({ likes: 'unlike-error', bookmarks: 'remove-error' }); await signIn(); await tab('홈').click();
  await like().click(); await bookmark().click(); await saved('좋아요', true); await saved('북마크', true);
  await like().click(); await bookmark().click(); await retry(`좋아요 변경 다시 시도, ${title}`, 'personal-remove-error');
  await retry(`북마크 변경 다시 시도, ${title}`); await saved('좋아요', false); await saved('북마크', false);
  checks.push('좋아요/북마크 저장·해제 실패 복구·원래 목표 재시도·목록 일치');

  for (const scenario of ['create-error', 'rename-error', 'add-error', 'list-remove-error', 'delete-error']) {
    await open({ lists: scenario }); await signIn(); await tab('라이브러리').click();
    let name = '실패 복구 목록';
    await button('새 목록').click(); await input('목록 이름 · 필수').fill(name); await button('목록 만들기').click();
    if (scenario === 'create-error') {
      await button('목록 저장 다시 시도').waitFor(); assert.equal(await input('목록 이름 · 필수').inputValue(), name);
      await capture('list-create-error'); await input('목록 이름 · 필수').fill(name + ' 수정'); name += ' 수정'; await button('목록 저장 다시 시도').click();
    }
    await closed(); await button(`${name} 열기, 저장한 기사 0개`).waitFor();
    if (scenario === 'rename-error') {
      await button(`목록 관리, ${name}`).click(); await button('이름 수정').click(); await input('목록 이름 · 필수').fill(name + ' 새 이름');
      await button('목록 이름 저장').click(); await button('목록 저장 다시 시도').waitFor();
      assert.equal(await input('목록 이름 · 필수').inputValue(), name + ' 새 이름'); await capture('list-rename-error');
      await button('목록 저장 다시 시도').click(); await closed(); name += ' 새 이름';
    }
    await tab('홈').click(); await targets([name]);
    if (scenario === 'add-error') await retry(`북마크 변경 다시 시도, ${title}`, 'list-add-error');
    await saved('북마크', true); await tab('라이브러리').click(); await button(`${name} 열기, 저장한 기사 1개`).click();
    if (scenario === 'list-remove-error') {
      await button(`이 목록에서 제거, ${title}`).click(); await retry(`북마크 변경 다시 시도, ${title}`, 'list-remove-error');
      await page.getByText('아직 저장한 기사가 없어요.', { exact: true }).waitFor();
    }
    await button(`목록 관리, ${name}`).click(); await button('목록 삭제').click(); await button('목록 삭제 확인').click(); await closed();
    if (scenario === 'delete-error') await retry(`목록 변경 다시 시도, ${name}`, 'list-delete-error');
    await page.waitForTimeout(500); assert.equal(await button(`목록 관리, ${name}`).count(), 0);
    checks.push(`사용자 목록 ${scenario}·입력/소속 복구·재시도·삭제 후 복귀`);
  }

  await open({ profile: 'read-error', settings: 'read-error' }); await signIn();
  await retry('프로필 조회 다시 시도', 'profile-read-error'); await button('프로필 편집').waitFor();
  await settings(); await retry('설정 조회 다시 시도', 'settings-read-error'); await current('성인');
  await open({ profile: 'save-error', settings: 'save-error' }); await signIn(); await button('프로필 편집').click();
  await nameInput().fill('수정 후 다시 저장한 이름'); await input('짧은 소개').fill('실패해도 남는 소개'); await button('프로필 저장').click();
  await button('프로필 저장 다시 시도').waitFor(); assert.equal(await nameInput().inputValue(), '수정 후 다시 저장한 이름');
  await capture('profile-save-error'); await input('짧은 소개').fill('소개 수정 후 재시도'); await button('프로필 저장 다시 시도').click(); await closed();
  await settings(); await editor(); await level('초등학생').click(); await button('기본 수준 저장').click();
  await button('기본 수준 저장 다시 시도').waitFor(); await selected('초등학생'); await capture('settings-save-error');
  await level('중학생').click(); await button('기본 수준 저장 다시 시도').click(); await closed(); await current('중학생');
  checks.push('프로필/설정 조회·저장 실패·초안 보존·수정 후 재시도');

  await open(); await tab('프로필').click(); await button('모의 로그인 시작').click(); await button('모의 동작 선택 열기').click();
  await page.getByRole('radio', { name: '모의 결과: 느린 성공 (4초)', exact: true }).click(); await button('Google로 로그인 (모의)').click();
  await capture('login-pending'); await button('로그인 닫기').click(); await closed(); await page.waitForTimeout(4200);
  await button('모의 로그인 시작').waitFor(); await login(); await settings(); await button('로그아웃').click(); await button('모의 동작 선택 열기').click();
  await page.getByRole('radio', { name: '모의 결과: 느린 성공 (4초)', exact: true }).click(); await button('로그아웃 확인').click();
  await capture('logout-pending'); await button('로그아웃 취소').click(); await closed(); await page.waitForTimeout(4200); await current('성인');
  checks.push('처리 중 로그인 닫기·로그아웃 취소 뒤 늦은 성공 무시');
  assert.deepEqual(errors, []); assert.deepEqual(externalRequests, []);
  await writeFile(`${output}/failure-results.json`, JSON.stringify({ browser: await browser.version(), date: new Date().toISOString(), checks, errors, externalRequests, measurements }, null, 2));
  console.log(JSON.stringify({ checks: checks.length, screenshots: measurements.length, errors, externalRequests }));
} catch (error) {
  await page?.screenshot({ path: `${output}/failure-diagnostic.png` });
  console.error({ checks, errors, failure: String(error), body: await page?.locator('body').innerText() }); throw error;
} finally {
  for (const [key, path] of Object.entries(files)) await writeFile('FE/src/features/' + path, originals[key]);
  await browser.close();
}
