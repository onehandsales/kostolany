export type ProfilePreviewScenario = 'normal' | 'read-error' | 'save-error' | 'slow';

// 미리보기 장애를 재현한 뒤에는 정상 시나리오로 복원한다.
export const profilePreviewScenario: ProfilePreviewScenario = 'normal';
