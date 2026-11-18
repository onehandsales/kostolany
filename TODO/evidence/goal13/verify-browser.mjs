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
try {
  await open(); await article().waitFor(); await capture('home-guest');
  for (const sort of ['인기', '추천', '최신']) {
    await tab(sort).click(); await page.getByRole('button', { name: '기사 더 보기', exact: true }).waitFor();
    assert.equal(await tab(sort).getAttribute('aria-selected'), 'true');
  }
  await button('기사 더 보기').click(); await page.getByText('모든 기사를 확인했어요', { exact: true }).waitFor();
  await read('성인', '홈으로 돌아가기', 'article-guest');
  await tab('탐색').click(); await capture('explore'); await button('기사 검색 열기').click();
  await input('기사 검색어').fill('없는 검색 결과 예시'); await heading('검색 결과가 없어요').waitFor(); await capture('search-empty');
  await input('기사 검색어').fill('금리'); await article().waitFor(); await capture('search-results');
  await read('성인', '탐색으로 돌아가기'); assert.equal(await input('기사 검색어').inputValue(), '금리');
  checks.push('비로그인 홈 3정렬·추가 목록·검색 빈 결과·상세 수준 변경·검색어를 유지한 복귀');

  await like().click(); await capture('login-entry'); await button('로그인 닫기').click(); await closed();
  assert.equal(await input('기사 검색어').inputValue(), '금리');
  await like().click(); await button('모의 동작 선택 열기').click();
  await page.getByRole('radio', { name: '모의 결과: 사용자 취소', exact: true }).click();
  await button('Google로 로그인 (모의)').click(); await closed();
  await like().click(); await button('모의 동작 선택 열기').click();
  await page.getByRole('radio', { name: '모의 결과: 실패', exact: true }).click();
  await button('Google로 로그인 (모의)').click(); await button('로그인 다시 시도').waitFor(); await capture('login-error');
  await button('로그인 다시 시도').click(); await closed();
  await saved('좋아요', false); await like().click(); await saved('좋아요', true);
  await article().click(); await heading('성인 수준 설명').waitFor(); await capture('article-top');
  await page.getByRole('radio', { name: '초등학생', exact: true }).click(); await heading('초등학생 수준 설명').waitFor();
  await bookmark().click(); await saved('북마크', true); await button('탐색으로 돌아가기').click();
  await saved('좋아요', true); await saved('북마크', true);
  checks.push('개인 행동→로그인 닫기·사용자 취소·실패·재시도·성공→검색 맥락 보존·자동 행동 없이 직접 좋아요·저장');

  await tab('라이브러리').click(); await button('읽기 목록 열기, 저장한 기사 1개').click();
  await read('성인', '읽기 목록으로 돌아가기'); await saved('좋아요', true); await saved('북마크', true);
  await button('라이브러리로 돌아가기').click(); await createList('경제 공부'); await createList('다시 읽기');
  await capture('library-lists'); await button('경제 공부 열기, 저장한 기사 0개').click(); await capture('list-empty');
  await button('라이브러리로 돌아가기').click(); await tab('홈').click(); await targets(['경제 공부', '다시 읽기']);
  await tab('라이브러리').click(); await button('경제 공부 열기, 저장한 기사 1개').click(); await capture('list-detail');
  await read('성인', '저장 목록으로 돌아가기');
  await button('목록 관리, 경제 공부').click(); await capture('list-menu'); await button('이름 수정').click();
  await input('목록 이름 · 필수').fill('취소할 이름'); await escape(); await closed();
  await button('목록 관리, 경제 공부').click(); await button('이름 수정').click();
  assert.equal(await input('목록 이름 · 필수').inputValue(), '경제 공부');
  await input('목록 이름 · 필수').fill('경제와 투자 공부'); await capture('list-rename'); await button('목록 이름 저장').click(); await closed();
  await button(`이 목록에서 제거, ${title}`).click(); await capture('list-removed');
  await button('목록 관리, 경제와 투자 공부').click(); await button('목록 삭제').click(); await capture('list-delete');
  await escape(); await closed();
  await button('목록 관리, 경제와 투자 공부').click(); await button('목록 삭제').click(); await button('목록 삭제 확인').click(); await closed();
  await button('다시 읽기 열기, 저장한 기사 1개').waitFor();
  assert.equal(await button('경제와 투자 공부 열기, 저장한 기사 0개').count(), 0);
  await button('목록 관리, 다시 읽기').click(); await button('목록 삭제').click(); await button('목록 삭제 확인').click(); await closed();
  await button('읽기 목록 열기, 저장한 기사 1개').click(); await saved('북마크', true); await saved('좋아요', true);
  await read('성인', '읽기 목록으로 돌아가기'); await button('라이브러리로 돌아가기').click();
  checks.push('목록 생성→복수 소속→상세/기사/원래 목록 복귀→이름 취소·수정→제거→삭제 취소·확인→다른 소속·원문·좋아요 유지');

  await tab('프로필').click(); await button('프로필 편집').click(); await nameInput().fill('취소할 프로필');
  await button('프로필 편집 취소').click(); await closed(); await page.getByText('예시 독자 A · 로그인됨', { exact: true }).waitFor();
  await button('프로필 편집').click(); await nameInput().fill('경제 뉴스를 차근차근 읽는 독자');
  await input('짧은 소개').fill('금리와 물가를 공부해요.\n한글과 이모지 👨‍👩‍👧‍👦'); await capture('profile-edit');
  await button('프로필 저장').click(); await closed(); await capture('profile-saved');
  await button('프로필 편집').click(); assert.equal(await nameInput().inputValue(), '경제 뉴스를 차근차근 읽는 독자');
  await escape(); await closed();
  await settings(); await current('성인'); await editor(); await level('초등학생').click(); await button('기본 설명 수준 취소').click(); await closed();
  await editor(); await level('중학생').click(); await button('기본 수준 저장').click(); await closed(); await current('중학생'); await capture('settings-saved');
  for (const origin of ['홈', '탐색', '라이브러리']) {
    await tab(origin).click(); if (origin === '라이브러리') await button('읽기 목록 열기, 저장한 기사 1개').click();
    await read('중학생', `${origin === '라이브러리' ? '읽기 목록' : origin}으로 돌아가기`, `default-from-${origin}`);
    await read('중학생', `${origin === '라이브러리' ? '읽기 목록' : origin}으로 돌아가기`);
  }
  await tab('프로필').click(); await current('중학생');
  checks.push('프로필 편집 취소·이름/소개 저장·재진입→기본값 저장→홈/검색/라이브러리 같은 기사 새 진입 반영·임시 선택은 기본값 미변경');

  await button('로그아웃').click(); await capture('logout-confirm'); await button('로그아웃 취소').click(); await closed();
  await button('로그아웃').click(); await button('모의 동작 선택 열기').click();
  await page.getByRole('radio', { name: '모의 결과: 실패', exact: true }).click(); await button('로그아웃 확인').click();
  await button('로그아웃 다시 시도').waitFor(); await capture('logout-error'); await button('로그아웃 다시 시도').click();
  await button('모의 로그인 시작').waitFor(); await login('예시 독자 B'); await settings(); await current('성인');
  await tab('홈').click(); await saved('좋아요', false); await saved('북마크', false);
  await tab('라이브러리').click(); await button('읽기 목록 열기, 저장한 기사 0개').click(); await capture('user-b-empty');
  await tab('프로필').click(); await logout(); await login();
  await page.getByText('경제 뉴스를 차근차근 읽는 독자 · 로그인됨', { exact: true }).waitFor(); await settings(); await current('중학생');
  await tab('홈').click(); await saved('좋아요', true); await saved('북마크', true);
  checks.push('설정 로그아웃 취소·실패·재시도→B 빈 개인 데이터/성인→A 이름/설정/좋아요/북마크 유지');

  await page.setViewportSize({ width: 320, height: 740 }); await capture('home-narrow'); await homeLayout('320px');
  await scaleText(); await capture('home-large-text'); await homeLayout('320px-CSS-2x'); await resetText();
  await tab('라이브러리').click(); await button('새 목록').click();
  await input('목록 이름 · 필수').fill('한글 이름을 길게 입력한 목록의 줄바꿈과 키보드 초점 확인');
  await scaleText(); await capture('list-large-text-top'); await button('목록 만들기').scrollIntoViewIfNeeded(); await capture('list-large-text-bottom');
  await resetText(); await escape(); await closed();
  await page.setViewportSize({ width: 1365, height: 900 }); await tab('홈').click(); await capture('home-desktop');
  await page.setViewportSize({ width: 390, height: 844 }); await page.reload(); await tab('프로필').click(); await login(); await settings(); await current('성인');
  await button('프로필로 돌아가기').click(); await page.getByText('예시 독자 A · 로그인됨', { exact: true }).waitFor();
  await tab('홈').click(); await saved('좋아요', false); await saved('북마크', false);
  await tab('라이브러리').click(); await button('읽기 목록 열기, 저장한 기사 0개').waitFor(); await capture('reload-reset');
  checks.push('320px·긴 한글·CSS 2배·스크롤·1365px PC·전체 새로고침 인증/프로필/설정/좋아요/북마크/목록 초기화');
  assert.deepEqual(errors, []); assert.deepEqual(externalRequests, []);
  await writeFile(`${output}/browser-results.json`, JSON.stringify({ browser: await browser.version(), date: new Date().toISOString(), checks, errors, externalRequests, measurements, layoutChecks }, null, 2));
  console.log(JSON.stringify({ checks: checks.length, screenshots: measurements.length, errors, externalRequests }));
} catch (error) {
  await page?.screenshot({ path: `${output}/diagnostic.png` });
  console.error({ checks, errors, failure: String(error), body: await page?.locator('body').innerText() }); throw error;
} finally { await writeFile(previewFile, original); await browser.close(); }
