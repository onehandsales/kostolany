export function restoreModalFocus(): void {
  // 인증으로 진입 버튼이 사라졌을 때만 현재 화면 제목으로 웹 키보드 포커스를 복구한다.
  if (document.activeElement !== document.body && document.activeElement?.isConnected) return;
  if (document.querySelector('[aria-modal="true"]')) return;
  const heading = [...document.querySelectorAll<HTMLElement>('[role="heading"]')].find((element) => (
    element.getBoundingClientRect().width > 0 && !element.closest('[aria-hidden="true"]')
  ));
  if (!heading) return;
  const previousTabIndex = heading.getAttribute('tabindex');
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
  heading.addEventListener('blur', () => {
    if (previousTabIndex === null) heading.removeAttribute('tabindex');
    else heading.setAttribute('tabindex', previousTabIndex);
  }, { once: true });
}
