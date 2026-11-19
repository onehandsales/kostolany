import assert from 'node:assert/strict';import{readFile,writeFile}from'node:fs/promises';import{chromium}from'/tmp/kostolany-goal8-browser/node_modules/playwright-core/index.mjs';
const out=new URL('./',import.meta.url).pathname;const config=new URL('../../../FE/src/features/feed/data/feedPreview.ts',import.meta.url);const original=await readFile(config,'utf8');assert(original.includes("feedPreviewScenario: FeedScenario = 'normal'"));
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const p=await b.newPage({viewport:{width:393,height:759}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
try{
await writeFile(config,original.replace("= 'normal'","= 'initial-error'"));await p.goto('http://localhost:8081');await p.getByRole('alert').filter({hasText:'기사를 불러오지 못했어요'}).waitFor();await p.screenshot({path:out+'feed-error.png'});await p.getByRole('button',{name:'다시 시도',exact:true}).click();await p.getByRole('button',{name:/^How to \*really\*/}).waitFor();
await writeFile(config,original.replace("= 'normal'","= 'empty'"));await p.reload();await p.getByRole('tab',{name:'Featured',exact:true}).click();await p.getByText('No featured stories',{exact:true}).waitFor();await p.screenshot({path:out+'featured-empty.png'});await p.getByRole('button',{name:'View recommended publications',exact:true}).click();await p.getByRole('button',{name:'Got it',exact:true}).click();
assert.deepEqual(errors,[]);
}finally{await writeFile(config,original);await b.close();}
assert.equal(await readFile(config,'utf8'),original);await writeFile(out+'failures.json',JSON.stringify({feedErrorRetry:true,featuredEmpty:true,configRestored:true,errors},null,2));
