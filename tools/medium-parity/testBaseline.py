import copy
import tempfile
import unittest
from pathlib import Path

import buildBaseline


class BaselineValidationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = buildBaseline.extract()

    def test_reference_inventory_is_complete(self):
        """현재 원본 파일을 읽어 화면과 단계가 누락 없이 연결되는지 검사한다."""
        self.assertEqual(buildBaseline.validate(self.data)['screens'], 200)

    def test_missing_screen_fails(self):
        """한 화면이 빠지면 다른 화면의 검사 성공으로 대신하지 못하게 한다."""
        damaged = copy.deepcopy(self.data)
        damaged['screens'].pop()
        with self.assertRaises((ValueError, KeyError)):
            buildBaseline.validate(damaged)

    def test_unassigned_task_fails(self):
        """보완 항목의 담당이 사라지면 배정 완료로 보고하지 못하게 한다."""
        damaged = copy.deepcopy(self.data)
        damaged['taskAssignments']['D13'] = []
        with self.assertRaisesRegex(ValueError, 'unassigned task'):
            buildBaseline.validate(damaged)

    def test_ready_without_evidence_fails(self):
        """새 실행 증거 없이 비교 준비 완료로 올린 기록을 거부한다."""
        damaged = copy.deepcopy(self.data)
        damaged['screens'][0]['readiness'] = 'ready'
        damaged['screens'][0]['currentEvidence'] = []
        with self.assertRaisesRegex(ValueError, 'no evidence S001'):
            buildBaseline.validate(damaged)

    def test_dependency_cycle_fails(self):
        """선행 묶음이 자기 자신을 가리키면 실행 순서를 거부한다."""
        damaged = copy.deepcopy(self.data)
        damaged['batches'][1]['depends'] = [2]
        with self.assertRaisesRegex(ValueError, 'dependency order 2'):
            buildBaseline.validate(damaged)

    def test_different_png_for_same_screen_fails(self):
        """같은 화면을 가리키는 단계의 이미지 내용이 달라지면 검사를 실패시킨다."""
        damaged = copy.deepcopy(self.data)
        damaged['screens'][0]['image']['sha256'] = '0' * 64
        with self.assertRaisesRegex(ValueError, 'PNG differs'):
            buildBaseline.validate(damaged)

    def test_crop_outside_source_fails(self):
        """원본 바깥의 crop 좌표를 확보된 비교 자산으로 인정하지 않는다."""
        damaged = copy.deepcopy(self.data)
        damaged['assets'][0]['cropPhysicalPixels'] = [-1, 0, 1, 1]
        with self.assertRaisesRegex(ValueError, 'invalid crop'):
            buildBaseline.validate(damaged)

    def test_nonexistent_batch_fails_for_each_assignment(self):
        """존재하지 않는 묶음 번호를 작업이나 화면의 담당으로 배정하지 못하게 한다."""
        for field in ('taskAssignments', 'screens', 'unknowns', 'controls'):
            with self.subTest(field=field):
                damaged = copy.deepcopy(self.data)
                if field == 'taskAssignments':
                    damaged[field]['D13'] = [99]
                else:
                    damaged[field][0]['batches'] = [99]
                with self.assertRaisesRegex(ValueError, 'invalid assignment'):
                    buildBaseline.validate(damaged)

    def test_duplicate_batch_fails(self):
        """실행 묶음 하나를 중복하면 다른 묶음의 완료 조건을 대신하지 못하게 한다."""
        damaged = copy.deepcopy(self.data)
        damaged['batches'][-1] = copy.deepcopy(damaged['batches'][-2])
        with self.assertRaisesRegex(ValueError, 'batch coverage or duplicate'):
            buildBaseline.validate(damaged)

    def test_missing_capture_fails_before_ready(self):
        """진단 캡처도 실제 파일이 없으면 증거가 있는 상태로 인정하지 않는다."""
        damaged = copy.deepcopy(self.data)
        damaged['screens'][0]['currentEvidence'][0]['path'] = 'TODO/nonexistent-proof.png'
        with self.assertRaisesRegex(ValueError, 'evidence missing S001'):
            buildBaseline.validate(damaged)

    def test_unknown_capture_id_fails(self):
        """원본 화면에 연결되지 않은 캡처를 조용히 누락시키지 않는다."""
        damaged = copy.deepcopy(self.data)
        damaged['evidenceContext']['captures'][0]['id'] = 'S999'
        with self.assertRaisesRegex(ValueError, 'unknown capture ID'):
            buildBaseline.validate(damaged)

    def test_broken_step_trace_fails(self):
        """화면에서 다른 흐름 단계로 잘못 연결한 추적 정보를 거부한다."""
        damaged = copy.deepcopy(self.data)
        damaged['screens'][0]['steps'] = ['T-F99-99']
        with self.assertRaisesRegex(ValueError, 'step trace differs S001'):
            buildBaseline.validate(damaged)

    def test_native_photo_screen_requires_device_batch(self):
        """OS 사진 화면의 구현 담당과 실제 기기 검증 담당을 함께 유지한다."""
        damaged = copy.deepcopy(self.data)
        damaged['screens'][112]['batches'].remove(21)
        with self.assertRaisesRegex(ValueError, 'native assignment missing S113'):
            buildBaseline.validate(damaged)

    def test_text_hash_ignores_checkout_line_endings(self):
        """동일 텍스트의 줄바꿈은 정규화하되 PNG에 쓰는 원본 바이트 해시는 보존한다."""
        with tempfile.TemporaryDirectory() as folder:
            lf, crlf = Path(folder) / 'lf', Path(folder) / 'crlf'
            lf.write_bytes(b'one\ntwo\n')
            crlf.write_bytes(b'\xef\xbb\xbfone\r\ntwo\r\n')
            self.assertEqual(buildBaseline.textDigest(lf), buildBaseline.textDigest(crlf))
            self.assertNotEqual(buildBaseline.digest(lf), buildBaseline.digest(crlf))


if __name__ == '__main__':
    unittest.main()
