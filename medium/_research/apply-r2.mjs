import fs from 'node:fs/promises';
const dir = new URL('./', import.meta.url);
const read = async name => JSON.parse(await fs.readFile(new URL(name, dir), 'utf8'));
const write = async (name, value) => fs.writeFile(new URL(name, dir), JSON.stringify(value, null, 2) + '\n');
const audit = await read('r2-image-review.json');
const reviewed = new Set(audit.reviewedIndexes);
if (reviewed.size !== 200) throw Error('R2 review incomplete');
for (const file of await fs.readdir(new URL('observations/', dir))) {
  if (!file.endsWith('.json')) continue;
  const notes = await read('observations/' + file);
  for (const n of notes) {
    if (!reviewed.has(n.index)) throw Error('Unreviewed screen: ' + n.index);
    const patch = audit.patches.find(p => p.index === n.index);
    if (patch) {
      if (patch.set && !patch.before) patch.before = Object.fromEntries(Object.keys(patch.set).map(k => [k, n[k]]));
      Object.assign(n, patch.set || {});
      n.r2Notes = patch.add ? [patch.add] : [];
    } else n.r2Notes = [];
    n.r2ReviewedDate = audit.date;
    n.r2ReviewMethod = '로컬 원본을 390×844로 축소한 번호 포함 비교 시트에서 시각 재검토';
  }
  await write('observations/' + file, notes);
}
await write('r2-image-review.json', audit);
const sources = await read('sources.json');
const addSources = [
  {key:'blocking',title:'How to block and manage blocked users',url:'https://help.medium.com/hc/en-us/articles/217048077-How-to-block-and-manage-blocked-users',summary:'현재 도움말은 차단 시 피드·Digest 제외, 팔로우 불가, 상대 프로필은 보되 글은 볼 수 없음을 설명한다. 차단된 사용자의 로그인 상태 콘텐츠 접근·상호작용도 제한하며, 그 사용자의 리스트에 저장된 내 글은 제거된다고 안내한다. 캡처에는 차단 토스트 이후에도 글 카드가 보이므로 현재 규칙을 재현한 화면으로 단정하지 않는다.'},
  {key:'moderation',title:'Manage responses',url:'https://help.medium.com/hc/en-us/articles/217048127-Manage-responses',summary:'글·리스트 소유자는 응답 숨김과 토론 닫기를 관리할 수 있다. 현재 도움말에서 토론 닫기는 새 응답 작성과 기존 응답 수정을 막되 기존 응답은 남긴다. 이는 댓글 작성자의 자기 응답 삭제와 다른 동작이며, 이번 캡처에는 소유자의 관리 화면·닫힌 토론 상태가 없다.'},
  {key:'reporting',title:'Report posts, lists, and users',url:'https://help.medium.com/hc/en-us/articles/217047977-Report-posts-lists-and-users',summary:'신고에는 로그인이 필요하며 신고된 글·사용자는 Trust & Safety의 검토 대상이다. 접수 성공은 제재 확정이 아니다. 현재 도움말의 iOS 기사 신고 진입은 Share를 설명하지만 캡처에는 기사 더보기의 Report story도 보여 진입점 차이를 보존한다.'}
];
for (const s of addSources) {
  const item = {...s,checkedDate:audit.date,sourceType:'공식 도움말',addedIn:'R2'};
  const i = sources.findIndex(v => v.key === s.key);
  if (i < 0) sources.push(item); else sources[i] = item;
}
sources.find(s => s.key === 'auth').summary = '앱 이메일 인증은 6자리 코드와 Validate를 사용하며 로그인 링크를 받는 대안도 안내한다. 비밀번호는 지원하지 않는다. 링크의 2시간·일회 사용 규칙을 코드의 만료 시간으로 그대로 적용하지 않는다. 캡처에는 Receive a login link 선택지가 없다.';
sources.find(s => s.key === 'lists').summary = '글을 여러 리스트에 선택해 저장할 수 있고 공개 리스트 자체는 Saved lists에 저장한다. 리스트 설명은 선택 입력이다. 비공개 리스트는 본인만 접근하며 기본 Reading list는 삭제할 수 없다. 리스트별 글 메모·재정렬·제거와 다운로드 버튼 재탭을 통한 오프라인 사본 제거를 설명한다. 캡처에 없는 실행 결과는 검증 완료로 기록하지 않는다.';
sources.find(s => s.key === 'stats').summary = '현재 문서는 Views를 5초 이상, Reads를 30초 이상으로 설명하며 사용자·일 단위로 중복 제거한다. 월간 통계는 시간별 갱신이고 Lifetime은 발행 첫 달에는 시간별, 이후 매일 갱신한다. 캡처의 월간 Updated daily와 차이가 있으며 이 정의를 과거 캡처에 소급 적용하지 않는다.';
await write('sources.json', sources);
const profiles = await read('flow-profiles.json');
for (const p of profiles) {
  if (p.name === 'Profile') p.caveat = '발행 과정은 Home 아래 Publishing a story, 사진·소개·대명사 입력은 Profile 아래 편집 흐름에 있다. 부모 캡처 사이의 데이터 변화 원인을 임의로 채우지 않는다.';
  const extra = p.name === 'Blocking an author' ? ['blocking']
    : p.name === 'Reporting an author' ? ['reporting','blocking']
    : ['Responses','Commenting a story','Editing a response','Deleting a response','Replying a response'].includes(p.name) ? ['moderation'] : [];
  p.refs = [...new Set([...p.refs, ...extra])];
}
await write('flow-profiles.json', profiles);
console.log(JSON.stringify({reviewed:reviewed.size,screenCorrections:audit.patches.length,sources:sources.length}));
