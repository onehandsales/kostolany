import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {chromium} from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
const out=new URL('./',import.meta.url).pathname;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:393,height:759}});page.setDefaultTimeout(10000);const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
const click=(name,role='button')=>page.getByRole(role,{name,exact:true}).click();const snap=async name=>{await page.waitForTimeout(350);return page.screenshot({path:out+name+'.png'})};
const align=async(name,top)=>page.getByRole('heading',{name,exact:true}).evaluate((e,y)=>{let p=e.parentElement;while(p&&!(p.scrollHeight>p.clientHeight&&/auto|scroll/.test(getComputedStyle(p).overflowY)))p=p.parentElement;if(p)p.scrollTop+=e.getBoundingClientRect().top-y},top);
try{
 await page.goto('http://localhost:8081');await click('탐색','tab');await click('기사 검색 열기');await page.getByRole('textbox',{name:'기사 검색어'}).fill('ChatGPT Is Poisoning');await page.getByRole('button',{name:/^ChatGPT Is Poisoning/}).click();await page.getByRole('heading',{name:'ChatGPT Is Poisoning Your Brain...'}).waitFor();await snap('article-top');
 await click('Story options');await click('Open reading tools');await click('초등학생','radio');await page.getByRole('heading',{name:'초등학생 수준 설명',exact:true}).waitFor();await snap('reading-tools');await click('Reading tools');await click('Reading tools');assert.equal(await page.getByRole('radio',{name:'초등학생',exact:true}).getAttribute('aria-checked'),'true');
 await align('Responses (834)',32);await snap('responses');await align('More from Jordan Gibbs',24);await snap('more-from');
 await click('탐색으로 돌아가기');assert.equal(await page.getByRole('textbox',{name:'기사 검색어'}).inputValue(),'ChatGPT Is Poisoning');await page.getByRole('button',{name:/^ChatGPT Is Poisoning/}).click();
 await page.getByRole('button',{name:/^북마크, ChatGPT/}).first().click();await click('Google로 로그인 (모의)');await page.getByRole('heading',{name:'ChatGPT Is Poisoning Your Brain...'}).waitFor();
 await page.getByRole('button',{name:/^북마크, ChatGPT/}).first().click();await page.getByRole('checkbox',{name:'읽기 목록',exact:true}).waitFor();await snap('save-sheet');await page.getByRole('checkbox',{name:'읽기 목록',exact:true}).click();await snap('save-selected');await click('저장할 목록 적용');await page.waitForTimeout(500);
 await page.getByRole('button',{name:/^북마크, ChatGPT/}).first().click();assert.equal(await page.getByRole('checkbox',{name:'읽기 목록',exact:true}).getAttribute('aria-checked'),'true');await page.getByRole('checkbox',{name:'읽기 목록',exact:true}).click();await click('저장할 목록 취소');await page.getByRole('button',{name:/^북마크, ChatGPT/}).first().click();assert.equal(await page.getByRole('checkbox',{name:'읽기 목록',exact:true}).getAttribute('aria-checked'),'true');await click('저장할 목록 취소');
 await page.setViewportSize({width:320,height:740});await snap('article-320');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);await writeFile(out+'browser.json',JSON.stringify({errors,passed:['article/back/search preserved','reading tools hide/reopen selection','save sheet/apply/cancel','responses/more excerpts','320 overflow']},null,2));
}catch(e){await snap('failed');await writeFile(out+'failed.txt',await page.locator('body').innerText());throw e}finally{await browser.close()}
