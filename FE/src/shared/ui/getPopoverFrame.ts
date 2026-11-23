type PopoverFrameInput = {
  width: number;
  height: number;
  insets: { top: number; bottom: number; left: number; right: number };
  preferredWidth: number;
  top: number;
  right: number;
};

// 가로 회전이나 짧은 화면에서도 메뉴 한 행과 스크롤 영역이 안전 영역 안에 남도록 위치를 제한한다.
export function getPopoverFrame({ width, height, insets, preferredWidth, top, right }: PopoverFrameInput) {
  const margin = 8;
  const usableWidth = Math.max(0, width - insets.left - insets.right - margin * 2);
  const popupWidth = Math.min(preferredWidth, usableWidth);
  const popupRight = Math.max(insets.right + margin, Math.min(insets.right + right, width - insets.left - margin - popupWidth));
  const bottom = Math.max(insets.top, height - insets.bottom - margin * 2);
  const popupTop = Math.max(insets.top, Math.min(insets.top + top, bottom - 48));
  return { width: popupWidth, right: popupRight, top: popupTop, maxHeight: Math.max(0, bottom - popupTop) };
}
