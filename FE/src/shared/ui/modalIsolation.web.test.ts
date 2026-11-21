/** @jest-environment jsdom */
import { isolateModal } from './modalIsolation.web';

function panel(label: string) {
  const portal = document.createElement('div');
  const modal = document.createElement('div');
  const button = document.createElement('button');
  button.textContent = label;
  modal.append(button);
  portal.append(modal);
  document.body.append(portal);
  return { portal, modal, button };
}
afterEach(() => {
  document.body.replaceChildren();
});

it('중첩 모달의 배경과 이전 모달을 가리고 마지막 해제 때 원래 속성과 진입 포커스를 복원한다', () => {
  const root = document.createElement('main');
  const opener = document.createElement('button');
  root.append(opener);
  document.body.append(root);
  opener.focus();
  const first = panel('First');
  const closeFirst = isolateModal(first.modal);
  expect(root.inert).toBe(true);
  expect(root.getAttribute('aria-hidden')).toBe('true');
  expect(document.activeElement).toBe(first.button);
  const second = panel('Second');
  const closeSecond = isolateModal(second.modal);
  expect(first.portal.inert).toBe(true);
  expect(document.activeElement).toBe(second.button);
  closeSecond();
  second.portal.remove();
  expect(first.portal.inert).not.toBe(true);
  expect(document.activeElement).toBe(first.button);
  closeFirst();
  closeFirst();
  expect(root.inert).not.toBe(true);
  expect(root.hasAttribute('aria-hidden')).toBe(false);
  expect(document.activeElement).toBe(opener);
});

it('열린 동안 추가한 배경은 격리하고 원래 숨김 속성과 종료 뒤의 새 DOM은 건드리지 않는다', async () => {
  const root = document.createElement('main');
  root.setAttribute('aria-hidden', 'false');
  document.body.append(root);
  const active = panel('Active');
  const close = isolateModal(active.modal);
  const later = document.createElement('aside');
  document.body.append(later);
  await Promise.resolve();
  expect(later.inert).toBe(true);
  close();
  active.portal.remove();
  expect(root.getAttribute('aria-hidden')).toBe('false');
  expect(later.hasAttribute('aria-hidden')).toBe(false);
  const after = document.createElement('aside');
  document.body.append(after);
  await Promise.resolve();
  expect(after.inert).not.toBe(true);
  expect(after.hasAttribute('aria-hidden')).toBe(false);
});
