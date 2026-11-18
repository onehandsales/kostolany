export type SettingsPreviewScenario = 'normal' | 'read-error' | 'save-error' | 'slow';

// 장애 재현 뒤에는 정상 시나리오로 복원하고 전체 새로고침으로 공급부를 다시 만든다.
export const settingsPreviewScenario: SettingsPreviewScenario = 'normal';
