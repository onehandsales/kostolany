"""묶음 3의 전체 배정 검사와 새 실행 증거를 구분해 검증한다."""

import argparse
import hashlib
import json
import re

from buildBaseline import ROOT, read, relative
from verifyParity02 import build, verify

EVIDENCE = ROOT / 'TODO/MEDIUM_PARITY/EVIDENCE/PARITY_03'


def inventory():
    baseline = json.loads(read(ROOT / 'TODO/MEDIUM_PARITY/comparisonBaseline.json'))
    analyses = {relative(p): p for p in (ROOT / 'medium/flows').rglob('ANALYSIS.md')}
    images = {relative(p): p for p in (ROOT / 'medium/flows').rglob('*.png')}
    flows = baseline['flows']
    transitions = baseline['transitions']
    screens = baseline['screens']
    errors = []
    if set(analyses) != {flow['analysis'] for flow in flows}:
        errors.append('Analysis inventory differs')
    if set(images) != {step['png'] for step in transitions} or len(transitions) != len(images):
        errors.append('Step image inventory differs or is duplicated')
    by_id = {}
    for path, image in images.items():
        match = re.fullmatch(r'(\d{2})_(sc_[a-f0-9]+)\.png', image.name)
        if not match:
            errors.append('Invalid image filename: ' + path)
            continue
        digest = hashlib.sha256(image.read_bytes()).hexdigest()
        if match[2] in by_id and by_id[match[2]] != digest:
            errors.append('Same screen ID has different bytes: ' + path)
        by_id[match[2]] = digest
    if set(by_id) != {screen['referenceId'] for screen in screens} or len(screens) != len(by_id):
        errors.append('Unique screen inventory differs')
    transitions_by_id = {step['id']: step for step in transitions}
    for flow in flows:
        analysis = analyses.get(flow['analysis'])
        if not analysis:
            continue
        table = re.findall(r'^\| (\d{2}) \| .*?\]\(<(screens/[^>]+)>\)', read(analysis), re.M)
        expected = [relative(analysis.parent / path) for _, path in table]
        actual = [transitions_by_id[tid]['png'] for tid in flow['steps']]
        if expected != actual or [number for number, _ in table] != [f'{i:02}' for i in range(1, len(table) + 1)]:
            errors.append('Analysis step order differs: ' + flow['id'])
    expected_tasks = {f'{prefix}{i:02}' for prefix, count in [('D', 13), ('Q', 12), ('V', 34)] for i in range(1, count + 1)}
    if set(baseline['taskAssignments']) != expected_tasks:
        errors.append('Task inventory differs')
    for key in ['screens', 'unknowns', 'controls']:
        for record in baseline[key]:
            if not record['batches']:
                errors.append('Unassigned: ' + record['id'])
    for task, batches in baseline['taskAssignments'].items():
        if not batches:
            errors.append('Unassigned task: ' + task)
    link_count = 0
    for analysis in analyses.values():
        for target in re.findall(r'\]\(<?([^\n)]+?)>?\)', read(analysis)):
            if re.match(r'^https?://|^#', target):
                continue
            link_count += 1
            if not (analysis.parent / target.split('#')[0]).exists():
                errors.append('Missing analysis link: ' + relative(analysis) + ' -> ' + target)
    counts = {'flows': len(flows), 'steps': len(transitions), 'uniqueScreens': len(by_id),
              'tasks': len(expected_tasks), 'batches': len(baseline['batches']), 'analysisLinks': link_count}
    if [counts['flows'], counts['steps'], counts['uniqueScreens']] != [63, 273, 200]:
        errors.append('Expected 63 flows / 273 steps / 200 unique screens')
    return {**counts, 'errors': errors, 'scope': 'Inventory and assignment only; not visual or behavioral completion'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--inventory', action='store_true')
    parser.add_argument('--write', action='store_true')
    parser.add_argument('--check-code', action='store_true')
    parser.add_argument('--phases', default='flow-review,small-review,large-review,wide-review,tools-review,listening-review,entry-review')
    args = parser.parse_args()
    if args.inventory:
        result = inventory()
        print(json.dumps(result, ensure_ascii=False))
        raise SystemExit(bool(result['errors']))
    manifest = EVIDENCE / 'evidence-manifest.json'
    if args.write:
        if manifest.exists():
            raise FileExistsError('Preserve the accepted manifest')
        data = build(EVIDENCE, tuple(args.phases.split(',')))
        data['scope'] = 'Parity 3 policy article; original visual differences and native verification remain'
        data['beforeCode'] = 'preflight.json applies to before-final; first-review-code.json records FE code for frontend-final and the earlier *-final/listening-before runs; failed before is a harness diagnostic'
        data['afterCode'] = 'sourceFiles apply to the accepted runs listed in runs, frontend-review, frontend-review-retry and js-export-review; earlier captures are preserved separately and are not new-code proof'
        with manifest.open('x', encoding='utf-8', newline='\n') as output:
            output.write(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(verify(json.loads(read(manifest)), args.check_code, EVIDENCE)))
