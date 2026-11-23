"""Parity 2의 채택 증거를 보관하고 이후 체크아웃에서 무결성을 확인한다."""

import argparse
import hashlib
import json
import re
import subprocess
from datetime import datetime

from buildBaseline import ROOT, pngInfo, read, relative, textDigest


EVIDENCE = ROOT / 'TODO/MEDIUM_PARITY/EVIDENCE/PARITY_02'
MANIFEST = EVIDENCE / 'evidence-manifest.json'
PHASES = ('before', 'review', 'small', 'large-text', 'own-ui', 'shared', 'short')


def fingerprint(path):
    return hashlib.sha256(path.read_bytes()).hexdigest() if path.suffix == '.png' else textDigest(path)


def validate_capture_log(data, phase):
    run = data['run']
    captures = data['captures']
    requested = run['requestedScreens']
    if (not requested or len(requested) != len(set(requested))
            or requested != [c['id'] for c in captures]
            or any(not re.fullmatch(r'S\d{3}|Q12-[a-z0-9-]+', sid) for sid in requested)):
        raise ValueError(f'Capture inventory differs or is empty: {phase}')
    if data['profile'] != 'CP-WEB-01' or run['status'] != 'completed' or run['consoleErrors'] != 0:
        raise ValueError(f'Incomplete or errored run: {phase}')
    if datetime.fromisoformat(run['finishedAt']) < datetime.fromisoformat(run['startedAt']):
        raise ValueError(f'Invalid run times: {phase}')
    errors = [e for e in data['events'] if e['method'] == 'Runtime.exceptionThrown'
              or e.get('params', {}).get('type') == 'error'
              or e.get('params', {}).get('entry', {}).get('level') == 'error']
    if errors:
        raise ValueError(f'Console errors contradict run summary: {phase}')
    # 이전 도구가 생략한 viewport는 당시 CP-WEB-01 기본값으로만 해석한다.
    viewport = run.get('viewport', [390, 844])
    if len(viewport) != 2 or any(type(n) is not int or not 240 <= n <= 1920 for n in viewport):
        raise ValueError(f'Invalid run viewport: {phase}')
    if run.get('textScale', 1) not in (1, 2):
        raise ValueError(f'Invalid diagnostic text scale: {phase}')
    for capture in captures:
        state = capture['snapshot']
        if (state['viewport'] != viewport or state['dpr'] != 1 or state['timezone'] != 'UTC'
                or state['date'] != '2025-06-13T12:00:00.000Z'):
            raise ValueError(f'Capture conditions differ: {phase}/{capture["id"]}')
        if len(capture.get('assertions', [])) != len(capture['steps'].get('assert', [])):
            raise ValueError(f'Assertion evidence missing: {phase}/{capture["id"]}')


def capture_runs(evidence=EVIDENCE, phases=PHASES):
    if not phases or len(phases) != len(set(phases)) or any(not re.fullmatch(r'[a-z][a-z0-9-]*', p) for p in phases):
        raise ValueError('Invalid or empty phase inventory')
    runs = []
    for phase in phases:
        log = evidence / phase / 'captures.json'
        data = json.loads(read(log))
        run = data['run']
        captures = data['captures']
        validate_capture_log(data, phase)
        for capture in captures:
            info = pngInfo(log.parent / (capture['id'] + '.png'))
            if info['sha256'] != capture['imageSha256']:
                raise ValueError(f'Image hash differs: {phase}/{capture["id"]}')
            if [info['widthPx'], info['heightPx']] != capture['snapshot']['viewport']:
                raise ValueError(f'Image viewport differs: {phase}/{capture["id"]}')
        runs.append({'phase': phase, 'log': relative(log), 'run': run,
                     'captureCount': len(captures),
                     'assertions': sum(len(c.get('assertions', [])) for c in captures)})
    return runs


def source_files():
    code = sorted([p for p in (ROOT / 'FE/src').rglob('*') if p.suffix in ('.ts', '.tsx')]
                  + [ROOT / 'FE/App.tsx', ROOT / 'FE/app.json', ROOT / 'FE/package.json', ROOT / 'FE/package-lock.json'])
    tools = sorted((ROOT / 'tools/medium-parity').glob('*.mjs')) + sorted((ROOT / 'tools/medium-parity').glob('*Scenarios.json')) + sorted((ROOT / 'tools/medium-parity').glob('*.py'))
    return code + tools


def validate_source_inventory(records):
    recorded = [item['path'] for item in records]
    if len(recorded) != len(set(recorded)) or set(recorded) != {relative(p) for p in source_files()}:
        raise ValueError('Current source inventory differs; added, deleted or missing source records')


def build(evidence=EVIDENCE, phases=PHASES):
    runs = capture_runs(evidence, phases)
    artifacts = [p for p in evidence.rglob('*') if p.is_file() and p != evidence / 'evidence-manifest.json']
    return {
        'baseCommit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
        'scope': 'Parity 2 common corrections; no screen parity or native completion claim',
        'beforeCode': 'Earlier evidence retains its own manifest and source hashes; see result document',
        'afterCode': 'sourceFiles at this review; do not reassign older captures to these hashes',
        'hashRule': 'PNG raw bytes; text UTF-8 without BOM, LF newlines',
        'runs': runs,
        'artifacts': [{'path': relative(p), 'sha256': fingerprint(p)} for p in sorted(artifacts)],
        'sourceFiles': [{'path': relative(p), 'sha256': textDigest(p)} for p in source_files()],
    }


def verify(data, check_code=False, evidence=EVIDENCE):
    if data['runs'] != capture_runs(evidence, tuple(r['phase'] for r in data['runs'])):
        raise ValueError('Run summary differs from archived capture logs')
    recorded = {item['path'] for item in data['artifacts']}
    actual = {relative(p) for p in evidence.rglob('*') if p.is_file() and p != evidence / 'evidence-manifest.json'}
    if len(recorded) != len(data['artifacts']) or recorded != actual:
        raise ValueError('Evidence inventory differs')
    if check_code:
        validate_source_inventory(data['sourceFiles'])
    checked = data['artifacts'] + (data['sourceFiles'] if check_code else [])
    for item in checked:
        path = ROOT / item['path']
        if not path.is_file() or fingerprint(path) != item['sha256']:
            raise ValueError(f'Missing file or hash mismatch: {item["path"]}')
    ignored = subprocess.run(['git', 'check-ignore', '--stdin', '-z'], cwd=ROOT,
                             input='\0'.join(item['path'] for item in checked).encode() + b'\0',
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if ignored.returncode != 1:
        raise ValueError('Git-ignored evidence/source or Git check failed: ' +
                         (ignored.stdout + ignored.stderr).decode('utf-8', errors='replace'))
    return {'runs': len(data['runs']), 'captures': sum(r['captureCount'] for r in data['runs']),
            'assertions': sum(r['assertions'] for r in data['runs']),
            'artifacts': len(data['artifacts']), 'currentCodeChecked': check_code, 'errors': 0}


def write_manifest(evidence, phases):
    manifest = evidence / 'evidence-manifest.json'
    if manifest.exists():
        raise FileExistsError('Preserve the accepted manifest; use a new evidence directory for a new review')
    data = build(evidence, phases)
    # 이미 채택한 촬영 근거에 현재 코드 해시를 덮어씌우지 않는다.
    with manifest.open('x', encoding='utf-8', newline='\n') as output:
        output.write(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--write', action='store_true')
    parser.add_argument('--check-code', action='store_true')
    parser.add_argument('--evidence', default=relative(EVIDENCE))
    parser.add_argument('--phases', default=','.join(PHASES))
    args = parser.parse_args()
    evidence = (ROOT / args.evidence).resolve()
    evidence.relative_to(ROOT / 'TODO/MEDIUM_PARITY/EVIDENCE')
    manifest = evidence / 'evidence-manifest.json'
    if args.write:
        write_manifest(evidence, tuple(args.phases.split(',')))
    print(json.dumps(verify(json.loads(read(manifest)), args.check_code, evidence), ensure_ascii=False))
