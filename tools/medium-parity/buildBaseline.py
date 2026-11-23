import argparse
import hashlib
import json
import re
import struct
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / 'TODO/MEDIUM_PARITY'
HERE = Path(__file__).resolve().parent


def read(path):
    return path.read_text(encoding='utf-8-sig')


def unique(values):
    return sorted(set(values))


def relative(path):
    return path.resolve().relative_to(ROOT).as_posix()


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def textDigest(path):
    # 체크아웃의 줄바꿈과 UTF-8 BOM 차이를 제거해 같은 텍스트를 같은 근거로 식별한다.
    return hashlib.sha256(read(path).encode('utf-8')).hexdigest()


def pngInfo(path):
    data = path.read_bytes()
    if data[:8] != b'\x89PNG\r\n\x1a\n':
        raise ValueError(f'PNG signature: {path}')
    width, height = struct.unpack('>II', data[16:24])
    offset, chunks = 8, []
    while offset < len(data):
        length = struct.unpack('>I', data[offset:offset + 4])[0]
        kind = data[offset + 4:offset + 8].decode('ascii')
        if kind in ('iCCP', 'sRGB', 'gAMA', 'cHRM'):
            chunks.append(kind)
        offset += length + 12
    return {'widthPx': width, 'heightPx': height, 'sha256': digest(path), 'colorChunks': chunks}


def blocks(content, pattern):
    return re.split(pattern, content, flags=re.M)[1:]


def link(path, label=None, anchor=''):
    target = Path(path)
    import os
    url = Path(os.path.relpath(target, DOCS)).as_posix() + anchor
    return f'[{label or target.name}](<{url}>)'


def extract():
    profiles = json.loads(read(HERE / 'comparisonProfiles.json'))
    batches = json.loads(read(HERE / 'executionBatches.json'))
    evidence = json.loads(read(HERE / 'currentEvidence.json'))
    backlog = read(ROOT / 'TODO/FE_MEDIUM_PARITY_BACKLOG.md')
    taskTitles = dict(re.findall(r'^## ([DQV]\d{2}) — (.+)$', backlog, re.M))
    assignments = {key: [b['number'] for b in batches if key in b['items']] for key in taskTitles}
    # 공통 기준과 미확인 판정은 화면별 담당에서도 적용하되 완료를 자동 전파하지 않는다.
    for key in ('Q02', 'Q03', 'Q08', 'Q12'):
        assignments[key] = unique(assignments[key] + list(range(2, 21)))
    assignments['Q09'] = [1, 4, 9, 16]
    flowText = read(DOCS / 'FLOWS.md')
    flows, transitions = {}, []
    for block in blocks(flowText, r'(?=^## F\d{2} )'):
        flowId, title = re.match(r'## (F\d{2}) — (.+)', block).groups()
        analysis = re.search(r'<([^>]+ANALYSIS.md)>', block).group(1)
        flow = {'id': flowId, 'title': title, 'analysis': relative(DOCS / analysis), 'steps': []}
        for row in block.splitlines():
            match = re.search(r'`(T-F\d{2}-\d{2})`.*?\[(S\d{3})\]', row)
            if not match:
                continue
            taskId, screenId = match.groups()
            png = re.search(r'\[PNG\]\(<([^>]+)>\)', row).group(1)
            step = {'id': taskId, 'flowId': flowId, 'screenId': screenId, 'png': relative(DOCS / png), 'acceptance': row.split(' | ')[2]}
            transitions.append(step)
            flow['steps'].append(taskId)
        flows[flowId] = flow
    controls = []
    for row in read(DOCS / 'SCOPE.md').splitlines():
        if re.match(r'\| C\d{2} \|', row):
            parts = row.split(' | ')
            controls.append({'id': parts[0].strip('| '), 'requirement': parts[1], 'tasks': unique(re.findall(r'\[([DQV]\d{2})\]', row))})
    unknowns = []
    for block in blocks(read(DOCS / 'UNKNOWN.md'), r'(?=^### U-[SF]\d+\s*$)'):
        unknownId = re.match(r'### (U-[SF]\d+)', block).group(1)
        questions = re.search(r'^- 미확인 내용: (.+)$', block, re.M)
        unknowns.append({'id': unknownId, 'questions': questions.group(1) if questions else block.strip()})
    screens = []
    for path in sorted(DOCS.glob('REQUIREMENTS_*.md')):
        for block in blocks(read(path), r'(?=^## S\d{3} )'):
            sid, title = re.match(r'## (S\d{3}) — (.+)', block).groups()
            visual = re.findall(r'\[(V\d{2})\]', block)[0]
            profile = profiles[visual]
            rawId = re.search(r'`(sc_[a-f0-9]+)`', block).group(1)
            png = relative(path.parent / re.search(r'\[원본 PNG\]\(<([^>]+)>\)', block).group(1))
            analysis = relative(path.parent / re.search(r'<([^>]+ANALYSIS.md)>', block).group(1))
            sources = unique(relative(path.parent / p) for p in re.findall(r'<([^>]+\.tsx?)>', block))
            requirements = []
            for row in block.splitlines():
                match = re.search(r'`(R-S\d{3}-[A-Z]\d*)`', row)
                if match:
                    requirements.append({'id': match.group(1), 'observation': row.split(' | ')[1]})
            observed = {r['id'].rsplit('-', 1)[1]: r['observation'] for r in requirements}
            combined = title + ' ' + observed['L'] + ' ' + observed['S']
            related = [t for t in transitions if t['screenId'] == sid]
            candidateFiles = unique(relative(p) for feature in profile['features'] for p in (ROOT / 'FE/src/features' / feature).rglob('*.ts') if not p.name.endswith('.test.ts') and any(term in p.name.lower() for term in ('source', 'fixture', 'preview', 'mockusers')))
            nativeOnly = sid in ('S043', 'S113')
            special = {
                'S043': '대응 splash 설정 없음(D10); 웹 Home은 대체 증거가 아님; 실제 cold start는 Q07.',
                'S113': 'OS Photos/앨범4장/권한 환경 필요; 웹 파일 선택기로 동일 재현 불가(Q07).',
                'S008': 'Parity 3에서 기사 구조·mock 도구·복귀를 실행했다. V21 자산/서체/272 재현 잔여와 U 미확인을 유지한다.',
                'S116': 'June8 현 fixture와 원본 Goodbye Notion 불일치; issue/article source 대조·주입 필요.',
                'S068': '원본 알림 이벤트 배열·시간과 같은 fixture 미확정; 기존 Goal53 캡처는 새 증거 아님.',
                'S122': 'native 별도 Select a passage 화면과 원본 본문 선택이 다름(D09).',
            }.get(sid, '동일 데이터·상태의 실행과 PNG 쌍 미검증; 아래 조건을 구현 담당 묶음에서 재현·기록해야 함.')
            timeRequirement = {
                'S169': 'publishedAt=고정 now-23시간; D12 상대 표시 미구현',
                'S178': 'publishedAt=고정 now; Just now',
                'S139': 'editedAt=고정 now-60초; 초안1개',
                'S106': '목록 표시14초; 기준 필드 의미는 원본 미확인/D13 미정',
                'S011': '목록 표시6초+4개; S106과 독립 snapshot/D13',
                'S077': '목록 표시1초+4개; 재정렬 확정 상태/D13',
                'S055': '재생00:05/-04:35/1x; mock 진행 고정',
                'S141': '재생00:10/-01:44/2.5x; 독립 duration/position',
                'S160': '재생00:40/-04:00/1x; mock 진행 고정',
                'S192': '재생00:20/-04:27/1x; 독립 duration/position',
                'S188': 'asOf와 June1–13 2025 UTC 기간 고정; 합계11/2',
                'S153': '선택 Jun12 2025 UTC; Views11/Reads2',
                'S150': '별도 글 Lifetime0/0·23hours ago; 월간11/2에서 계산하지 않음',
            }.get(sid, 'CP-WEB-01 고정 now; 원본 날짜·상대시간은 표시값 요구를 별도 seed하며 원본 촬영시각으로 추정하지 않음')
            item = {'id': sid, 'title': title, 'referenceId': rawId, 'requirementsDocument': relative(path), 'png': png,
                'image': pngInfo(ROOT / png), 'analysis': analysis, 'visualTask': visual, 'batches': assignments[visual],
                'code': sources, 'sourceCandidates': candidateFiles, 'routeRecipe': profile['route'],
                'accountAndPermission': profile['account'], 'fixtureRecipe': profile['fixture'],
                'referenceObservations': observed, 'requirements': requirements, 'steps': [t['id'] for t in related],
                'unknowns': [f'U-{sid}'] + unique(f"U-{t['flowId']}" for t in related),
                'controls': [c['id'] for c in controls if visual in c['tasks']],
                'conditions': {'comparisonProfile': 'CP-WEB-01', 'clock': timeRequirement,
                    'theme': 'black-brand-frame; app theme 미확인' if sid == 'S043' else 'Dark 관찰; 앱/reader 각각 설정' if ('다크' in combined or 'Dark' in observed['D']) else 'Light 비교 기본안; 원본 theme 설정 자체는 미확인',
                    'scroll': '정확 offset 미확인; 다음 보이는 요소와 스크롤 위치를 고정: ' + observed['L'],
                    'keyboard': '보임 관찰; web은 OS 키보드 비동등' if '키보드' in combined and '숨김' not in combined else '숨김 관찰' if '키보드 숨김' in combined else '원본 명시 관찰 없음; PNG와 실제 focus 확인 필요',
                    'platform': 'native 필수/web 비동등' if nativeOnly else 'web 비교 준비; iOS 원본과 OS/font 렌더 차이는 별도',
                    'crop': None},
                'readiness': 'native-required' if nativeOnly else 'recipe-only', 'blocker': special, 'currentEvidence': [],
                'acceptance': re.search(r'\*\*화면별 수용 조건:\*\* (.+)', block).group(1)}
            if sid == 'S043':
                item['batches'] = unique(item['batches'] + [18, 21])
            if nativeOnly:
                item['batches'] = unique(item['batches'] + [21])
            item['currentEvidence'] = [c for c in evidence['captures'] if c['id'] == sid]
            if item['currentEvidence']:
                item['readiness'] = 'historical-web-capture-parity-01'
                item['blocker'] = 'Parity 1 당시 관찰: ' + item['currentEvidence'][0]['note'] + '; 현재 공통 보정과 잔여는 Parity 2 결과 참조'
            if sid in ('S008', 'S100'):
                item['blocker'] += '; 후속 Parity 3의 연결 검증/새 캡처는 FE_MEDIUM_PARITY_03_RESULT.md 참조. 과거 캡처와 별도이며 원본 동일성 통과 아님'
                item['previousReviews'] = [{'result': 'TODO/FE_MEDIUM_PARITY_03_RESULT.md',
                    'evidence': 'TODO/MEDIUM_PARITY/EVIDENCE/PARITY_03/flow-review/captures.json',
                    'scope': 'S008 mock 연결과 S100 복귀; 원본 동일성 미완료'}]
                item['latestReview'] = {'result': 'TODO/FE_MEDIUM_PARITY_03_RESULT.md#additional-review',
                    'evidence': 'TODO/MEDIUM_PARITY/EVIDENCE/PARITY_03_RECHECK/flow/captures.json',
                    'scope': '추가 검토: route 이탈/접근권 상실 수정과 원래 응답 복귀; 원본 동일성 미완료'}
            if sid in ('S001', 'S045', 'S052', 'S063', 'S119', 'S125', 'S168', 'S190', 'S198', 'S008'):
                if 'latestReview' in item:
                    item.setdefault('previousReviews', []).append(item['latestReview'])
                phase = 'policy' if sid == 'S008' else 'reference-history' if sid in ('S045', 'S052', 'S190') else 'display-final'
                item['latestReview'] = {'result': 'TODO/FE_MEDIUM_PARITY_04_RESULT.md',
                    'evidence': f'TODO/MEDIUM_PARITY/EVIDENCE/PARITY_04/{phase}/captures.json',
                    'scope': '읽기 이력/설정/발행 링크 연결과 웹 비교; Q05 미확인·Q11 후속·V12/V16 시각 잔여·native 대기'}
                item['blocker'] += '; Parity 4 새 실행은 latestReview 참조; 과거 캡처를 현재 코드 증거로 승격하지 않음'
            if visual in ('V11', 'V14', 'V15') or sid == 'S168':
                if 'latestReview' in item:
                    item.setdefault('previousReviews', []).append(item['latestReview'])
                item['latestReview'] = {
                    'result': 'TODO/FE_MEDIUM_PARITY_05_RESULT.md',
                    'scope': '관계 카탈로그·관리 목록·동작 및 웹 부분 비교; 원본 시각 차이·U 미확인·native 대기',
                    'artifacts': '사용자 지시로 evidence 및 캡처 파일을 생성하지 않음; 실행 결과는 결과 문서에 기록',
                }
                item['previousBlocker'] = item['blocker']
                item['blocker'] = 'Parity 5에서 mock 연결/웹 부분 대조를 수행함; 원본 차이·미확인·native 대기. 사용자 지시로 캡처 파일을 저장하지 않았으며 원본 동일성이나 ready로 승격하지 않음'
            screens.append(item)
    byScreen = {s['id']: s for s in screens}
    for item in unknowns:
        target = item['id'][2:]
        item['batches'] = byScreen[target]['batches'] if target.startswith('S') else unique(b for t in transitions if t['flowId'] == target for b in byScreen[t['screenId']]['batches'])
        item['status'] = '원본 미확인 유지; 질문 전체를 담당 묶음에서 개별 판정'
    for item in controls:
        item['batches'] = unique(b for task in item['tasks'] for b in assignments[task])
    assets = []
    for record in json.loads(read(ROOT / 'FE/assets/medium/SOURCES.json')):
        assets.append({**record, 'image': pngInfo(ROOT / record['asset']), 'sourceImage': pngInfo(ROOT / record['source']), 'status': '로컬 비교용 crop 확보; 원본 독립 자산/배포 권리/렌더 동일성 확인 아님'})
    inputs = sorted(set([ROOT / 'TODO/FE_MEDIUM_PARITY_BACKLOG.md', HERE / 'comparisonProfiles.json', HERE / 'executionBatches.json', HERE / 'currentEvidence.json', ROOT / evidence['captureLog'], *DOCS.glob('REQUIREMENTS_*.md'), *(DOCS / name for name in ('FLOWS.md', 'CONTRACTS.md', 'UNKNOWN.md', 'SCOPE.md')), *(ROOT / f['analysis'] for f in flows.values())]), key=lambda p: tuple(part.casefold() for part in p.relative_to(ROOT).parts))
    codeInputs = sorted([p for p in (ROOT / 'FE/src').rglob('*') if p.suffix in ('.ts', '.tsx')] + [ROOT / 'FE/App.tsx', ROOT / 'FE/app.json', ROOT / 'FE/package.json', ROOT / 'FE/package-lock.json', ROOT / 'FE/assets/medium/SOURCES.json'], key=lambda p: tuple(part.casefold() for part in p.relative_to(ROOT).parts))
    return {'schemaVersion': 1, 'comparisonProfile': {'id': 'CP-WEB-01', 'viewportCssPx': [390, 844], 'deviceScaleFactor': 1, 'locale': 'en-US', 'timezone': 'UTC', 'clockIso': '2025-06-13T12:00:00.000Z', 'fontScale': 1, 'orientation': 'portrait', 'osInsets': 'web=0; 원본은 미확인', 'crop': None, 'color': '원본 ICC 보존; 캡처 색공간 검증 전 픽셀 점수 금지', 'legacy': '393x852는 과거 정규화 조건; DPR/원본 기기 확정 근거 아님'},
        'textFingerprint': 'SHA-256 of UTF-8 text without BOM and with LF newlines; PNG hashes use original bytes',
        'inputs': [{'path': relative(p), 'sha256': textDigest(p) if p.is_file() else None} for p in inputs], 'codeInputs': [{'path': relative(p), 'sha256': textDigest(p)} for p in codeInputs], 'evidenceContext': evidence, 'profiles': profiles, 'batches': batches,
        'taskAssignments': assignments, 'taskTitles': taskTitles, 'screens': screens, 'flows': list(flows.values()),
        'transitions': transitions, 'unknowns': unknowns, 'controls': controls, 'assets': assets}


def validate(data):
    errors = []
    def require(condition, message):
        if not condition:
            errors.append(message)
    screens = data['screens']
    require([s['id'] for s in screens] == [f'S{n:03}' for n in range(1, 201)], 'S001..S200 coverage')
    requirements = [r['id'] for s in screens for r in s['requirements']]
    for name, values, expected in [('R', requirements, 1392), ('T', [t['id'] for t in data['transitions']], 273), ('U', [u['id'] for u in data['unknowns']], 263), ('C', [c['id'] for c in data['controls']], 72), ('F', [f['id'] for f in data['flows']], 63)]:
        require(len(values) == len(set(values)) == expected, f'{name}: count or duplicate')
    expectedTasks = {f'{p}{i:02}' for p, count in [('D', 13), ('Q', 12), ('V', 34)] for i in range(1, count + 1)}
    require(set(data['taskAssignments']) == expectedTasks, 'D/Q/V coverage')
    require(all(data['taskAssignments'].values()), 'unassigned task')
    require({u['id'] for u in data['unknowns']} == {f'U-S{n:03}' for n in range(1, 201)} | {f'U-F{n:02}' for n in range(1, 64)}, 'U coverage')
    require({c['id'] for c in data['controls']} == {f'C{n:02}' for n in range(1, 73)}, 'C coverage')
    require({f['id'] for f in data['flows']} == {f'F{n:02}' for n in range(1, 64)}, 'F coverage')
    if errors:
        raise ValueError('\n'.join(errors))
    batchNumbers = {b['number'] for b in data['batches']}
    require(len(data['batches']) == 22 and batchNumbers == set(range(1, 23)), 'batch coverage or duplicate')
    def assigned(numbers, label):
        require(bool(numbers) and len(numbers) == len(set(numbers)) and set(numbers) <= batchNumbers, f'invalid assignment {label}')
    for task, numbers in data['taskAssignments'].items():
        assigned(numbers, task)
    for batch in data['batches']:
        require(all(d in batchNumbers and d < batch['number'] for d in batch['depends']), f"dependency order {batch['number']}")
        require(set(batch['items']) <= expectedTasks, f"unknown task in batch {batch['number']}")
        for task in batch['items']:
            require(batch['number'] in data['taskAssignments'].get(task, []), f'direct task assignment differs {task}')
    for key, profile in data['profiles'].items():
        require(any((ROOT / 'FE/src').rglob(profile['entry'] + '.tsx')), f'missing entry {key}')
    byScreen = {s['id']: s for s in screens}
    byStep = {t['id']: t for t in data['transitions']}
    byUnknown = {u['id']: u for u in data['unknowns']}
    byControl = {c['id']: c for c in data['controls']}
    captured = data['evidenceContext']['captures']
    require(len({c['id'] for c in captured}) == len(captured), 'duplicate capture ID')
    require(all(c['id'] in byScreen for c in captured), 'unknown capture ID')
    logPath = ROOT / data['evidenceContext']['captureLog']
    require(logPath.is_file(), 'capture log missing')
    captureLog = json.loads(read(logPath)) if logPath.is_file() else {'captures': []}
    logById = {c['id']: c for c in captureLog['captures']}
    require(len(logById) == len(captureLog['captures']) and set(logById) == {c['id'] for c in captured}, 'capture log IDs differ')
    run = captureLog.get('run', {})
    require(run.get('status') == 'completed' and run.get('consoleErrors') == 0 and bool(run.get('finishedAt')), 'capture run incomplete or failed')
    require(run == data['evidenceContext'].get('run') and run.get('requestedScreens') == [c['id'] for c in captureLog['captures']], 'capture run context differs')
    for screen in screens:
        for field in ('png', 'analysis', 'requirementsDocument'):
            require((ROOT / screen[field]).is_file(), f"missing {screen['id']} {field}")
        for path in screen['code'] + screen['sourceCandidates']:
            require((ROOT / path).is_file(), f'missing code {path}')
        require(bool(screen['code']) and bool(screen['steps']) and bool(screen['requirements']), f"empty trace {screen['id']}")
        require(screen['readiness'] in ('recipe-only', 'native-required', 'current-web-capture', 'historical-web-capture-parity-01', 'ready'), f"unknown readiness {screen['id']}")
        require(screen['readiness'] not in ('ready', 'current-web-capture', 'historical-web-capture-parity-01') or bool(screen['currentEvidence']), f"no evidence {screen['id']}")
        require(screen['currentEvidence'] == [c for c in captured if c['id'] == screen['id']], f"evidence context differs {screen['id']}")
        for evidence in screen['currentEvidence']:
            file = ROOT / evidence['path']
            require(file.is_file(), f"evidence missing {screen['id']}")
            if file.is_file():
                require(digest(file) == evidence['sha256'], f"evidence hash differs {screen['id']}")
            log = logById.get(evidence['id'], {})
            require(log.get('imageSha256') == evidence['sha256'] and log.get('steps') == evidence['steps'], f"capture log differs {screen['id']}")
            snapshot = log.get('snapshot', {})
            require(snapshot.get('viewport') == evidence['viewport'] and snapshot.get('dpr') == evidence['dpr'] and snapshot.get('date') == evidence['clock'], f"capture conditions differ {screen['id']}")
        assigned(screen['batches'], screen['id'])
        require(set(data['taskAssignments'].get(screen['visualTask'], [])) <= set(screen['batches']), f"visual assignment differs {screen['id']}")
        if screen['id'] in ('S043', 'S113'):
            require(21 in screen['batches'], f"native assignment missing {screen['id']}")
        require(screen['steps'] == [t['id'] for t in data['transitions'] if t['screenId'] == screen['id']], f"step trace differs {screen['id']}")
        require(all(re.fullmatch(r'R-' + screen['id'] + r'-[A-Z]\d*', r['id']) for r in screen['requirements']), f"requirement owner differs {screen['id']}")
        require(set(screen['unknowns']) <= set(byUnknown) and set(screen['controls']) <= set(byControl), f"unknown trace {screen['id']}")
    for step in data['transitions']:
        require(step['screenId'] in byScreen, f"unknown step screen {step['id']}")
        if step['screenId'] in byScreen:
            require(pngInfo(ROOT / step['png'])['sha256'] == byScreen[step['screenId']]['image']['sha256'], f"PNG differs {step['id']}")
    for flow in data['flows']:
        require(flow['steps'] == [t['id'] for t in data['transitions'] if t['flowId'] == flow['id']], f"flow trace differs {flow['id']}")
        require(all(t in byStep and t.startswith('T-' + flow['id'] + '-') for t in flow['steps']), f"unknown flow step {flow['id']}")
    for item in data['unknowns'] + data['controls']:
        assigned(item['batches'], item['id'])
    for asset in data['assets']:
        crop = asset.get('cropPhysicalPixels')
        if crop:
            x1, y1, x2, y2 = crop
            source = asset['sourceImage']
            require(0 <= x1 < x2 <= source['widthPx'] and 0 <= y1 < y2 <= source['heightPx'], f"invalid crop {asset['asset']}")
    if errors:
        raise ValueError('\n'.join(errors))
    return {'screens': len(screens), 'requirements': len(requirements), 'transitions': len(data['transitions']), 'unknowns': len(data['unknowns']), 'controls': len(data['controls']), 'flows': len(data['flows']), 'tasks': len(data['taskAssignments']), 'batches': len(data['batches']), 'assets': len(data['assets']), 'errors': 0}


def renderScreens(data):
    lines = ['# Medium Parity — 200개 화면 비교 조건', '', '[Parity 1 결과](../FE_MEDIUM_PARITY_01_RESULT.md) · [Parity 2 결과](../FE_MEDIUM_PARITY_02_RESULT.md) · [실행 계획](EXECUTION_PLAN.md) · [기계 판독 원본](comparisonBaseline.json) · [공통 기준](COMPARISON_PROTOCOL.md)', '',
        '자동 생성: `python tools/medium-parity/buildBaseline.py --write`. 요구사항 원문과 수동 작성한 비교 profile을 결합한다. 경로는 현재 코드의 조사·재현 절차이며 200개 실제 실행 통과 기록이 아니다. `recipe-only`는 비교 준비 완료가 아니다. 계정·시간·권한은 비교용 기본안이며 원본 실제 계정/촬영시각을 추정하지 않는다. 아래 currentEvidence 필드는 호환을 위해 유지한 Parity 1 당시 증거다. 현재 코드 해시와 과거 촬영 코드가 같다는 뜻이 아니다. Parity 2의 당시 전후·회귀 기록은 해당 결과 문서를 따른다. 사용자 커밋 6853256에서 기존 EVIDENCE 파일이 삭제됐으며 복원하지 않는다. Parity 5는 사용자 지시로 캡처·manifest를 저장하지 않고 결과 문서만 갱신한다. 입력의 null SHA는 삭제된 과거 capture log이며 현재 무결성 통과가 아니다.', '']
    for s in data['screens']:
        lines += [f"<a id=\"{s['id'].lower()}\"></a>", '', f"## {s['id']} — {s['title']}", '',
            f"{link(ROOT / s['png'], '원본 PNG')} · {link(ROOT / s['analysis'], '원본 분석')} · {link(ROOT / s['requirementsDocument'], 'R 수용 조건', '#' + s['id'].lower())} · `{s['referenceId']}`", '',
            f"- 담당: {s['visualTask']} / 묶음 {', '.join(map(str, s['batches']))}. 상태: **{s['readiness']}**. {s['blocker']}",
            *([f"- 최신 검토: {link(ROOT / s['latestReview']['result'], 'Parity 5 결과')}; {s['latestReview']['scope']}"] if s.get('latestReview', {}).get('result') == 'TODO/FE_MEDIUM_PARITY_05_RESULT.md' else []),
            f"- 실제 FE 진입 절차(정적 확인): {s['routeRecipe']}",
            f"- Parity 1 당시 증거: {', '.join(link(ROOT / c['path'], '과거 웹 캡처') for c in s['currentEvidence']) or '없음; 정적 절차만 연결'}. 캡처의 실제 계정은 guest이며 아래 A 비교 기본안과 구분한다.",
            f"- 코드: {', '.join(link(ROOT / p) for p in s['code'])}",
            f"- 계정·권한: {s['accountAndPermission']}",
            f"- fixture 구성: {s['fixtureRecipe']}",
            f"- 원본 관찰 표시값: {s['referenceObservations']['D']}",
            f"- 원본 관찰 상태: {s['referenceObservations']['S']}",
            f"- 시간: {s['conditions']['clock']}",
            f"- 스크롤: {s['conditions']['scroll']}",
            f"- 테마: {s['conditions']['theme']}; 키보드: {s['conditions']['keyboard']}",
            f"- 크기/플랫폼: PNG {s['image']['widthPx']}×{s['image']['heightPx']} 물리 px; 비교 CP-WEB-01=390×844 CSS px/DSF1; {s['conditions']['platform']}; crop 미정(null), OS 영역 포함 원본 보존.",
            f"- 추적: {', '.join(s['steps'])} / {', '.join(s['unknowns'])} / {', '.join(s['controls'])}. 모든 R-ID·source 후보·해시는 JSON에 보존.",
            f"- 종료 조건: {s['acceptance']}", '']
    return '\n'.join(lines).rstrip() + '\n'


def renderPlan(data):
    lines = ['# Medium Parity 실행 계획', '', '[Parity 1 결과](../FE_MEDIUM_PARITY_01_RESULT.md) · [Parity 2 결과](../FE_MEDIUM_PARITY_02_RESULT.md) · [Parity 3 결과](../FE_MEDIUM_PARITY_03_RESULT.md) · [Parity 4 결과](../FE_MEDIUM_PARITY_04_RESULT.md) · [Parity 5 결과](../FE_MEDIUM_PARITY_05_RESULT.md) · [보완 목록](../FE_MEDIUM_PARITY_BACKLOG.md) · [200화면 조건](COMPARISON_BASELINE.md)', '',
        '이 번호는 새 실행 묶음이며 기존 Goal1~53의 번호·완료 이력을 변경하지 않는다. 묶음4의 읽기 연결 보완에 이어 묶음5의 D06 관계 카탈로그·관리 목록과 V11/V14/V15의 동작·부분 시각 보정을 진행했다. 현재 결과는 Parity 5 문서와 추가 재검토를 따른다. 차단 중 명시적 Unfollow·목록 이름 조회 재시도·관계 메뉴와 신고 초안의 화면 이탈 처리를 보완했다. 원본 차이·U 미확인·native 대기는 유지한다. 다음 순서는 묶음6이며 미착수이고 자동 시작하지 않는다. 번호는 추천 순서이고 depends는 선행 범위다. 선행 묶음의 미확인·native 대기는 독립 작업을 막지 않지만 해당 조건을 완료로 승격하지 않는다.', '',
        '공통: 각 묶음의 V에 연결된 모든 R·T와 U-S/U-F를 확인한다. Q02/Q03/Q08/Q12는 공통 소비자로 이어지고 Q09는 과거 문구 판정만 완료다. 단순히 작업을 배정한 것은 정책 확정이나 구현 승인이 아니다. 기능 검증과 화면 비교, OS/실서비스 효력을 별도 판정한다.', '']
    for b in data['batches']:
        number = b['number']
        owned = [s for s in data['screens'] if number in s['batches']]
        trace = {key: unique(value for s in owned for value in s[key]) for key in ('steps', 'unknowns', 'controls')}
        controls = [c['id'] for c in data['controls'] if number in c['batches']]
        unknowns = [u['id'] for u in data['unknowns'] if number in u['batches']]
        lines += [f'<a id="batch-{number:02}"></a>', '', f"## 묶음 {number} — {b['title']}", '',
            f"- 직접 대상: {', '.join(b['items']) or '해당 V 화면의 R/T/U/C'}. 상태: {b['status']}.",
            f"- 선행: {', '.join(map(str, b['depends'])) or '없음'}.", f"- 구현/판정 범위: {b['scope']}.", f"- 검증·종료 조건: {b['done']}.",
            f"- 결과 문서: " + (link(ROOT / f'TODO/FE_MEDIUM_PARITY_{number:02}_RESULT.md') if number <= 5 else f"`TODO/FE_MEDIUM_PARITY_{number:02}_RESULT.md` (예정 경로)") + '.',
            f"- 화면: {', '.join(s['id'] for s in owned) or '공통 기준 또는 전수/기기 검증 범위; 아래 배정표 참조'}.",
            f"- 흐름/단계: {', '.join(trace['steps']) or '대상 전체에 적용; 각 화면 추적과 JSON에서 조회'}.",
            f"- 미확인 담당: {', '.join(unknowns) or '각 화면 담당과 공통 경계 조율'}.",
            f"- 기존 C 계약: {', '.join(controls)}.", '']
    lines += ['## D/Q/V 전체 배정과 부분 완료 규칙', '', '| ID | 작업 | 담당 묶음 | 종료 해석 |', '| --- | --- | --- | --- |']
    for task, assigned in sorted(data['taskAssignments'].items()):
        note = '각 소비자 완료 후 항목 전체 판정' if len(assigned) > 1 else '해당 수용 조건 충족 후 판정'
        if task == 'Q07': note = '사용자 후속 기기 진행 대기 유지'
        if task == 'Q08': note = '실제 외부 서비스 제외 유지; 신규 구현 작업 아님'
        if task == 'Q09': note = '기존 문서 판정 완료; S015/S068/S125 시각은 9/16/4에서 별도'
        if task == 'Q03': note = '263 묶음의 각 질문 판정; 자료 대기를 동일성 완료로 처리 금지'
        lines.append(f"| [{task}](../FE_MEDIUM_PARITY_BACKLOG.md#{task.lower()}) | {data['taskTitles'][task]} | {', '.join(map(str, assigned))} | {note} |")
    lines += ['', 'D04는 Digest(6)와 note/기타 시간 소비자(7), D11은 Digest(6)와 내 목록(7)을 모두 확인해야 닫힌다. Q11은 적용 범위(4)·Highlight(11)·Listen(12)을 별도 판정한다. V30/S043은 온보딩(14), 자산·설정(18), 실제 cold start(21)로 나뉜다. Q02/Q12의 공통 작업(2)이 끝나도 각 화면의 남은 차이는 각 묶음과 최종22까지 추적한다.', '']
    return '\n'.join(lines)


def renderAssets(data):
    lines = ['# Q02 — 공통 자산과 레이아웃 기준', '', '[비교 프로토콜](COMPARISON_PROTOCOL.md) · [실행 계획](EXECUTION_PLAN.md#batch-02)', '',
        'Parity 1에서 자산을 조사했고 [Parity 2](../FE_MEDIUM_PARITY_02_RESULT.md)에서 모바일 웹의 본문 폭·이미지 비율·팝오버 안전 영역과 표시 설정 구획/선택 아이콘을 보정했다. 원본 폰트 확보·모든 화면 렌더 일치·아이콘 전체 완료가 아니다. 원본 crop은 로컬 비교 자료로만 분류하며 독립 원본 자산이나 서비스 사용 권리 확보로 확대하지 않는다.', '',
        '| 영역 | 실제 코드/확보 상태 | 남은 차이·담당 |', '| --- | --- | --- |',
        '| 서체 | `tokens.ts`: iOS System/Georgia/TimesNewRomanPS-BoldMT, Android sans-serif/serif, web Helvetica/Arial/Georgia/Times 대체. Parity 2 CDP에서 영어 제목 Arial Bold, 설정 Arial, 한국어 프로필 Malgun Gothic Bold 확인 | 원본 font 파일·weight mapping 미확보; 각 V의 서체/줄바꿈 잔여 |',
        '| 타입 크기 | pageTitle24/32, body16/24, storyTitle20/25/-0.4, storyBody20/30 | 근사 토큰; 원본 공식 토큰 아님; 100/120%와 폰트·너비별 독립 비교 |',
        '| 작성 글 | DocumentReader 기본 serif18/30, 제목28/36 | 일반 reader 설정과 분리된 D03 잔여; 묶음4/9/10 |',
        '| 정책 기사 | [Parity 3](../FE_MEDIUM_PARITY_03_RESULT.md): reader 본문18/30, Medium Policy/Medium 아바타는 M 대체, 기존 SVG 도구·48px 조작 영역 | S008/V21 원본 로고/아바타·서체·정확 간격·숫자 크기 잔여; 독립 원본 자산을 새로 확보한 것은 아님 |',
        '| 읽기 설정·이력 | [Parity 4](../FE_MEDIUM_PARITY_04_RESULT.md): 발행 본문18/30에 공통 크기/글꼴/테마 적용, 큰 글자의 하위 메뉴 실제 행 기준 배치, 이력 빈 카드 모서리 보정 | 원본 글꼴 미확보·이력 중간 기사/응답 집계·OS 영역과 정확 간격은 잔여; 새 자산 확보 없음 |',
        '| 여백·색 | spacing8/16/24/32; light#fff/#242424/green#1a8917, dark#121212 | 임의 픽셀 점수로 통과 금지; 색공간 확인과 화면별 좌표 필요 |',
        '| 아이콘 | shared/ui의 SVG 기반 AppIcon/TabIcon 및 feature별 아이콘 | 원본 vector 파일 미확보; 48×48 조작영역과 보이는24px 토큰을 분리해서 비교 |',
        '| 이미지 | 아래 SOURCES.json에 연결된 crop 파일 확보 | crop 위치·리샘플·aspect/cover·렌더 위치는 각 화면에서 별도 비교 |',
        '| 앱 아이콘 | app-icons 8개는 자체 K 기하 도형, SOURCES.md 명시 | 원본 Medium 자산과 차이 유지; D10/묶음18, 실제 적용Q07/21 |',
        '| 시작 화면 | app.json 대응 splash 설정 없음 | assets/splash-icon.png 존재만으로 S043 구현으로 처리 금지; D10 |',
        '| 자체 UI | Continue setup/Drafts/Mock/Reading tools/모의발행·결제·무음안내 | [상태별 처리 기준](OWN_UI_POLICY.md); 기준 정리 완료/화면별 적용 잔여 |', '',
        '근거: [tokens.ts](../../FE/src/shared/theme/tokens.ts), [reader 설정](../../FE/src/features/settings/useReaderTypography.ts), [발행 본문](../../FE/src/features/editor/DocumentReader.tsx), [앱 설정](../../FE/app.json), [아이콘 출처](../../FE/assets/app-icons/SOURCES.md).', '',
        '## 출처가 연결된 비교 이미지', '', '| 파일 | 실제 크기(px) | 원본·crop(물리px) | 상태 |', '| --- | --- | --- | --- |']
    for asset in data['assets']:
        image = asset['image']
        lines.append(f"| {link(ROOT / asset['asset'])} | {image['widthPx']}×{image['heightPx']} | {link(ROOT / asset['source'], '원본')} / {asset.get('cropPhysicalPixels', '출처 레코드 참조')} | 확보/렌더 비교 대기 |")
    tracked = {a['asset'] for a in data['assets']}
    others = [p for p in sorted((ROOT / 'FE/assets').rglob('*.png')) if relative(p) not in tracked]
    lines += ['', '## 별도 앱/기본 자산', '', '| 파일 | 크기(px) | 분류 |', '| --- | --- | --- |']
    for path in others:
        info = pngInfo(path)
        lines.append(f"| {link(path)} | {info['widthPx']}×{info['heightPx']} | {'자체 K; 원본과 다름' if 'app-icons' in path.parts else '기본 자산; 존재/실제 사용/원본 동일성을 별도 확인'} |")
    lines += ['', '원본 데이터·자산 차이를 공통 CSS/토큰 변경만으로 숨기지 않는다. Q02의 공통 보정 후 모든 영향을 받는 V의 개별 조건을 다시 확인한다. 보관 원본에 없는 폰트명·자산·배치 허용치를 사실로 채우지 않는다.', '']
    return '\n'.join(lines)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--screen')
    args = parser.parse_args()
    data = extract()
    summary = validate(data)
    outputs = {'comparisonBaseline.json': json.dumps(data, ensure_ascii=False, indent=2) + '\n', 'COMPARISON_BASELINE.md': renderScreens(data), 'EXECUTION_PLAN.md': renderPlan(data), 'ASSET_BASELINE.md': renderAssets(data)}
    if args.write:
        for name, content in outputs.items():
            (DOCS / name).write_text(content, encoding='utf-8', newline='\n')
    if args.check:
        for name, content in outputs.items():
            if not (DOCS / name).is_file() or read(DOCS / name) != content:
                raise ValueError(f'Generated output differs: {name}')
    if args.screen:
        matches = [s for s in data['screens'] if s['id'] == args.screen]
        if not matches:
            parser.error('Unknown screen ID')
        print(json.dumps(matches[0], ensure_ascii=False, indent=2))
    else:
        print(json.dumps(summary, ensure_ascii=False))


if __name__ == '__main__':
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    main()
