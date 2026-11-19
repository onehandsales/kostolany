import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {chromium} from '/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
const out=new URL('./',import.meta.url).pathname;
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const page=await browser.newPage({viewport:{width:393,height:759}});page.setDefaultTimeout(15000);
const errors=[];page.on('pageerror',error=>errors.push(error.message));
const click=(name,role='button')=>page.getByRole(role,{name,exact:true}).click();
const configs=['profile','settings'].map(feature=>({feature,url:new URL(`../../../FE/src/features/${feature}/data/${feature}Preview.ts`,import.meta.url)}));
for(const config of configs)config.original=await readFile(config.url,'utf8');
const passed=[];
try {
 for(const config of configs)for(const scenario of ['read-error','save-error']){
  await writeFile(config.url,config.original.replace("= 'normal';",`= '${scenario}';`));await page.waitForTimeout(3000);
  await page.goto('http://localhost:8081');await page.waitForTimeout(2500);await page.reload();await click('프로필','tab');await click('모의 로그인 시작');await click('Google로 로그인 (모의)');
  if(config.feature==='settings')await click('설정 열기');
  if(scenario==='read-error'){
   const label=config.feature==='profile'?'프로필 조회 다시 시도':'설정 조회 다시 시도';await page.getByRole('button',{name:label,exact:true}).waitFor();await page.screenshot({path:out+config.feature+'-read-error.png'});await click(label);
   await page.getByRole('button',{name:config.feature==='profile'?'프로필 편집':'기본 설명 수준 변경',exact:true}).waitFor();
  }else if(config.feature==='profile'){
   await click('프로필 편집');await page.getByLabel('이름 · 필수',{exact:true}).fill('실패 후 보존된 이름😀');await page.getByLabel('짧은 소개',{exact:true}).fill('첫 줄\n둘째 줄');await click('프로필 저장');await page.getByRole('alert').filter({hasText:'입력은 그대로'}).waitFor();assert.equal(await page.getByLabel('이름 · 필수',{exact:true}).inputValue(),'실패 후 보존된 이름😀');await page.screenshot({path:out+'profile-save-error.png'});await click('프로필 저장 다시 시도');await page.getByRole('heading',{name:'실패 후 보존된 이름😀',exact:true}).waitFor();
  }else{
   await click('기본 설명 수준 변경');await click('중학생 기본 수준','radio');await click('기본 수준 저장');await page.getByRole('alert').filter({hasText:'선택은 그대로'}).waitFor();assert.equal(await page.getByRole('radio',{name:'중학생 기본 수준',exact:true}).getAttribute('aria-checked'),'true');await page.screenshot({path:out+'settings-save-error.png'});await click('기본 수준 저장 다시 시도');await page.getByText('현재 기본값 · 중학생',{exact:true}).waitFor();
  }
  passed.push(config.feature+' '+scenario+' retry');await writeFile(config.url,config.original);
 }
 assert.deepEqual(errors,[]);
} catch(error){await page.screenshot({path:out+'failure-debug.png'});await writeFile(out+'failure-debug.txt',await page.locator('body').innerText());throw error} finally{for(const config of configs)await writeFile(config.url,config.original);await browser.close()}
for(const config of configs)assert.equal(await readFile(config.url,'utf8'),config.original);
await writeFile(out+'failures.json',JSON.stringify({passed,errors,configsRestored:true},null,2));
