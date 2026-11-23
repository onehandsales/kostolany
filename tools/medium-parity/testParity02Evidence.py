import copy
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import verifyParity02 as proof


class ParityEvidenceTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.log = json.loads(proof.read(proof.EVIDENCE / 'review/captures.json'))

    def test_original_archive_remains_valid(self):
        """새 검사기로도 변경하지 않은 최초 촬영 로그와 PNG를 검증한다."""
        self.assertEqual(sum(r['captureCount'] for r in proof.capture_runs()), 53)

    def test_empty_and_duplicate_runs_fail(self):
        """완료 표시가 있어도 비어 있거나 중복된 촬영 목록은 거부한다."""
        for empty in (True, False):
            with self.subTest(empty=empty):
                bad = copy.deepcopy(self.log)
                bad['captures'] = [] if empty else [bad['captures'][0]] * 2
                bad['run']['requestedScreens'] = [c['id'] for c in bad['captures']]
                with self.assertRaisesRegex(ValueError, 'inventory'):
                    proof.validate_capture_log(bad, 'review')

    def test_condition_drift_fails(self):
        """PNG 크기가 맞아도 선언한 화면과 촬영 시계·배율·시간대가 다르면 거부한다."""
        changes = [('date', '2000-01-01T00:00:00.000Z'), ('viewport', [320, 568]),
                   ('dpr', 2), ('timezone', 'Asia/Seoul')]
        for key, value in changes:
            with self.subTest(key=key):
                bad = copy.deepcopy(self.log)
                bad['captures'][0]['snapshot'][key] = value
                with self.assertRaisesRegex(ValueError, 'conditions differ'):
                    proof.validate_capture_log(bad, 'review')
        bad = copy.deepcopy(self.log)
        bad['run']['viewport'] = [320, 568]
        with self.assertRaisesRegex(ValueError, 'conditions differ'):
            proof.validate_capture_log(bad, 'review')

    def test_error_counter_cannot_hide_console_error(self):
        """오류 수가 영으로 적혀 있어도 실제 콘솔 오류 이벤트가 있으면 거부한다."""
        bad = copy.deepcopy(self.log)
        bad['events'].append({'method': 'Runtime.exceptionThrown', 'params': {}})
        with self.assertRaisesRegex(ValueError, 'Console errors contradict'):
            proof.validate_capture_log(bad, 'review')

    def test_added_or_missing_source_records_fail(self):
        """기존 파일의 해시만 같아도 새 파일이나 기록 누락이 있으면 코드 일치를 거부한다."""
        paths = proof.source_files()
        records = [{'path': proof.relative(p)} for p in paths]
        proof.validate_source_inventory(records)
        with self.assertRaisesRegex(ValueError, 'source inventory differs'):
            proof.validate_source_inventory(records[:-1])
        with patch.object(proof, 'source_files', return_value=paths + [proof.ROOT / 'FE/src/new-consumer.tsx']):
            with self.assertRaisesRegex(ValueError, 'source inventory differs'):
                proof.validate_source_inventory(records)

    def test_existing_manifest_cannot_be_reassigned(self):
        """이전 촬영 기록에 새 코드 해시를 덮어쓰지 않고 원래 내용을 보존한다."""
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            file = root / 'evidence-manifest.json'
            file.write_text('accepted historical evidence', encoding='utf-8')
            with self.assertRaises(FileExistsError):
                proof.write_manifest(root, ('review',))
            self.assertEqual(file.read_text(encoding='utf-8'), 'accepted historical evidence')
