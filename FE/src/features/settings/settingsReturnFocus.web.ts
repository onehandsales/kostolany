export function captureSettingsReturnFocus(): () => void {
  const trigger = document.activeElement;
  return () => {
    if (trigger instanceof HTMLElement && trigger.isConnected && !trigger.closest('[aria-hidden="true"]'))
      trigger.focus({ preventScroll: true });
  };
}
