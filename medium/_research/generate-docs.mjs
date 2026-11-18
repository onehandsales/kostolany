import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const research = path.dirname(fileURLToPath(import.meta.url));
const root = path.dirname(research);
const read = async name => JSON.parse(await fs.readFile(path.join(research, name), 'utf8'));
const catalog = await read('catalog.json');
const manifest = new Map((await read('image-manifest.json')).map(x => [x.id, x]));
const flowImages = await read('flow-image-manifest.json');
const sources = await read('sources.json');
const profiles = new Map((await read('flow-profiles.json')).map(x => [x.name, x]));
const r2Profiles = new Map((await read('r2-flow-review.json')).map(x => [x.name, x]));
const r2Audit = await read('r2-image-review.json');
const notes = new Map();
for (const name of (await fs.readdir(path.join(research, 'observations'))).sort()) {
  if (!name.endsWith('.json')) continue;
  const file = path.join(research, 'observations', name);
  const rows = JSON.parse(await fs.readFile(file, 'utf8'));
  for (const row of rows) {
    if (notes.has(row.id)) throw new Error('Duplicate observation: ' + row.id);
    row.reviewMethod = row.index <= 3 ? 'Gummble MCP 고화질 이미지 시각 확인'
      : ((row.index >= 4 && row.index <= 9) || row.index === 171)
        ? 'MCP URL로 내려받은 로컬 원본 이미지 시각 확인'
        : 'Gummble MCP optimized 이미지 시각 확인; 원본 파일 별도 보관';
    notes.set(row.id, row);
  }
  await fs.writeFile(file, JSON.stringify(rows, null, 2) + '\n', 'utf8');
}
if (notes.size !== 200 || catalog.flows.length !== 63) throw new Error('Unexpected coverage');
const tree = new Map();
function visit(nodes) { for (const n of nodes) { tree.set(n.id, n); visit(n.children); } }
visit(catalog.tree.flows);
const flowById = new Map(catalog.flows.map(x => [x.flowId, x]));
const pad = n => String(n).padStart(2, '0');
const flowImageFile = (screen, index) => `screens/${pad(index + 1)}_${screen.id}.png`;
const fragment = s => String(s).replace(/[.。]+$/, '');
const clean = s => String(s).replaceAll('|', '\\|').replaceAll('\n', ' ');
const relative = (from, to) => path.relative(from, to).split(path.sep).join('/');
const link = (label, target) => `[${label}](<${target}>)`;
const short = {
  auth: '이메일 코드·소셜 인증 설명과 대조.', writing: '초안·앱 작성·발행 절차와 대조.',
  editor: '본문 서식 기능과 대조.', topics: '최대 5개 토픽 선택과 대조.', recommend: '팔로우·읽기 기록·추천 조정과 대조.',
  home: '피드 종류·검색 진입과 대조.', lists: '리스트 관리·저장·다운로드 범위와 대조.',
  audio: '멤버십·플레이어·속도·음성 설정과 대조.', claps: '반복 박수·상한·취소 설명과 대조.',
  highlights: '강조·인용 응답·타인 강조 숨김과 대조.', responses: '로그인 및 응답·구절 인용과 대조.',
  profile: '프로필 편집·소개·게시 목록과 대조.', pronouns: '4개 선택·Done 후 Save 단계와 대조.',
  email: '이메일·Digest 설정 설명과 대조.', logout: '현재 기기와 다른 세션 종료를 구분.',
  stats: '집계 범위·갱신 주기 차이를 확인.', membership: '구독 등급·혜택·구매 경로와 대조.',
  friend: '일반 공유와 Friend Link 조건을 구분.', follow: '팔로우와 이메일 알림 설정을 구분.',
  mute: '피드 제외와 프로필 접근을 구분.', rules: '신고 진입과 접수 이후 판단을 구분.'
};
const gaps = {
  'Changing display': '공식 하이라이트 문서는 표시 숨김을 직접 설명한다. 글자 배율·글꼴·테마의 전체 옵션과 동기화 계약은 이번 공식 문서 대조에서 확정하지 못했다.',
  'Switching to dark mode': '공식 하이라이트 문서는 읽기 표시의 일부만 설명한다. 전역 테마 전환 자체는 캡처 근거이며 재시작·OS 연동의 공식 계약은 확인하지 못했다.',
  'Changing notification settings': '이메일 도움말을 푸시 설정 계약으로 사용하지 않는다. 푸시의 이벤트별 토글과 Tailored for you는 캡처 관찰이며 실제 수신·OS 권한은 미검증이다.',
  'Custom app icon': '멤버십 문서는 등급 배경을 확인하는 자료다. 아이콘 잠금·선택지·OS 변경 결과를 직접 설명하는 문서는 이번 대조에서 확인하지 못했다.',
  'Downloading an image': 'Friend Link 문서는 공유 권한의 배경 자료다. Save image의 파일 형식·사진 권한·저장 해상도는 확인하지 못했다.',
  'Blocking an author': 'R2 대조에서 차이를 확인했다. 현재 차단 도움말은 차단한 작가의 글을 볼 수 없다고 설명하지만 캡처에는 차단 토스트 뒤에도 글 카드가 보인다. 마지막 화면의 팔로워 수·탭도 다르므로 캐시·시점·빌드 중 원인을 확정하지 않는다. 상대 계정으로 권한을 재현한 결과는 없다.',
  'Sorting responses': '응답 도움말은 작성·인용의 배경 자료다. Most Relevant의 계산식과 정렬 동률 규칙은 확인하지 못했다.',
  'Editing a response': '응답 도움말은 작성·인용의 배경 자료다. 이 캡처의 편집 UI 문구와 수정 권한·이력 계약은 별도 확인 대상이다.',
  'Deleting a response': '응답 도움말은 작성 기능의 배경 자료다. 삭제 복구와 자식 답글 처리 계약은 별도 확인 대상이다.',
  'Digest settings': '공식 이메일 설정과 캡처의 앱 Digest 설정은 진입점이 다르다. 두 주기가 같은 저장값인지와 푸시 옵션 계약은 미확인이다.',
  'Filtering digest': '공식 이메일 문서는 Digest의 성격과 주기를 설명한다. 앱 내 최근 10개 기록 선택은 캡처에서 관찰한 범위다.',
  'Story stats': '차이: 캡처는 Updated daily, 현재 공식 Stats는 월간 통계를 시간별 갱신으로 안내한다. 현재 문서의 지표 정의를 과거 캡처에 소급 적용하지 않는다.',
  'Notifications': '이메일 알림 유형은 이벤트 분류의 비교 자료다. 앱 알림의 녹색선 의미·읽음 처리·정렬 계약은 확인하지 않았다.'
};

let totalSteps = 0;
for (const flow of catalog.flows) {
  const node = tree.get(flow.flowId), p = profiles.get(flow.flowName), r2 = r2Profiles.get(flow.flowName);
  if (!node || !p || !r2 || node.stepCount !== flow.screens.length) throw new Error('Flow mismatch: ' + flow.flowName);
  const dir = path.join(root, 'flows', flow.path);
  const observations = flow.screens.map(s => {
    if (!notes.has(s.id) || !manifest.has(s.id)) throw new Error('Missing evidence: ' + s.id);
    return notes.get(s.id);
  });
  const count = observations.length;
  const placed = flowImages.flows.find(f => f.flowId === flow.flowId);
  if (placed?.path !== flow.path || JSON.stringify(placed?.screens.map(s => s.file)) !== JSON.stringify(flow.screens.map(flowImageFile))) {
    throw new Error('Flow images must be synchronized first: ' + flow.path);
  }
  if (observations.some(n => !n.r2ReviewedDate)) throw new Error('Missing R2 review: ' + flow.flowName);
  const correctedCount = observations.filter(n => r2Audit.patches.some(p => p.index === n.index)).length;
  totalSteps += count;
  const sourceLink = key => link('공통 문서 대조', relative(dir, path.join(root, 'SOURCES.md')) + '#' + key);
  const parent = node.parentId ? flowById.get(node.parentId) : null;
  const docLink = f => link(f.flowName, relative(dir, path.join(root, 'flows', f.path, 'ANALYSIS.md')));
  const relation = parent ? `- 상위 흐름: ${docLink(parent)}` : '- 상위 흐름: 없음. Gummble의 최상위 흐름이다.';
  const children = node.children.length ? '- 하위 흐름: ' + node.children.map(c => docLink(flowById.get(c.id))).join(' · ') : '- 하위 흐름: 없음.';
  const changes = observations.map((n, i) => i === 0
    ? '이 흐름의 첫 캡처다. 앞선 사용자 행동은 화면만으로 확정할 수 없다.'
    : `${observations[i - 1].title} → ${n.title}. 현재 관찰값: ${n.fields}. 캡처 사이의 정확한 조작·요청은 미기록이다.`);
  const build = observations.some(n => n.index === 185 || n.index === 196)
    ? '설정 캡처에 `4.263.185257` 표시. 다른 단계의 동일 빌드 여부는 미확인'
    : '개별 화면의 제품 빌드 미확인. 카탈로그 버전을 제품 버전으로 사용하지 않음';
  const out = [
    `# ${flow.flowName} 플로우 분석`, '',
    `검토 상태: **R2 누락·내용 재검토 완료(정적 캡처 범위)**. 실제 이미지 재확인 **${count}/${count}단계**. 계정 재현은 수행하지 않았다.`, '',
    '관찰은 Gummble 캡처에서 직접 본 내용, 문서 확인은 현재 공식 도움말, 설계 가정은 우리 구현 후보를 뜻한다. 버튼의 존재·성공 안내·실제 서버 결과를 구분한다.', '',
    '## 1. 출처와 검토 상태', '',
    '| 항목 | 기록 |', '| --- | --- |',
    '| 앱 | Medium iOS · `medium-ios` · `4674239e-d24a-4ef4-aed5-9682429edd48` |',
    `| Flow ID | \`${flow.flowId}\` |`,
    `| 원본 | [Gummble flow](${flow.gummbleUrl}) |`,
    '| 카탈로그 버전 | MCP 조회 `Latest`, version ID `1419` |',
    `| 제품 빌드 | ${build} |`,
    '| 조회일 / 이미지 검토일 | 2026-11-18 KST. 개별 분·초는 기록하지 않음 |',
    '| 캡처일 | 미확인. 기사·알림·통계에 표시된 날짜는 캡처일이 아님 |',
    `| 화면 수 / 이미지 확인 | ${count}단계 / ${count}단계. 공통 이미지는 다른 흐름과 동일 관찰 기록을 재사용 |`,
    '| 이미지 검토 방식 | R1: MCP 이미지 또는 로컬 원본. R2: 원본 PNG를 390×844로 축소한 번호 포함 비교 시트. 공통 이미지는 고유 이미지 기준 재검토 후 각 흐름에서 대조 |',
    '| 크기·환경 | MCP 크기와 실제 PNG 픽셀 크기를 단계별 구분. 기기 모델·OS·DPR·배율·국가·계정 권한은 별도 확인 없으면 미확인 |',
    '| 계정 재현 | 미수행. 로그인·발행·구매·신고·삭제·외부 공유를 실행하지 않음 |',
    '| 공식 문서 | 2026-11-18 조회. 6절에 직접 대조 범위와 미확인 범위를 기록 |', '',
    '## 2. 플로우 목적과 연결', '', p.purpose, '', p.caveat, '', relation, children,
    `- 폴더 위치: \`medium/flows/${flow.path}\``,
    '- 부모·자식은 Gummble 탐색 분류다. 모든 자식 흐름이 반드시 실행되는 순차 단계나 런타임 화면 트리를 뜻하지 않는다.', '',
    '### 진입 조건과 확인된 종료 범위', '',
    `- 진입: ${r2.entry}`, `- 종료: ${r2.result}`,
    '- 관련 흐름: ' + r2.related.map(name => { const f = catalog.flows.find(f => f.flowName === name); if (!f) throw Error('Unknown related flow: ' + name); return docLink(f); }).join(' · '),
    '- 관련 흐름 링크는 기능의 연결점이다. 서로 다른 캡처를 같은 계정·같은 시각의 연속 실행으로 합치지 않는다.', '',
    '## 3. 전체 단계표', '',
    'MCP가 반환한 순서다. 스크롤·메뉴·입력·로딩도 각각 한 단계이며 캡처 사이의 클릭·저장·네트워크가 모두 기록되었다는 뜻은 아니다.', '',
    '| 단계 | Screen ID와 원본 | 확인된 화면 | 다음 캡처와의 관계 |', '| --- | --- | --- | --- |',
    ...flow.screens.map((s, i) => `| ${pad(i + 1)} | [\`${s.id}\`](${s.webUrl}) | ${link(clean(observations[i].title), flowImageFile(s, i))} | ${i + 1 < count ? clean(observations[i + 1].title) + ' — ' + clean(observations[i + 1].state) : '이 흐름의 기록 종료; 2절의 종료 범위 참조'} |`), '',
    '## 4. 화면별 상세 분석', ''
  ];
  for (let i = 0; i < count; i++) {
    const s = flow.screens[i], n = observations[i], im = manifest.get(s.id);
    out.push(`### 단계 ${pad(i + 1)} — ${n.title}`, '',
      `- Screen ID: \`${s.id}\``,
      `- 원본: [화면 페이지](${s.webUrl}) · [원본 이미지](${s.screenUrl})`,
      `- 로컬 이미지: ${link(path.posix.basename(flowImageFile(s, i)), flowImageFile(s, i))}`,
      `- 실제 이미지 확인일: ${n.reviewedDate} KST · ${n.reviewMethod}`,
      `- R2 이미지 재검토: ${n.r2ReviewedDate} KST · ${n.r2ReviewMethod}`,
      `- 이미지 크기: MCP 메타데이터 **${s.width} × ${s.height}** / 원본 PNG **${im.width} × ${im.height} px**. DPR을 역산해 확정하지 않음`,
      `- 이전·다음 단계: \`${i ? flow.screens[i - 1].id : '플로우 시작'}\` → 현재 → \`${i + 1 < count ? flow.screens[i + 1].id : '플로우 기록 종료'}\``, '',
      '#### 화면에서 직접 확인한 내용', '',
      `- 레이아웃: ${n.layout}`, `- 입력 항목·기본값·표시 데이터: ${n.fields}`,
      `- 버튼·메뉴·안내 문구: ${n.controls}`, `- 확인된 상태: ${n.state}`,
      ...(n.r2Notes || []).map(text => `- R2 보완 관찰·해석: ${text}`),
      `- 단계 간 변화: ${changes[i]}`, '',
      '#### 동작과 데이터', '',
      '- 화면 관찰: 위 입력값·컨트롤·표시 상태를 확인했다. 정적 캡처이므로 실제 요청 성공·서버 영속성은 별도 증거가 필요하다.',
      '- 공식 문서 확인: 6절에서 기능별 출처와 적용 한계를 대조한다. 이 화면의 내부 API 호출은 관찰하지 않았다.',
      `- 설계 가정: ${fragment(n.model)}. 구현 후보이며 확정 스키마·정책이 아니다.`,
      `- 미확인: ${n.unknown}`, '',
      '#### 모델링 영향', '',
      `- 후보와 근거: ${fragment(n.model)}. 위의 확인된 상태와 표시 데이터를 근거로 검토한다.`,
      `- 확정 전 확인: ${fragment(n.unknown)}. 화면 관찰만으로 필수값·권한·트랜잭션을 확정하지 않는다.`, ''
    );
  }
  out.push('## 5. 업무 규칙과 데이터 변화', '', p.caveat, '',
    '| 단계 | 관찰된 상태·값 | 근거의 한계 |', '| --- | --- | --- |',
    ...observations.map((n, i) => `| ${pad(i + 1)} | ${clean(n.state)} — ${clean(n.fields)} | ${clean(n.unknown)} |`), '',
    '위 표는 보이는 상태 변화다. 성공 토스트가 있어도 외부 계정의 가시성·영수증·서버 저장을 독립 검증한 것은 아니다.', '',
    '## 6. 공식 도움말과 API 대조', '',
    '공식 자료는 현재 문서이며 과거 캡처와 시점이 다를 수 있다. 아래 기능 설명의 범위만 대조했으며 내부 API나 제품 전체 규칙을 확인한 것은 아니다.', '',
    ...p.refs.map(key => { const s = sources.find(x => x.key === key); if (!s) throw new Error(key); return `- [${s.title}](${s.url}): ${s.summary} ${sourceLink(key)}.`; }), '',
    gaps[flow.flowName] || '화면에서 관찰한 값·메뉴와 문서에 없는 세부 상태는 구분한다. 미수록 오류·권한·실패 분기는 아래 질문으로 남긴다.', '',
    `- ${link('API 검토', relative(dir, path.join(root, 'SOURCES.md')) + '#api')}. 이 흐름의 내부 endpoint·요청·응답·DB 스키마는 확인하지 않았다.`, '',
    '## 7. 데이터 모델링 시사점', '',
    '다음은 관찰에 기반한 구현 후보다. Kostolany의 기능 채택·스키마·업무 정책으로 확정하지 않는다.', '',
    ...[...new Map(observations.map((n, i) => [n.model, `- 단계 ${pad(i + 1)}: ${n.model}`])).values()], '',
    '## 8. 미확인 사항과 검토 질문', '',
    `**원본에 없는 분기·남은 범위:** ${r2.unseen}`, '',
    ...observations.map((n, i) => `- 단계 ${pad(i + 1)}: ${n.unknown}`),
    '- 같은 계정·같은 빌드에서 시작 상태를 맞춘 뒤 정상·취소·실패·재진입 결과를 검증해야 한다.', '',
    '## 9. 검토 이력', '',
    '| 차수 | 날짜 | 확인·작성 내용 | 남은 범위 |', '| --- | --- | --- | --- |',
    `| R1 | 2026-11-18 KST | MCP ${count}단계와 실제 이미지 ${count}단계 대조. 원본·로컬 파일 연결, 관찰·문서·가정 분리 | 실제 계정 재현·미수록 상태·8절 항목 |`,
    `| R2 | 2026-11-18 KST | MCP ${count}단계 순서 재조회 및 이미지 재검토. ${correctedCount ? correctedCount + '개 단계의 관찰·표현 보완' : '기존 화면 관찰 기록 일치 확인'}. 진입·종료·미수록 분기·관련 흐름 및 공식 규칙 대조 추가 | 원본에 없는 8절 분기·실제 계정 동작 |`,
    '| 문서 점검 | 2026-11-18 KST | 전체 63개 문서의 단계 순서·이미지 ID·로컬 링크·필수 절 구조를 검증 스크립트로 점검 | 이미지 2차 검토로 계산하지 않음 |',
    `| 이미지 배치 | ${flowImages.checkedDate} KST | MCP 단계 목록 재조회 후 이 흐름의 원본 ${count}개를 screens/에 단계 순서대로 복사. 문서 링크·화면 ID·순서·크기·SHA-256 대조 | 파일 배치·무결성 점검이며 추가 시각 검토나 계정 재현은 아님 |`, ''
  );
  await fs.writeFile(path.join(dir, 'ANALYSIS.md'), out.join('\n'), 'utf8');
}

const sourceMd = ['# Medium 공식 자료 대조', '',
  '조회일: 2026-11-18 KST. 아래는 공식 도움말·공식 저장소를 실제 조회하여 요약한 내용이다. 캡처 시점과 현재 정책을 구분하며 전문을 복제하지 않는다.', '',
  '플로우 문서의 링크는 해당 기능의 비교 자료다. 관련 문서를 읽었다는 사실이 각 화면의 모든 규칙·내부 API까지 검증했다는 뜻은 아니다.', ''];
for (const s of sources) sourceMd.push(`<a id="${s.key}"></a>`, '', `## ${s.title}`, '', `[공식 원문](${s.url}) · 확인일 ${s.checkedDate}`, '', s.summary, '');
sourceMd.push('## 적용 한계', '',
  '- 통계: 캡처의 매일 갱신 안내와 현재 문서의 시간별 갱신 설명이 다르다. 각 시점의 증거로 보존한다.',
  '- 오디오: 언어별 음성 목록은 번역 지원 증거가 아니다. 실제 음성 청취는 하지 않았다.',
  '- 구독: SGD 캡처 가격·현재 도움말 가격·실제 스토어 청구를 구분한다. 구매를 실행하지 않았다.',
  '- 전역 테마·커스텀 아이콘·공유 이미지 저장·푸시 세부 옵션·응답 정렬은 일부 관련 문서만 확인했다. 화면 관찰 범위 이상으로 공식 계약을 주장하지 않는다.',
  '- Medium 내부 읽기·추천·응답·리스트·설정 API를 공개 API 문서로 추정하지 않는다. 앱 트래픽·DB·실제 계정 검증은 수행하지 않았다.', '');
await fs.writeFile(path.join(root, 'SOURCES.md'), sourceMd.join('\n'), 'utf8');

const intro = ['# Medium iOS 플로우 분석', '',
  '**63개 흐름 · 273단계 · 고유 이미지 200장**을 Gummble MCP로 조회하고 실제 이미지를 확인했다. 각 흐름 폴더에 `ANALYSIS.md` 1개를 작성했다.', '',
  '- 검토: 2026-11-18 KST · R2 누락·내용 재검토 완료. 계정 재현은 미수행. [재검토 결과와 남은 범위](REVIEW_R2.md).',
  '- 앱: `medium-ios` · version ID `1419` (`Latest`). 개별 캡처일·빌드는 일괄 확인되지 않았다.',
  '- 구조: 최상위 6개 + 하위 57개, 최대 5단계 깊이. 각 숫자는 그 흐름 자체의 화면 수이며 자식 합계가 아니다.',
  '- 공통 이미지는 한 번 관찰해 각 흐름의 단계 맥락에 재사용했다. 273장을 각각 별개 이미지로 검토했다고 계산하지 않는다.',
  '- R1 검토 방식: 원본/고화질 10장, MCP optimized 190장. 모두 원본 PNG를 함께 보관했다.',
  `- R2 검토 방식: 원본을 390×844로 축소한 비교 시트 34개에서 고유 이미지 200장을 다시 확인했다. ${r2Audit.patches.length}개 화면 기록을 보완·교정하고 63개 흐름의 진입·종료·미수록 분기를 대조했다.`,
  '- 관찰·공식 설명·설계 가정·미확인을 문서에서 구분했다. 이 연구는 Kostolany 구현 범위를 자동으로 확정하지 않는다.', '',
  '## 흐름별 이미지', '',
  `각 Flow 폴더의 \`screens/\`에 해당 흐름 자체의 이미지를 배치했다. **${flowImages.flowCount}개 폴더 · ${flowImages.imageFiles}개 PNG**이며, 부모 폴더에 자식 Flow 이미지를 합치지 않는다.`, '',
  '- 파일명: `01_<Screen ID>.png`, `02_<Screen ID>.png` 순서. 단계 번호는 MCP가 반환한 캡처 순서다.',
  '- 분석 문서의 전체 단계표에서 화면 이름을 누르거나, 상세 분석의 로컬 이미지 링크로 해당 PNG를 열 수 있다.',
  '- 원본 크기·내용의 이미지 273개를 각 Flow의 `screens/`에 보관한다. `medium/screens/`의 중복 200개는 Flow 파일과 SHA-256 일치를 확인한 뒤 삭제했다. 고유 화면 200개는 모두 Flow 폴더에 남아 있다.',
  `- 배치 근거: ${flowImages.sourceCheckedAt}에 MCP에서 63개 Flow의 단계 ID·순서·이미지 URL·메타데이터를 다시 조회했다. 기존 원본과 동일하여 보관된 PNG를 사용했다.`,
  '- 배치 재검토는 파일 누락·초과·순서·문서 링크·원본 해시 대조다. R2 이후의 추가 시각 검토 횟수로 계산하지 않는다.', '',
  '```text',
  'medium/flows/Home/',
  '├── ANALYSIS.md',
  '├── screens/',
  '│   ├── 01_<Screen ID>.png',
  '│   └── ...',
  '└── Story detail/',
  '    ├── ANALYSIS.md',
  '    └── screens/',
  '        ├── 01_<Screen ID>.png',
  '        └── ...',
  '```', '',
  '## 탐색', '',
  '| 흐름 경로 | 자체 단계 | 분석 문서 | 이미지 |', '| --- | ---: | --- | --- |',
  ...catalog.flows.map(f => `| ${clean(f.path)} | ${f.screens.length} | ${link('ANALYSIS.md', 'flows/' + f.path + '/ANALYSIS.md')} | ${link('screens/', 'flows/' + f.path + '/screens/')} |`), '',
  '## 근거와 재검증', '',
  `- [공식 도움말·API 대조](SOURCES.md): ${sources.length}개 공식 출처와 적용 범위. R2에서 차단·신고·응답 관리 3개 추가.`,
  '- [R2 화면 검토 기록](_research/r2-image-review.json): 실제 재검토 인덱스와 보완·교정 내역.',
  '- [R2 흐름 검토 기록](_research/r2-flow-review.json): 63개 흐름의 진입·종료·미수록 분기·교차 연결.',
  '- [R2 MCP 대조](_research/r2-mcp-comparison.json) · [R2 트리 대조](_research/r2-live-tree.json): 전체 단계·최신 200개 화면 집합·부모/자식 구조 재확인.',
  '- [조회 카탈로그](_research/catalog.json): Flow ID·부모/자식·MCP 단계 순서·Screen ID·원본 URL.',
  '- [이미지 매니페스트](_research/image-manifest.json): 고유 화면 200개의 크기·SHA-256·현재 Flow 파일 경로. `originalFile`은 삭제 전 원본 경로 기록이다.',
  '- [Flow 이미지 MCP 재조회](_research/flow-screens-source.json): 이미지 배치 시 다시 확인한 63개 Flow의 단계 순서·원본 URL·MCP 크기.',
  '- [Flow 이미지 매니페스트](_research/flow-image-manifest.json): 273개 파일의 단계·화면 ID·Flow 내 상대 경로·SHA-256. `sourceFile`은 현재 보관 파일, `originalSourceFile`은 최초 복사 당시 원본 경로다.',
  '- [화면 관찰 기록](_research/observations): 시각 확인 후 작성한 200개 화면별 관찰.',
  '- [흐름별 해석](_research/flow-profiles.json): 목적·연결의 한계·공식 자료 매핑.',
  '- [검증 결과](_research/validation.json): 문서·단계·로컬 링크·원본 및 Flow 이미지 무결성·누락·초과 검사.', '',
  '```powershell', 'node medium/_research/validate-docs.mjs', '```', '',
  '저장된 MCP 조회 결과와 원본으로 Flow 이미지와 문서를 다시 조립하려면 아래 순서로 실행한다. 이미지 동기화는 기존 파일이 일치하면 유지하고, 불일치·불필요한 파일이 있으면 중단한다. MCP를 새로 호출하는 명령은 아니다. 문서 생성은 63개 분석 문서와 이 색인·공식 자료 요약을 덮어쓰므로 수동 교정은 관찰 기록·흐름별 해석·생성기에도 반영해야 유지된다.', '',
  '```powershell',
  'node medium/_research/sync-flow-screens.mjs',
  'node medium/_research/generate-docs.mjs',
  'node medium/_research/validate-docs.mjs',
  '```', '',
  '## 남아 있는 검증', '',
  '실제 로그인·구매·발행·삭제·신고·공유를 실행하지 않았다. 실패·취소·권한 거부·오프라인·다른 계정·다른 기기 동기화는 각 문서 8절의 확인 항목이다. 현재 도움말과 과거 화면의 차이는 기존 캡처를 수정하지 않고 기록했다.', ''];
await fs.writeFile(path.join(root, 'README.md'), intro.join('\n'), 'utf8');
console.log(JSON.stringify({ flows: catalog.flows.length, stepReferences: totalSteps, reviewedUniqueImages: notes.size, officialSources: sources.length }));
