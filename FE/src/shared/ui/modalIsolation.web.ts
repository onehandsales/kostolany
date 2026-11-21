type SavedAttributes = { inert: boolean; hidden: string | null };
const stack: HTMLElement[] = [];
const saved = new Map<HTMLElement, SavedAttributes>();
let observer: MutationObserver | null = null;

function restore(element: HTMLElement, state: SavedAttributes) {
  element.inert = state.inert;
  if (state.hidden === null) element.removeAttribute('aria-hidden');
  else element.setAttribute('aria-hidden', state.hidden);
}
function apply() {
  saved.forEach((state, element) => restore(element, state));
  const modal = stack.filter((element) => element.isConnected).at(-1);
  if (!modal) return;
  let portal = modal;
  while (portal.parentElement && portal.parentElement !== document.body) portal = portal.parentElement;
  // 배경을 숨기기 전에 포커스를 활성 모달로 옮겨 가려진 요소가 계속 읽히지 않게 한다.
  if (!modal.contains(document.activeElement)) {
    const focus = modal.querySelector<HTMLElement>(
      'input:not([disabled]), textarea:not([disabled]), [role="button"][tabindex="0"], button:not([disabled]), [tabindex="0"]',
    );
    if (focus) focus.focus({ preventScroll: true });
    else {
      modal.tabIndex = -1;
      modal.focus({ preventScroll: true });
    }
  }
  for (const element of document.body.children) {
    if (!(element instanceof HTMLElement) || element === portal) continue;
    if (!saved.has(element))
      saved.set(element, { inert: element.inert, hidden: element.getAttribute('aria-hidden') });
    element.inert = true;
    element.setAttribute('aria-hidden', 'true');
  }
}

// 중첩 포털의 마지막 모달만 조작 가능하게 하고 원래 DOM 속성과 진입 포커스를 복원한다.
export function isolateModal(modal: HTMLElement): () => void {
  const opener =
    document.activeElement instanceof HTMLElement && !modal.contains(document.activeElement)
      ? document.activeElement
      : null;
  stack.push(modal);
  if (!observer) {
    observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true });
  }
  apply();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    const index = stack.lastIndexOf(modal);
    if (index >= 0) stack.splice(index, 1);
    apply();
    if (!stack.length) {
      observer?.disconnect();
      observer = null;
      saved.clear();
    }
    if (opener?.isConnected && !opener.closest('[inert]')) opener.focus({ preventScroll: true });
  };
}
