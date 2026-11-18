import { chromium } from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
try {
  await page.goto('http://localhost:8081');
  await page.getByRole('tab', { name: '프로필', exact: true }).click();
  await page.getByRole('button', { name: '모의 로그인 시작', exact: true }).click();
  await page.getByRole('button', { name: 'Google로 로그인 (모의)', exact: true }).click();
  await page.getByRole('button', { name: '프로필 편집', exact: true }).click();
  await page.getByRole('textbox', { name: '이름 · 필수', exact: true }).fill('최종 연결 확인');
  await page.getByRole('button', { name: '프로필 저장', exact: true }).click();
  await page.getByText('최종 연결 확인 · 로그인됨', { exact: true }).waitFor();
  await page.getByRole('button', { name: '로그아웃', exact: true }).click();
  await page.getByText(/최종 연결 확인의 프로필/).waitFor();
  await page.getByRole('button', { name: '로그아웃 확인', exact: true }).click();
  await page.getByRole('button', { name: '모의 로그인 시작', exact: true }).waitFor();
  assert.deepEqual(errors, []);
  await writeFile('TODO/evidence/goal11/final-smoke.json', JSON.stringify({ date: new Date().toISOString(), url: page.url(),
    result: '모달 파일명·props 정리 뒤 최종 코드의 로그인→프로필 저장→로그아웃 확인 통과', errors }, null, 2));
} finally { await browser.close(); }
