import fs from 'node:fs/promises';
const dir = new URL('./', import.meta.url);
const read = async name => JSON.parse(await fs.readFile(new URL(name, dir), 'utf8'));
const catalog = await read('catalog.json');
const audit = await read('r2-image-review.json');
const mcp = await read('r2-mcp-comparison.json');
const tree = await read('r2-live-tree.json');
const reviews = await read('r2-flow-review.json');
const changed = new Set(audit.patches.map(p => p.index));
const index = new Map(catalog.screens.map(s => [s.id, s.index]));
const link = name => {
  const f = catalog.flows.find(f => f.flowName === name);
  if (!f) throw Error(name);
  return `[${name}](<flows/${f.path}/ANALYSIS.md>)`;
};
const out = ['# Medium R2 누락·내용 재검토', '',
  '검토일: 2026-11-18 KST. 요청 기준은 **빠진 흐름·화면·분석 내용이 있는지**다. 정적 캡처와 문서를 재검토했으며 실제 계정으로 기능을 실행하지 않았다.', '',
  '**구조상 누락은 발견하지 않았다. 내용에는 교정·보완할 부분이 있어 고유 화면 79개의 기록을 수정하고, 63개 흐름 전체에 진입·종료 범위, 미수록 분기, 관련 흐름과 공식 규칙을 보완했다.**', '',
  '## 1. 범위와 실제 확인', '',
  '| 검사 | 결과 | 방법·한계 |', '| --- | --- | --- |',
  `| 전체 흐름 트리 | ${tree.nodes}개, 최상위 ${tree.roots}개, 기존 구조와 일치 | Gummble 앱 페이지의 부모 ID·자식·자체 단계 수·순서를 재조회 |`,
  `| 흐름별 단계 | ${mcp.flows}개 흐름, ${mcp.stepReferences}개 단계 참조, ID·순서 차이 0 | MCP에서 63개 모두 다시 조회. 실패·잘림 없는 응답만 사용 |`,
  `| 최신 화면 집합 | version 1419의 ${mcp.appScreens}개와 보관 이미지 200개가 일치 | MCP 화면 목록을 마지막 페이지까지 조회. 단순 수량 비교가 아니라 ID 집합 비교 |`,
  '| 이미지 재검토 | 고유 200/200장 | 원본 PNG를 390×844로 축소한 번호 포함 비교 시트 34개를 모두 열어 확인. 원본 무수정 |',
  '| 문서 재검토 | 63/63개, 273/273 단계 참조 | 공유 이미지는 한 번 재검토하고 각 흐름의 시작·종료·분기 맥락을 별도 대조 |',
  '| 공식 자료 | 기존 23개 + R2 추가 3개 = 26개 | 차단·응답 관리·신고 직접 도움말 추가. 인증·리스트·통계 설명도 보강. 기존 23개 전부를 R2에서 새로 조회한 것은 아님 |',
  '| 계정·API·기기 재현 | 미수행 | 성공 토스트·버튼 상태와 실제 서버 저장·외부 계정 결과를 구분 |', '',
  '비교 시트는 작은 글씨를 확대 검증한 자료가 아니다. 식별 가능한 화면 내용만 기록했고 화면 밖·잘린 옵션·접근성 의미·실제 클릭 결과는 추정하지 않았다. 개별 캡처일·기기·OS·DPR은 확인되지 않았다.', '',
  '이번 범위는 기존 Medium iOS Latest 63개 흐름이다. 다른 역사 버전의 369개 화면, UI Elements 43개 개별 분석, Android·웹 전체 흐름은 이 문서 묶음의 대상에 포함되지 않는다.', '',
  '## 2. 발견한 문서화 누락과 교정', '',
  '| 항목 | R2 조치 | 예시 문서 |', '| --- | --- | --- |',
  `| 홈 카드 아이콘 오기 | For you의 원형 −를 저장 버튼으로 적은 부분을 수정. Featured의 북마크+와 구분 | ${link('Home')} |`,
  `| 가입·로그인 화면 재사용 | 로그인 흐름의 빈 코드 화면은 to sign up, 채워진 화면은 to sign in임을 명시. 공급자 4개/5개도 구분 | ${link('Logging in')} |`,
  `| 입력값과 활성 상태 | 빈 가입·로그인 폼의 녹색 CTA, 빈 메모 Done, 토픽 0/5 Save를 유효성 승인으로 단정하지 않음 | ${link('Adding a note')} · ${link('Adding topics')} |`,
  `| 확인한 규칙을 계속 미확인으로 기재 | 토픽 최대 5개, 기본 Reading list 삭제 불가, 대명사 Done 후 Save, 현재 Stats 정의와 과거 캡처의 차이를 정리 | ${link('Adding pronouns')} · ${link('Story stats')} |`,
  `| 흐름이 끝나는 지점 불명확 | 대명사는 Save 전, 아이콘은 잠금 안내, Digest settings는 현황 조회까지임을 명시 | ${link('Custom app icon')} · ${link('Digest settings')} |`,
  `| 단일 세션으로 오해할 변화 | 리스트 상대 시각 역행·Reading list 3→4·작가 집계·댓글 총수 차이를 별도 기록 | ${link('List detail')} · ${link('Deleting a list')} |`,
  `| 비슷한 동작의 대상 혼동 | 리스트 저장/기사 저장, 공유 이미지 저장/오프라인 다운로드, 메모/비공개 메시지, 전체 삭제/항목 제거를 구분 | ${link('Removing a story')} · ${link('Downloading an image')} |`,
  `| 성공 표시와 실제 결과 | Undo 존재와 복구 실행, 공유 아이콘과 접근 권한, +16 피드백과 서버 집계, 신고와 차단을 분리 | ${link('Sending claps')} · ${link('Reporting an author')} |`,
  `| 공식 설명 연결 부족 | 각 문서 6절에 실제 규칙 요약을 넣고 직접 도움말 3개 추가. 차단 후 글 카드와 현재 정책의 불일치 명시 | ${link('Blocking an author')} · [공식 자료](SOURCES.md) |`,
  `| 메뉴는 있지만 후속 화면 없음 | Edit list info, Muted, Saved lists, Library Reading history, 계정·결제 등의 미수록 범위를 명시 | ${link('Library')} · ${link('Settings')} |`, '',
  '79개는 보완·교정한 고유 화면 기록의 수다. 79개 오류나 79개 누락 흐름이라는 뜻은 아니다. 동일 화면을 사용하는 여러 문서에 같은 교정이 반영될 수 있다.', '',
  '추가로 프로젝트의 UX 규칙·최초 Medium 조사 기록·구현 현황 문서에 남아 있던 10장 조사 상태를 현재 전체 조사와 구분해 연결했다. 최초 조사의 수치는 이력으로 보존했고, 소개 화면의 멤버십 시작 월을 계정 가입일로 읽을 수 있는 표현도 교정했다. 제품 범위·구현 코드는 변경하지 않았다.', '',
  '## 3. 원본에 없어 완료할 수 없는 분석', '',
  '아래는 폴더·문서 생성 누락이 아니라 자료의 빈 구간이다. 본문에서 메뉴 존재나 문서 규칙까지 기록하고 실제 결과를 미확인으로 남겼다.', '',
  '| 영역 | 추가로 필요한 근거 |', '| --- | --- |',
  '| 인증·구독 | 소셜 OAuth 완료/취소, 이메일 오류·만료·재전송, 스토어 구매 취소·실패·영수증·복원 |',
  '| 탐색·설정 | Muted·Saved lists·Library Reading history, 다른 검색 결과 유형, Account·Membership and payment·Email·More app controls의 하위 화면 |',
  '| 작성·읽기 | Publication 제출, Unlisted On, 미리보기 Edit, 글꼴 목록, 코드 서식·초안 재개·발행 실패 |',
  '| 리스트 | Edit list info 폼, Undo 실행, 다운로드 중단·실패·오프라인 읽기, 비공개/삭제 후 타인 계정의 접근 |',
  '| 응답·관계 | 타인 메뉴, 응답 0건·닫힌 토론·숨김, 삭제된 부모의 답글 처리, 차단·음소거 해제와 상대 계정 결과 |',
  '| 공유·오디오 | Friend Link·Share via·공유 카드 변형·사진 권한·실제 파일, AirPlay·음성 청취·오프라인/백그라운드 재생 |',
  '| 표시·프로필 | Tailored for you 옵션·하단 잘린 푸시 항목, 아이콘 전체 목록·잠금 해제·OS 결과, 프로필 경계값·실패·테마 재시작 유지 |',
  '| 접근성·실행 품질 | 스크린리더 이름·포커스 순서·터치 영역·OS 큰 글자, 실제 로딩 시간·실패 복구·동기화·서버 권한 |', '',
  '## 4. 흐름별 확인표', '',
  '| 흐름 | 재검토 단계 | 보완된 화면 참조 | 진입·종료·미수록 분기 검토 |', '| --- | ---: | ---: | --- |',
  ...catalog.flows.map(f => {
    if (!reviews.some(r => r.name === f.flowName)) throw Error('Missing flow review');
    return `| ${link(f.flowName)} | ${f.screens.length}/${f.screens.length} | ${f.screens.filter(s => changed.has(index.get(s.id))).length} | 완료 — 각 문서 2·8절 |`;
  }), '',
  '## 5. 재검증과 수정 보존', '',
  '- [이미지 재검토·교정 기록](_research/r2-image-review.json): 검토 인덱스 200개와 변경한 기존 필드·보완 내용.',
  '- [흐름별 재검토 기록](_research/r2-flow-review.json): 63개 흐름의 진입·종료·미수록 분기·교차 연결.',
  '- [MCP 재조회 대조](_research/r2-mcp-comparison.json) · [실시간 트리 대조](_research/r2-live-tree.json).',
  '- [검증 결과](_research/validation.json): 문서 구조·순서·링크·이미지 해시 및 R2 반영 범위. 외부 URL은 문서 참조 수이며 모두 HTTP 접속 검사한 수가 아니다.', '',
  '```powershell', 'node medium/_research/generate-docs.mjs', 'node medium/_research/write-review-r2.mjs', 'node medium/_research/validate-docs.mjs', '```', '',
  '생성 문서의 교정은 `_research/observations`, `r2-flow-review.json`, `sources.json`, 생성기에 보존했다. 재생성해도 R2 보완이 유지된다. 이 검증은 문서 검증이며 앱 동작·실제 계정·API 테스트 통과를 의미하지 않는다.', ''];
await fs.writeFile(new URL('../REVIEW_R2.md', dir), out.join('\n'));
console.log('REVIEW_R2.md written');
