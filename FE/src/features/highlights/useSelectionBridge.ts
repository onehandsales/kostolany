import type { SelectionBridgeProps } from './selectionBridge.types';
// 네이티브 본문 Text는 범위를 반환하지 않아 별도 선택 입력의 실제 selection 이벤트를 사용한다.
export function useSelectionBridge(_props: SelectionBridgeProps) {}
export function clearTextSelection(): void {}
export function revealPassage(_id: string, _start: number): boolean { return false; }
