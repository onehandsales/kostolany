import type { SelectionPosition } from './selectionBridge.types';

type MenuBounds = { width: number; height: number; top: number; right: number; bottom: number; left: number };

// 선택 구간 위와 아래를 차례로 확인하고 실측 메뉴가 안전 영역 밖으로 나가지 않도록 제한한다.
export function passageMenuPosition(anchor: SelectionPosition, menu: { width: number; height: number }, bounds: MenuBounds) {
  const leftDp = bounds.left + 8;
  const topDp = bounds.top + 8;
  const widthDp = Math.max(0, bounds.width - bounds.left - bounds.right - 16);
  const heightDp = Math.max(0, bounds.height - bounds.top - bounds.bottom - 16);
  const menuWidthDp = Math.min(menu.width, widthDp);
  const menuHeightDp = Math.min(menu.height, heightDp);
  const aboveDp = anchor.y - menuHeightDp - 8;
  const belowDp = anchor.y + anchor.height + 8;
  const bottomDp = topDp + heightDp - menuHeightDp;
  const preferredTopDp = aboveDp >= topDp ? aboveDp : belowDp <= bottomDp ? belowDp : aboveDp;
  return {
    left: Math.max(leftDp, Math.min(leftDp + widthDp - menuWidthDp, anchor.x + anchor.width / 2 - menuWidthDp / 2)),
    top: Math.max(topDp, Math.min(bottomDp, preferredTopDp)),
    width: menuWidthDp,
    maxHeight: heightDp,
  };
}
