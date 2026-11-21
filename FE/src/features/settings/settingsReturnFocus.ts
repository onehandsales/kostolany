// 네이티브 경로 복귀 포커스는 navigation과 OS에 맡기며 실제 기기에서 별도로 확인한다.
export function captureSettingsReturnFocus(): () => void {
  return () => {};
}
