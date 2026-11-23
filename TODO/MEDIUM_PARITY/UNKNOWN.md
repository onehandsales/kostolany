# 미확인 항목과 범위 판정

[요약](../FE_MEDIUM_PARITY_AUDIT.md) · [보완 작업](../FE_MEDIUM_PARITY_BACKLOG.md#q03)

원본 수집 완전성과 원본에 모든 실행 결과가 있다는 주장은 다르다. 이 목록은 새 화면 수집이 누락됐다는 판정이 아니다. 각 미확인 문구를 보존하고 확인/자체 보완/의도적 제외 중 어떤 근거로 처리할지 담당을 배정한다. 이미 mock이 있더라도 원본 동일성은 확인되지 않은 채 남는다. 한 행에 여러 경계가 있으면 그 경계를 모두 판정해야 닫을 수 있다.

공통 종료 조건: 원본 또는 보관 공식 설명의 근거·해당 시점, 현재 FE 정책·코드, 구현 대상/자료 확인 대기/명시적 제외 판정, 영향받는 화면과 회귀 검증을 항목별 기록한다. 외부 서비스·알고리즘·영속성은 캡처만으로 확정하지 않는다.
<a id="u-s001"></a>

### U-S001
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):266
- 미확인 내용: 본인 하이라이트 영향·영속성
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G24](CONTRACTS.md#g24), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s002"></a>

### U-S002
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):202
- 미확인 내용: 타인 공개·다른 리스트의 동일 기사 영향
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s003"></a>

### U-S003
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):111
- 미확인 내용: AirPlay 연결·음성 전환 결과
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G46](CONTRACTS.md#g46), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s004"></a>

### U-S004
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>):107
- 미확인 내용: 카테고리 하위 구조
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s005"></a>

### U-S005
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):80
- 미확인 내용: 즉시 업로드와 최종 저장 구분
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s006"></a>

### U-S006
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):329
- 미확인 내용: 선택 해제 및 서버 저장 실패 동작은 수록되지 않았다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G41](CONTRACTS.md#g41), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s007"></a>

### U-S007
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>):109
- 미확인 내용: +16의 누적 범위·실제 요청 수·서버 저장은 미확인. 공식 문서의 1인당 최대 50회 규칙은 6절에서 별도 확인했다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s008"></a>

### U-S008
- Parity 3 후속: [현재 결과](../FE_MEDIUM_PARITY_03_RESULT.md). 보관 화면의 발췌/도구를 구현했으나 전문·현재 버전·실제 Medium 실행은 새로 확인하지 않았다. 미확인 유지.
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>):107
- 미확인 내용: 현재 정책과 캡처 버전 차이
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s009"></a>

### U-S009
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>):140
- 미확인 내용: 문구 재사용 이유·실제 편집 모드 계약
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s010"></a>

### U-S010
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>):170
- 미확인 내용: 취소 시 기존 내용 복원
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s011"></a>

### U-S011
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/ANALYSIS.md>):139
- 미확인 내용: 글 추가 과정 미수록·카드 다운로드 아이콘 의미
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s012"></a>

### U-S012
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>):138
- 미확인 내용: 타 기기 동기화·삭제·공개 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G27](CONTRACTS.md#g27), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s013"></a>

### U-S013
- 원본: [ANALYSIS.md](<../../medium/flows/Logging in/ANALYSIS.md>):204
- 미확인 내용: 발송 성공·만료 시간·재전송 제한은 화면만으로 알 수 없다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s014"></a>

### U-S014
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):171
- 미확인 내용: 리스트 반응·글 반응의 저장 계약과 중복 집계 규칙은 미확인.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G32](CONTRACTS.md#g32), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s015"></a>

### U-S015
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>):169
- 미확인 내용: 알림 발송 시점·대상 삭제 시 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G38](CONTRACTS.md#g38), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s016"></a>

### U-S016
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>):109
- 미확인 내용: 최소·최대·증분·WPM 계산
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G46](CONTRACTS.md#g46), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s017"></a>

### U-S017
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):199
- 미확인 내용: 삭제 확인·되돌리기 지원
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s018"></a>

### U-S018
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):169
- 미확인 내용: 중첩·번호 목록·줄바꿈 규칙
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s019"></a>

### U-S019
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>):140
- 미확인 내용: 입력 제한·인용 삭제 가능 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s020"></a>

### U-S020
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/ANALYSIS.md>):112
- 미확인 내용: 미발행 초안 포함 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s021"></a>

### U-S021
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/ANALYSIS.md>):111
- 미확인 내용: 인기 집계 기간·정렬 알고리즘
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s022"></a>

### U-S022
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):202
- 미확인 내용: 변경 시점·현재 계정 일치 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s023"></a>

### U-S023
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):81
- 미확인 내용: 발행 권한·입력 검증·공개 범위 실제 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G39](CONTRACTS.md#g39), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s024"></a>

### U-S024
- 원본: [ANALYSIS.md](<../../medium/flows/Logging in/ANALYSIS.md>):173
- 미확인 내용: 전송 성공·이메일 소유권 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s025"></a>

### U-S025
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>):169
- 미확인 내용: 서버 저장·재시작 유지
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s026"></a>

### U-S026
- 원본: [ANALYSIS.md](<../../medium/flows/Home/ANALYSIS.md>):110
- 미확인 내용: 페이지네이션·새로고침·중복 제거
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s027"></a>

### U-S027
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):232
- 미확인 내용: 이 자식 흐름에는 Save 실행·저장 후 재진입이 없다. 공식 도움말은 Done 후 상위 프로필 Save를 요구한다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s028"></a>

### U-S028
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>):170
- 미확인 내용: 사진 권한 요청·저장 형식
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G47](CONTRACTS.md#g47), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s029"></a>

### U-S029
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):142
- 미확인 내용: 검색 일치 규칙·동일 표시명 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G39](CONTRACTS.md#g39), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s030"></a>

### U-S030
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>):107
- 미확인 내용: 발행물 제출 자격·현재 초안 저장 보장
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G38](CONTRACTS.md#g38), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s031"></a>

### U-S031
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):109
- 미확인 내용: 스타일 이름·적용 범위 내부 표현
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s032"></a>

### U-S032
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>):138
- 미확인 내용: 동일 시각 정렬·커서 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s033"></a>

### U-S033
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>):139
- 미확인 내용: 작가·발행물·토픽 섹션 정렬
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s034"></a>

### U-S034
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>):108
- 미확인 내용: 로컬 캐시·다른 기기 세션 영향
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s035"></a>

### U-S035
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):360
- 미확인 내용: 팔로우 없이 완료 가능한지, 추천 정렬 기준
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G41](CONTRACTS.md#g41), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s036"></a>

### U-S036
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>):109
- 미확인 내용: 체크 즉시 저장인지 Done 확정인지
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s037"></a>

### U-S037
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/ANALYSIS.md>):113
- 미확인 내용: 현재 계정 권한·본문 게이트·집계 정확값
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s038"></a>

### U-S038
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>):139
- 미확인 내용: 비공개 리스트 누락 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s039"></a>

### U-S039
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Creating a list/ANALYSIS.md>):169
- 미확인 내용: 공개 조회·영속성
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s040"></a>

### U-S040
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>):138
- 미확인 내용: 실제 수신 중단·기기 동기화
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G44](CONTRACTS.md#g44), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s041"></a>

### U-S041
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):269
- 미확인 내용: 문구상 기존 사용자의 경험 갱신일 수도 있어 신규 가입 전용 단계로 단정하지 않는다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G41](CONTRACTS.md#g41), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s042"></a>

### U-S042
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):117
- 미확인 내용: 빈 문서 Next 동작·자동 저장 시점
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s043"></a>

### U-S043
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):87
- 미확인 내용: 표시 시간과 세션 복원·자동 이동 조건은 정적 이미지로 알 수 없다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G41](CONTRACTS.md#g41), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s044"></a>

### U-S044
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):359
- 미확인 내용: 링크 접근의 인증·검색엔진 노출 조건
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G39](CONTRACTS.md#g39), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s045"></a>

### U-S045
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>):108
- 미확인 내용: 삭제 완료 영속성·복구 가능성
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s046"></a>

### U-S046
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):142
- 미확인 내용: 실제 전환 후 음성·언어 지원 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G46](CONTRACTS.md#g46), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s047"></a>

### U-S047
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/ANALYSIS.md>):232
- 미확인 내용: 대명사 다른 화면 노출·사진 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s048"></a>

### U-S048
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>):109
- 미확인 내용: 프로필 내 정렬·배지 현재 조건
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s049"></a>

### U-S049
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>):109
- 미확인 내용: 이메일 발송·기존 기본값 유지 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s050"></a>

### U-S050
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):140
- 미확인 내용: 실제 음성 출력·백그라운드 지속
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s051"></a>

### U-S051
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>):140
- 미확인 내용: 클립보드 실제 URL·유효 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G47](CONTRACTS.md#g47), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s052"></a>

### U-S052
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Reading history/ANALYSIS.md>):107
- 미확인 내용: 개별 삭제 확인·되돌리기
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s053"></a>

### U-S053
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/ANALYSIS.md>):172
- 미확인 내용: 편집 추천 선정 근거·개인 추천 로직
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s054"></a>

### U-S054
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):178
- 미확인 내용: 입력값이 유효하다는 서버 판정이나 가입 완료는 아직 입증되지 않는다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s055"></a>

### U-S055
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):171
- 미확인 내용: 음원 실제 길이·탐색·다음 기사 조건
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s056"></a>

### U-S056
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):264
- 미확인 내용: Viewed 조건·다운로드 상태와 구분
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s057"></a>

### U-S057
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Topic detail/ANALYSIS.md>):106
- 미확인 내용: 토픽 간 계층인지 관련성인지
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G30](CONTRACTS.md#g30), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s058"></a>

### U-S058
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):203
- 미확인 내용: 이미지 밝기 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s059"></a>

### U-S059
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):112
- 미확인 내용: 혜택 실제 이용 조건 및 현재 가격
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G48](CONTRACTS.md#g48), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s060"></a>

### U-S060
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):147
- 미확인 내용: 저장 완료·글자 제한·제목 필수 검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s061"></a>

### U-S061
- 원본: [ANALYSIS.md](<../../medium/flows/Home/ANALYSIS.md>):171
- 미확인 내용: 직전 빈 상태 이후 팔로우 변화는 화면만으로 확정 불가
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s062"></a>

### U-S062
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>):139
- 미확인 내용: 서버 생성·다른 사용자 가시성
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s063"></a>

### U-S063
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):145
- 미확인 내용: 기기·계정 동기화 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G24](CONTRACTS.md#g24), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s064"></a>

### U-S064
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):239
- 미확인 내용: 코드가 서버에서 유효한지는 다음 화면과 별도로 확인해야 한다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s065"></a>

### U-S065
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):173
- 미확인 내용: 중복 추가 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G39](CONTRACTS.md#g39), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s066"></a>

### U-S066
- 원본: [ANALYSIS.md](<../../medium/flows/Library/ANALYSIS.md>):140
- 미확인 내용: 글 추가 경로·정렬
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s067"></a>

### U-S067
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):299
- 미확인 내용: 화면 밖의 선택 상태·주제 전체 수·저장 시점은 미확인이다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G41](CONTRACTS.md#g41), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s068"></a>

### U-S068
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Notifications/ANALYSIS.md>):108
- 미확인 내용: 녹색선이 읽음 여부인지·이벤트 날짜는 캡처일 아님
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G44](CONTRACTS.md#g44), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s069"></a>

### U-S069
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/ANALYSIS.md>):81
- 미확인 내용: 추천 알고리즘·개인화 저장·카드 전체 클릭 영역
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s070"></a>

### U-S070
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/ANALYSIS.md>):141
- 미확인 내용: 토픽 전체 목록·개인화 순서
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s071"></a>

### U-S071
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>):169
- 미확인 내용: 총수 미변화가 집계 규칙인지 갱신 지연인지 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s072"></a>

### U-S072
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>):109
- 미확인 내용: 대상 삭제·권한 변경 시 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s073"></a>

### U-S073
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>):107
- 미확인 내용: 실제 앨범 파일·해상도·권한 거부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G47](CONTRACTS.md#g47), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s074"></a>

### U-S074
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/ANALYSIS.md>):172
- 미확인 내용: 타인 프로필에서 비공개 숨김 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s075"></a>

### U-S075
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Custom app icon/ANALYSIS.md>):107
- 미확인 내용: 실제 OS 아이콘 변경·구독별 현재 조건
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G49](CONTRACTS.md#g49), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s076"></a>

### U-S076
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Creating a list/ANALYSIS.md>):109
- 미확인 내용: 이름 공백·중복 검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s077"></a>

### U-S077
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>):202
- 미확인 내용: 재진입·타기기 순서 유지
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s078"></a>

### U-S078
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>):141
- 미확인 내용: 드래그 접근성·동시 편집 충돌
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s079"></a>

### U-S079
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/ANALYSIS.md>):202
- 미확인 내용: 노출·추천 이유
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s080"></a>

### U-S080
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):141
- 미확인 내용: 다국어·사용자 정의 값 지원
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s081"></a>

### U-S081
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>):110
- 미확인 내용: 소유권·공유 편집자 권한
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s082"></a>

### U-S082
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):111
- 미확인 내용: 자유 입력 허용 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s083"></a>

### U-S083
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>):170
- 미확인 내용: 작성 가능한 소개 형식·이력 공개 조건
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s084"></a>

### U-S084
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):142
- 미확인 내용: 결제창 진입·승인·실패 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G48](CONTRACTS.md#g48), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s085"></a>

### U-S085
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>):171
- 미확인 내용: 원문·타인 저장·캐시 정리 결과
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s086"></a>

### U-S086
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):143
- 미확인 내용: 다른 콘텐츠는 테마 변경의 결과로 단정 불가
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s087"></a>

### U-S087
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):207
- 미확인 내용: 검색 요청·사용권·출처 보존 계약
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G37](CONTRACTS.md#g37), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s088"></a>

### U-S088
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):202
- 미확인 내용: 실제 오디오 발화·설정 영속성
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G46](CONTRACTS.md#g46), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s089"></a>

### U-S089
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>):139
- 미확인 내용: 비행기 모드 재현·캐시 만료 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G35](CONTRACTS.md#g35), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s090"></a>

### U-S090
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>):107
- 미확인 내용: 누구의 목록인지 단독 화면에 제목 없음·진입 맥락 필요
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s091"></a>

### U-S091
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):110
- 미확인 내용: 이전 Life에서의 선택 과정
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G30](CONTRACTS.md#g30), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s092"></a>

### U-S092
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>):139
- 미확인 내용: 중복·실패 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s093"></a>

### U-S093
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>):168
- 미확인 내용: 집계·탭 차이가 차단 때문인지 시점·버전 차이인지 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G29](CONTRACTS.md#g29), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s094"></a>

### U-S094
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):201
- 미확인 내용: 중복 선택·순서 변경
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s095"></a>

### U-S095
- 원본: [ANALYSIS.md](<../../medium/flows/Library/ANALYSIS.md>):110
- 미확인 내용: 기본 Reading list의 자동 생성 시점·빈 목록 다운로드 동작은 미확인. 기본 리스트 삭제 불가는 공식 도움말에서 확인했다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s096"></a>

### U-S096
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>):139
- 미확인 내용: 선택 즉시 조회 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s097"></a>

### U-S097
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>):110
- 미확인 내용: 인용 길이·편집·원문 연결 방식
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s098"></a>

### U-S098
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>):138
- 미확인 내용: 다른 유형 결과·정렬·검색 없음 상태
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s099"></a>

### U-S099
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):111
- 미확인 내용: 추천 산출·팔로우 즉시 반영 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s100"></a>

### U-S100
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>):109
- 미확인 내용: 최대 깊이·전체 수 집계 규칙
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s101"></a>

### U-S101
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>):202
- 미확인 내용: 공유 버튼 잔존 시 접근 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s102"></a>

### U-S102
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/ANALYSIS.md>):264
- 미확인 내용: 추천 정렬·무한 스크롤
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s103"></a>

### U-S103
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>):139
- 미확인 내용: 해제 확인·알림 설정 보존
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s104"></a>

### U-S104
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):172
- 미확인 내용: 다른 캡처 계정 상태와 연속성
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s105"></a>

### U-S105
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>):141
- 미확인 내용: 타인 저장 목록 실제 제거·재공개 복원
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s106"></a>

### U-S106
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/ANALYSIS.md>):108
- 미확인 내용: 빈 리스트 공개·다운로드 동작
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s107"></a>

### U-S107
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):140
- 미확인 내용: 리스트 기사 순서·추천 갱신
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G30](CONTRACTS.md#g30), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s108"></a>

### U-S108
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):233
- 미확인 내용: 색약·명암 대비 수치 미검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s109"></a>

### U-S109
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>):171
- 미확인 내용: 타인 접근 차단 실제 재현 없음
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s110"></a>

### U-S110
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):112
- 미확인 내용: 기사 표시 설정과 같은 저장값인지
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G49](CONTRACTS.md#g49), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s111"></a>

### U-S111
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>):108
- 미확인 내용: 관련도 계산식
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s112"></a>

### U-S112
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>):139
- 미확인 내용: 페이지 크기·edited 시각 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s113"></a>

### U-S113
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):174
- 미확인 내용: 위치 메타데이터 실제 전송·제거 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s114"></a>

### U-S114
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>):140
- 미확인 내용: 메모·오프라인 캐시·복구 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s115"></a>

### U-S115
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):203
- 미확인 내용: 저장 취소 시 유지 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G39](CONTRACTS.md#g39), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s116"></a>

### U-S116
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>):169
- 미확인 내용: 과거 콘텐츠 불변성·캐시
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s117"></a>

### U-S117
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):148
- 미확인 내용: 필수값 판정 시점과 실제 계정 생성 API는 보이지 않는다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s118"></a>

### U-S118
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):112
- 미확인 내용: 최대 초과 시 UI·저장 실패
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G39](CONTRACTS.md#g39), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s119"></a>

### U-S119
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):205
- 미확인 내용: 시스템 테마 변경 즉시 반영
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G24](CONTRACTS.md#g24), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s120"></a>

### U-S120
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):171
- 미확인 내용: 최대4 초과 상태
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s121"></a>

### U-S121
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>):108
- 미확인 내용: Undo 시간·메모와 순서 복구
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s122"></a>

### U-S122
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>):108
- 미확인 내용: 선택 앵커·문서 수정 후 범위 복원
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G27](CONTRACTS.md#g27), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s123"></a>

### U-S123
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):114
- 미확인 내용: 이름의 공백·중복·50자 초과 처리, 프로필 Save 실패와 취소 복원은 미수록.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s124"></a>

### U-S124
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>):139
- 미확인 내용: 삭제 확인 단계·복구·자식 답글 영향 미수록
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s125"></a>

### U-S125
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):175
- 미확인 내용: 최대·최소·접근성 OS 글자 크기와 관계
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G24](CONTRACTS.md#g24), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s126"></a>

### U-S126
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):237
- 미확인 내용: 업로드인지 다운로드인지 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G37](CONTRACTS.md#g37), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s127"></a>

### U-S127
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>):171
- 미확인 내용: 필수값 서버 검증·중복 신고
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G29](CONTRACTS.md#g29), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s128"></a>

### U-S128
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):110
- 미확인 내용: 음원 생성·다운로드·권한 단계
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s129"></a>

### U-S129
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):421
- 미확인 내용: 실제 청구·세금·지역·현재 가격은 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G48](CONTRACTS.md#g48), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s130"></a>

### U-S130
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>):106
- 미확인 내용: 기존 이메일 구독 종료 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s131"></a>

### U-S131
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>):140
- 미확인 내용: 안내 수치 근거·즉시 적용 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G46](CONTRACTS.md#g46), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s132"></a>

### U-S132
- 원본: [ANALYSIS.md](<../../medium/flows/Library/ANALYSIS.md>):170
- 미확인 내용: 화면 날짜는 캡처일이 아님·생성 기준 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s133"></a>

### U-S133
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):172
- 미확인 내용: 실제 결제 영수증·상품 ID·자동 갱신 상태
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G48](CONTRACTS.md#g48), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s134"></a>

### U-S134
- 원본: [ANALYSIS.md](<../../medium/flows/Logging in/ANALYSIS.md>):235
- 미확인 내용: 만료·오입력·재전송 제한·세션 생성 결과
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s135"></a>

### U-S135
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):201
- 미확인 내용: 저장 시 업데이트 알림·소유자 팔로우 관계
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G32](CONTRACTS.md#g32), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s136"></a>

### U-S136
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):264
- 미확인 내용: 소개는 About에서 별도 확인 필요
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s137"></a>

### U-S137
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):267
- 미확인 내용: 자동 저장 성공 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s138"></a>

### U-S138
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):234
- 미확인 내용: 초과·중복·순서 검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s139"></a>

### U-S139
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>):138
- 미확인 내용: 자동 저장 트리거·충돌·오프라인 동기화
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G38](CONTRACTS.md#g38), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s140"></a>

### U-S140
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/ANALYSIS.md>):234
- 미확인 내용: 미리보기 개수 정책
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s141"></a>

### U-S141
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>):170
- 미확인 내용: 남은 시간 계산·위치 재설정 원인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s142"></a>

### U-S142
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>):201
- 미확인 내용: 수정 이력·수정 제한
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s143"></a>

### U-S143
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>):108
- 미확인 내용: 음소거·차단·신고의 정확한 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G29](CONTRACTS.md#g29), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s144"></a>

### U-S144
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):294
- 미확인 내용: 앱 재시작·다른 기기 적용
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s145"></a>

### U-S145
- 원본: [ANALYSIS.md](<../../medium/flows/Library/ANALYSIS.md>):201
- 미확인 내용: 정렬·원문 삭제 시 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s146"></a>

### U-S146
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):233
- 미확인 내용: 토픽 6번째 선택 시 UI·삭제·순서·서버 검증은 미확인. 최대 5개 안내는 토픽 선택 화면 및 공식 문서에서 확인했다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G39](CONTRACTS.md#g39), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s147"></a>

### U-S147
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/ANALYSIS.md>):174
- 미확인 내용: 외부 링크 동작·토픽 추천 연결
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s148"></a>

### U-S148
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):177
- 미확인 내용: 카메라·사진 권한 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G37](CONTRACTS.md#g37), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s149"></a>

### U-S149
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/ANALYSIS.md>):138
- 미확인 내용: 이 버전이 모든 flow에 동일한지는 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G49](CONTRACTS.md#g49), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s150"></a>

### U-S150
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Story stats/ANALYSIS.md>):171
- 미확인 내용: 월간11/2와 글별0/0 차이 원인 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G43](CONTRACTS.md#g43), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s151"></a>

### U-S151
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>):169
- 미확인 내용: 클릭 실패·동기화
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s152"></a>

### U-S152
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>):137
- 미확인 내용: 실제 피드 재조회·알림 수신·검색 결과는 미검증. 공식 음소거 도움말의 피드·Digest 제외 범위는 6절과 구분해 확인한다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G29](CONTRACTS.md#g29), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s153"></a>

### U-S153
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Story stats/ANALYSIS.md>):140
- 미확인 내용: 선택한 일자 집계·전체 합계 라벨 관계
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G43](CONTRACTS.md#g43), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s154"></a>

### U-S154
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):172
- 미확인 내용: 선택 음성이 기사 번역을 의미하는지는 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G46](CONTRACTS.md#g46), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s155"></a>

### U-S155
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Creating a list/ANALYSIS.md>):139
- 미확인 내용: 서버 필수값·초과 검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s156"></a>

### U-S156
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):144
- 미확인 내용: 사진 권한·크롭·업로드 실패
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s157"></a>

### U-S157
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>):171
- 미확인 내용: 취소 복원·부분 저장 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s158"></a>

### U-S158
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>):108
- 미확인 내용: 문자 제한·중복 전송·빈값 검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s159"></a>

### U-S159
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):202
- 미확인 내용: 권한 반영 시점·다른 기기 동기화
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G48](CONTRACTS.md#g48), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s160"></a>

### U-S160
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):201
- 미확인 내용: 경과가 자연 재생인지 탐색 입력인지
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s161"></a>

### U-S161
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>):140
- 미확인 내용: 사유별 추가 입력·신고 기준
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G29](CONTRACTS.md#g29), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s162"></a>

### U-S162
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Filtering digest/Digest settings/ANALYSIS.md>):107
- 미확인 내용: 다른 주기 옵션·발송 시간·외부 설정 결과 미수록
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G44](CONTRACTS.md#g44), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s163"></a>

### U-S163
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>):110
- 미확인 내용: Friend Link 권한·외부 앱 전송 결과
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G47](CONTRACTS.md#g47), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s164"></a>

### U-S164
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):326
- 미확인 내용: 이미지 색상 반전·스크롤 위치 복원
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s165"></a>

### U-S165
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>):108
- 미확인 내용: 네트워크 실패·중단·부분 다운로드
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G35](CONTRACTS.md#g35), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s166"></a>

### U-S166
- 원본: [ANALYSIS.md](<../../medium/flows/Logging in/ANALYSIS.md>):81
- 미확인 내용: 각 공급자의 인증 완료·취소·오류 결과는 이 화면에 없다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s167"></a>

### U-S167
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/ANALYSIS.md>):202
- 미확인 내용: Add a short bio의 실제 이동 대상·소개 저장 실패는 미수록. 짧은 소개 160자 표시는 편집 화면 및 공식 문서에서 확인했다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s168"></a>

### U-S168
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):114
- 미확인 내용: 각 행동 결과·권한
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G24](CONTRACTS.md#g24), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s169"></a>

### U-S169
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/ANALYSIS.md>):142
- 미확인 내용: 조회 시점·집계 지연
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s170"></a>

### U-S170
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>):201
- 미확인 내용: 운영 검토·제재 결과는 미수록
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G29](CONTRACTS.md#g29), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s171"></a>

### U-S171
- 원본: [ANALYSIS.md](<../../medium/flows/Logging in/ANALYSIS.md>):143
- 미확인 내용: 이메일 형식 검증·계정 없음 처리
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s172"></a>

### U-S172
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>):139
- 미확인 내용: 다중 리스트 저장 해제 규칙
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s173"></a>

### U-S173
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/ANALYSIS.md>):107
- 미확인 내용: 각 계정·결제 하위 화면 미수록
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G49](CONTRACTS.md#g49), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s174"></a>

### U-S174
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/ANALYSIS.md>):232
- 미확인 내용: 추가 페이지 로딩 방식
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s175"></a>

### U-S175
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/ANALYSIS.md>):204
- 미확인 내용: 정렬 기준·응답 총수의 답글 포함 여부
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s176"></a>

### U-S176
- 원본: [ANALYSIS.md](<../../medium/flows/Home/ANALYSIS.md>):140
- 미확인 내용: 빈 상태의 서버 원인·팔로우 개수
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s177"></a>

### U-S177
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):79
- 미확인 내용: 정렬 기준·중복 기사 허용
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s178"></a>

### U-S178
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):389
- 미확인 내용: 실제 공개 URL·외부 계정 조회 결과
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s179"></a>

### U-S179
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>):139
- 미확인 내용: 재진입 시 박수 수·취소 동작
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s180"></a>

### U-S180
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>):108
- 미확인 내용: 최소 검색 길이·검색 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G38](CONTRACTS.md#g38), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s181"></a>

### U-S181
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>):108
- 미확인 내용: 타인 메뉴·서버 소유권 검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s182"></a>

### U-S182
- 원본: [ANALYSIS.md](<../../medium/flows/Logging in/ANALYSIS.md>):112
- 미확인 내용: 공급자별 실제 OAuth 경로
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s183"></a>

### U-S183
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):139
- 미확인 내용: 인용 반복 탭·해제 방식
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s184"></a>

### U-S184
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):390
- 미확인 내용: OS 권한 팝업 및 실제 허용 결과 미수록
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G41](CONTRACTS.md#g41), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s185"></a>

### U-S185
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):173
- 미확인 내용: 대비·OS 접근성 검증 미수행
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G50](CONTRACTS.md#g50), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s186"></a>

### U-S186
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>):108
- 미확인 내용: 화면 아래 미노출 항목·OS 권한·빈도 옵션
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G44](CONTRACTS.md#g44), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s187"></a>

### U-S187
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):296
- 미확인 내용: 글꼴 선택 옵션은 미수록
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s188"></a>

### U-S188
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Story stats/ANALYSIS.md>):110
- 미확인 내용: 과거 캡처의 View·Read 계산식·중복 제거·집계 지연은 미확인. 현재 도움말의 5초·30초 및 사용자/일 중복 제거 규칙을 과거에 소급 적용하지 않는다.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G43](CONTRACTS.md#g43), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s189"></a>

### U-S189
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/ANALYSIS.md>):143
- 미확인 내용: 강조가 개인 것인지 인기 강조인지 화면만으로 미확인
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s190"></a>

### U-S190
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):142
- 미확인 내용: 읽음 판정 기준·기록 보존 기간
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s191"></a>

### U-S191
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):171
- 미확인 내용: 수정·삭제·서버 검증
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s192"></a>

### U-S192
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):233
- 미확인 내용: 선택 음성 이름이 안 보여 실제 적용은 청취 필요
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s193"></a>

### U-S193
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>):109
- 미확인 내용: 발행 주기·누락 날짜·보관 기한·표시 시간대는 미확인.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s194"></a>

### U-S194
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>):109
- 미확인 내용: 필터 유지 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s195"></a>

### U-S195
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):110
- 미확인 내용: 리스트에서 제거한 뒤 다른 리스트·다운로드 사본·메모가 유지되는지는 미검증.
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s196"></a>

### U-S196
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>):139
- 미확인 내용: 결과 정렬·페이지네이션
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G38](CONTRACTS.md#g38), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s197"></a>

### U-S197
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>):171
- 미확인 내용: 총수 갱신·원문 이동 동작
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s198"></a>

### U-S198
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):235
- 미확인 내용: 앱 전체·기사별 적용 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G24](CONTRACTS.md#g24), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s199"></a>

### U-S199
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>):138
- 미확인 내용: 상대 계정에서의 접근·반응 제한
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G29](CONTRACTS.md#g29), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-s200"></a>

### U-S200
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):141
- 미확인 내용: 빈값 Done·최대 길이·메모 공개 범위
- 현재 판정: 원본 미확인 유지; 구현의 mock 기본안/검증과 원본 동일성은 별도 판정
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G22](CONTRACTS.md#g22)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f01"></a>

### U-F01
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/ANALYSIS.md>):277
- 미확인 내용: 추천 갱신·모든 캐러셀 항목·Follow 결과·로딩·실패·빈 상태.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f02"></a>

### U-F02
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Searching Medium/ANALYSIS.md>):177
- 미확인 내용: People·Publications·Topics·Lists 내용, 입력 중 추천·0건·오타·취소·실패·페이지네이션.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f03"></a>

### U-F03
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Topic detail/ANALYSIS.md>):144
- 미확인 내용: Life 팔로우 실행·해제·공유, 토픽 간 계층/연관 규칙·빈 추천.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G30](CONTRACTS.md#g30), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f04"></a>

### U-F04
- 원본: [ANALYSIS.md](<../../medium/flows/Explore/Topic detail/Browse curated list/ANALYSIS.md>):245
- 미확인 내용: 리스트 저장·응답·박수·공유 실행, 모든 8개 글의 중간 화면·순서, 토픽 전환 과정.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G30](CONTRACTS.md#g30), [G32](CONTRACTS.md#g32)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f05"></a>

### U-F05
- 원본: [ANALYSIS.md](<../../medium/flows/Home/ANALYSIS.md>):212
- 미확인 내용: Following·개별 토픽 탭 내용, 원형 − 실행, 새로고침·추가 로딩·네트워크 실패.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f06"></a>

### U-F06
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Notifications/ANALYSIS.md>):145
- 미확인 내용: 항목별 목적지·읽음·읽지 않음·0건·다음 페이지·실패·설정 연동.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G44](CONTRACTS.md#g44), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f07"></a>

### U-F07
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Adding topics/ANALYSIS.md>):278
- 미확인 내용: 5개 경계·6번째 선택, 칩 제거, 중복·검색 0건·Save 실패·취소 복원.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G39](CONTRACTS.md#g39)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f08"></a>

### U-F08
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/ANALYSIS.md>):445
- 미확인 내용: Close 후 초안 처리, Publication 제출, Unlisted On, 미리보기 Edit, 빈 글·이미지 실패·발행 실패.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G37](CONTRACTS.md#g37), [G39](CONTRACTS.md#g39), [G42](CONTRACTS.md#g42), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f09"></a>

### U-F09
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Changing text format/ANALYSIS.md>):242
- 미확인 내용: 서식 해제·중첩·코드 블록, 선택 범위별 적용, 취소·자동 저장 실패.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G36](CONTRACTS.md#g36)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f10"></a>

### U-F10
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Drafts/ANALYSIS.md>):177
- 미확인 내용: 초안 다시 열기·삭제·여러 초안·빈 목록, 오프라인 충돌과 자동 저장 실패.
- 현재 판정: 초안 삭제는 원본 근거 확인 대기. 재개/빈 목록의 기존 mock 구현과 분리. 삭제 기능을 동일 재현 필수로 확정하지 않음
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38)
- 후속 작업: [Q04](../FE_MEDIUM_PARITY_BACKLOG.md#q04); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f11"></a>

### U-F11
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Publishing a story/Mentioning a user/ANALYSIS.md>):211
- 미확인 내용: 검색 0건·중복 이름 식별·멘션 제거, 발행 후 대상 이동·알림 수신.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G36](CONTRACTS.md#g36), [G38](CONTRACTS.md#g38)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f12"></a>

### U-F12
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/ANALYSIS.md>):245
- 미확인 내용: Muted 탭 내용, 팔로우 변경 중간 과정, 다른 계정·재진입 동기화.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G31](CONTRACTS.md#g31), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f13"></a>

### U-F13
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Filtering suggestions/ANALYSIS.md>):211
- 미확인 내용: Writers·Publications 단독 선택 결과, 필터별 0건·오류·선택 유지.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G31](CONTRACTS.md#g31)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f14"></a>

### U-F14
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Reading history/ANALYSIS.md>):144
- 미확인 내용: 개별 기록 삭제·Undo·기록 생성 조건, Library 쪽 Reading history와의 관계.
- 현재 판정: 이력 Undo는 원본 근거 확인 대기. 현재 삭제 전 확인/취소와 삭제 후 Undo를 구분. 목록 항목 Undo를 이력 Undo 근거로 사용하지 않음
- 기존 담당 계약: [G31](CONTRACTS.md#g31)
- 후속 작업: [Q05](../FE_MEDIUM_PARITY_BACKLOG.md#q05); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f15"></a>

### U-F15
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Refine recommendations/Reading history/Clearing history/ANALYSIS.md>):145
- 미확인 내용: 확인창·취소·삭제 실패·재진입, 추천 데이터의 삭제 범위.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G31](CONTRACTS.md#g31)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f16"></a>

### U-F16
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/ANALYSIS.md>):313
- 미확인 내용: 비회원 게이트·삭제 글·네트워크 실패, 본문 링크·미리보기 응답 클릭 결과.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f17"></a>

### U-F17
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/ANALYSIS.md>):212
- 미확인 내용: 타인 비공개 목록, 팔로워 목록·고정 정렬, 외부 링크·비로그인 접근.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G28](CONTRACTS.md#g28)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f18"></a>

### U-F18
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Blocking an author/ANALYSIS.md>):210
- 미확인 내용: 차단 상대 계정에서 접근, 해제, 반응·멘션·저장 리스트 변화. 현재 공식 규칙과 캡처 불일치.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f19"></a>

### U-F19
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following an author/ANALYSIS.md>):210
- 미확인 내용: 이메일 Off 적용·실제 수신·동시 팔로우·실패·재진입, 기본값 판정.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G28](CONTRACTS.md#g28)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f20"></a>

### U-F20
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following an author/Unfollowing an author/ANALYSIS.md>):143
- 미확인 내용: 확인·취소·실패·재팔로우, 기존 이메일 구독과 설정 보존.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G28](CONTRACTS.md#g28)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f21"></a>

### U-F21
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Following list/ANALYSIS.md>):145
- 미확인 내용: 목록 제목·선택한 집계 종류, 전체 25건·다음 페이지·팔로우 실행·빈 목록.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G28](CONTRACTS.md#g28)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f22"></a>

### U-F22
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Muting an author/ANALYSIS.md>):176
- 미확인 내용: Muted 관리 목록·음소거 해제·새 피드/Digest 확인·실제 알림.
- 현재 판정: 음소거 적용은 화면 관찰과 보관 공식 설명을 분리해 기존/새 Digest 정책 확정 필요
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29)
- 후속 작업: [D02](../FE_MEDIUM_PARITY_BACKLOG.md#d02); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f23"></a>

### U-F23
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Author detail/Reporting an author/ANALYSIS.md>):246
- 미확인 내용: 나머지 사유·동시 차단·권리 침해 분기·닫기·중복·접수 실패·제재 결과.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G28](CONTRACTS.md#g28), [G29](CONTRACTS.md#g29)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f24"></a>

### U-F24
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Changing display/ANALYSIS.md>):377
- 미확인 내용: 글꼴 옵션·크기 경계·OS 글자 크기·System 테마 연동·재진입·설정 동기화.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G24](CONTRACTS.md#g24), [G25](CONTRACTS.md#g25)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f25"></a>

### U-F25
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Highlighting a phrase/ANALYSIS.md>):177
- 미확인 내용: 강조 제거·겹침·원문 수정/삭제·동기화·타인 노출, Share/더보기 실행.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G27](CONTRACTS.md#g27)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f26"></a>

### U-F26
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/ANALYSIS.md>):244
- 미확인 내용: 일시정지·닫기·스크럽·백그라운드·오프라인·재생 실패·권한 게이트·재생 큐.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G45](CONTRACTS.md#g45)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f27"></a>

### U-F27
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing playback speed/ANALYSIS.md>):211
- 미확인 내용: 최소·최대·증분·취소·다른 글/재진입 유지, 실제 발화 속도.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G46](CONTRACTS.md#g46)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f28"></a>

### U-F28
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Listening to a story/Changing voice/ANALYSIS.md>):278
- 미확인 내용: 음성 검색·미리 듣기·실패·재진입 유지, 본문 언어와 번역 지원 구분.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G45](CONTRACTS.md#g45), [G46](CONTRACTS.md#g46)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f29"></a>

### U-F29
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responding to a phrase/ANALYSIS.md>):213
- 미확인 내용: 인용 제거·길이 제한·원문 연결·Cancel·중복·실패, 총수 갱신.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G26](CONTRACTS.md#g26), [G27](CONTRACTS.md#g27)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f30"></a>

### U-F30
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/ANALYSIS.md>):179
- 미확인 내용: 응답 0건·닫힌 토론·숨겨진 응답·로그인 필요 상태, 최대 깊이·더 보기 실패.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G26](CONTRACTS.md#g26)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f31"></a>

### U-F31
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/ANALYSIS.md>):179
- 미확인 내용: 빈값·문자 초과·중복 제출·실패·닫기 시 입력 보존, 토론 닫힘.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G26](CONTRACTS.md#g26)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f32"></a>

### U-F32
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Deleting a response/ANALYSIS.md>):179
- 미확인 내용: 삭제 전 확인·취소·복구·답글 연쇄 처리·재진입, 서버 소유권 검증.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G26](CONTRACTS.md#g26)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f33"></a>

### U-F33
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Commenting a story/Editing a response/ANALYSIS.md>):245
- 미확인 내용: Cancel 복원·빈값 수정·타인 권한·토론 닫힘·동시 수정, 수정 이력.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G26](CONTRACTS.md#g26)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f34"></a>

### U-F34
- Parity 3 후속: [현재 결과](../FE_MEDIUM_PARITY_03_RESULT.md). 자체 mock 뒤로 복귀·도구 실행/실패는 검증했다. 실제 Medium의 링크/뒤로 결과·전문은 미확인 유지; 현재 mock 동작을 원본 관찰로 바꾸지 않는다.
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Medium policy/ANALYSIS.md>):144
- 미확인 내용: 문서 전체 내용·버전 차이·링크 이동·뒤로 복귀 결과. 캡처 날짜와 게시 날짜를 구분한다.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G26](CONTRACTS.md#g26)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f35"></a>

### U-F35
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Replying a response/ANALYSIS.md>):211
- 미확인 내용: Cancel·빈값·부모 삭제·최대 깊이·닫힌 토론·전송 실패.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G26](CONTRACTS.md#g26)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f36"></a>

### U-F36
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Responses/Sorting responses/ANALYSIS.md>):177
- 미확인 내용: 정렬별 페이지 경계·동률·수정 시각 취급·선택 유지, Most Relevant 계산식.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G26](CONTRACTS.md#g26)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f37"></a>

### U-F37
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Saving a story/ANALYSIS.md>):178
- 미확인 내용: 복수 리스트 선택·선택 해제·Create new list 실행·저장 실패, 타 기기 재조회.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G33](CONTRACTS.md#g33)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f38"></a>

### U-F38
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sending claps/ANALYSIS.md>):178
- 미확인 내용: 0~50 경계·취소·실패·재진입, 본인 글의 제한·중복 요청.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f39"></a>

### U-F39
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sharing a story/ANALYSIS.md>):211
- 미확인 내용: Friend Link 생성·자격 거부, Share via 시스템 시트·취소, 카드 스타일 전환.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G25](CONTRACTS.md#g25), [G47](CONTRACTS.md#g47)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f40"></a>

### U-F40
- 원본: [ANALYSIS.md](<../../medium/flows/Home/Story detail/Sharing a story/Downloading an image/ANALYSIS.md>):144
- 미확인 내용: 사진 권한 허용·거부·저장 실패, 실제 앨범 파일·형식·해상도.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G47](CONTRACTS.md#g47)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f41"></a>

### U-F41
- 원본: [ANALYSIS.md](<../../medium/flows/Library/ANALYSIS.md>):245
- 미확인 내용: Saved lists·Library Reading history 본문, 배너 닫기 결과·빈 탭·실패·페이지네이션.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f42"></a>

### U-F42
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Creating a list/ANALYSIS.md>):210
- 미확인 내용: 60/280자 경계·공백·중복 이름·Private On·Cancel·생성 실패.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f43"></a>

### U-F43
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Filtering digest/ANALYSIS.md>):210
- 미확인 내용: 닫기·선택 유지·날짜 0건·조회 실패·시간대·10개보다 오래된 기록.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G34](CONTRACTS.md#g34)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f44"></a>

### U-F44
- 원본: [ANALYSIS.md](<../../medium/flows/Library/Filtering digest/Digest settings/ANALYSIS.md>):144
- 미확인 내용: 다른 빈도 옵션·변경 저장·푸시 세부 화면·외부 이메일 설정·발송 시간.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G34](CONTRACTS.md#g34), [G44](CONTRACTS.md#g44)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f45"></a>

### U-F45
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Adding a note/ANALYSIS.md>):245
- 미확인 내용: 빈값 Done·최대 길이·Cancel·수정/삭제·공개 접근·다른 리스트 동일 글.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f46"></a>

### U-F46
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/ANALYSIS.md>):210
- 미확인 내용: Start browsing 결과·글 추가·Edit list info·공유·응답·원문 삭제 영향.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f47"></a>

### U-F47
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Deleting a list/ANALYSIS.md>):212
- 미확인 내용: 닫기·실패·복구·타인 라이브러리·캐시/메모 정리, 기본 리스트 삭제 제한.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f48"></a>

### U-F48
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Downloading a list/ANALYSIS.md>):179
- 미확인 내용: 중단·부분 실패·재다운로드·캐시 삭제·저장 공간 부족·비행기 모드.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G35](CONTRACTS.md#g35)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f49"></a>

### U-F49
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Making a list private/ANALYSIS.md>):245
- 미확인 내용: Cancel·실패·타인 접근·재공개·타인 저장 복원·공유 링크 처리.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f50"></a>

### U-F50
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Removing a story/ANALYSIS.md>):145
- 미확인 내용: Undo 실행·시간 제한·메모/순서 복구·실패, 다른 리스트와 원문 유지.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f51"></a>

### U-F51
- 원본: [ANALYSIS.md](<../../medium/flows/Library/List detail/Reordering items/ANALYSIS.md>):245
- 미확인 내용: Cancel·마지막 두 글 재조회·동시 편집·저장 실패·메모 유지·접근성 이동.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f52"></a>

### U-F52
- 원본: [ANALYSIS.md](<../../medium/flows/Logging in/ANALYSIS.md>):313
- 미확인 내용: 잘못된 이메일·미가입 계정·코드 만료/오입력/재전송·소셜 취소·세션 재진입.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f53"></a>

### U-F53
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/ANALYSIS.md>):513
- 미확인 내용: 관심사 0~2개·정확히 3개, 알림 Skip/OS 거부, 소셜 인증, 이메일 오류·재전송, 구독 닫기 결과.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G41](CONTRACTS.md#g41), [G48](CONTRACTS.md#g48), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f54"></a>

### U-F54
- 원본: [ANALYSIS.md](<../../medium/flows/Onboarding/Subscribing to Medium/ANALYSIS.md>):278
- 미확인 내용: 연간·Friend 실제 선택, 스토어 확인·취소·실패·복원, 갱신·해지.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G48](CONTRACTS.md#g48), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f55"></a>

### U-F55
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/ANALYSIS.md>):277
- 미확인 내용: Public 필터 옵션·게시 글 메뉴·타인 시점·소개 편집 진입·조회 실패.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f56"></a>

### U-F56
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/Adding pronouns/ANALYSIS.md>):277
- 미확인 내용: 칩 삭제·4개/5번째 선택·중복·검색 0건·사용자 정의·Save/취소.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G42](CONTRACTS.md#g42)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f57"></a>

### U-F57
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Editing profile information/ANALYSIS.md>):344
- 미확인 내용: Name 50·bio 160 경계·빈 이름·Cancel·사진 권한/실패·웹 About 편집.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G42](CONTRACTS.md#g42)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f58"></a>

### U-F58
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/ANALYSIS.md>):179
- 미확인 내용: Account·Membership and payment·Email·Facebook·More app controls의 실제 하위 화면.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G49](CONTRACTS.md#g49)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f59"></a>

### U-F59
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Changing notification settings/ANALYSIS.md>):177
- 미확인 내용: Tailored 옵션·화면 아래 잘린 행·OS 권한·전송 결과·저장 실패·재진입.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G44](CONTRACTS.md#g44), [G49](CONTRACTS.md#g49)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f60"></a>

### U-F60
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Custom app icon/ANALYSIS.md>):144
- 미확인 내용: 전체 아이콘 목록·Friend 해제·대체 아이콘 선택·OS 결과·실패·재시작.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G49](CONTRACTS.md#g49)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f61"></a>

### U-F61
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Logging out/ANALYSIS.md>):177
- 미확인 내용: Cancel·실패·캐시 정리·보호 화면 뒤로 이동·다른 기기 세션 영향.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G40](CONTRACTS.md#g40), [G49](CONTRACTS.md#g49)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f62"></a>

### U-F62
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Settings/Switching to dark mode/ANALYSIS.md>):343
- 미확인 내용: Light 복귀·System 연동·재시작·다른 기기·OS 접근성·기사 설정과 동기화.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G33](CONTRACTS.md#g33), [G34](CONTRACTS.md#g34), [G42](CONTRACTS.md#g42), [G49](CONTRACTS.md#g49), [G50](CONTRACTS.md#g50)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
<a id="u-f63"></a>

### U-F63
- 원본: [ANALYSIS.md](<../../medium/flows/Profile/Story stats/ANALYSIS.md>):212
- 미확인 내용: 다른 월·정렬 옵션·글 상세·0건·오류·새로고침, 집계 불일치 원인.
- 현재 판정: 미수록 분기의 확인·판정 작업 포함; 원본과 동일하다는 결론은 미완료
- 기존 담당 계약: [G42](CONTRACTS.md#g42), [G43](CONTRACTS.md#g43)
- 후속 작업: [Q03](../FE_MEDIUM_PARITY_BACKLOG.md#q03); 위 미확인 내용을 개별 질문으로 삼아 근거/코드 정책/종료 판정을 남긴다.
