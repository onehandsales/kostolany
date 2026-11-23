import { useEffect } from 'react';

// 모바일 폭의 웹 미리보기에서는 스크롤바가 본문 폭을 줄이지 않게 하되 스크롤 동작은 유지한다.
export function PreviewLayout() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `@media (max-width: 600px) {
      * { scrollbar-width: none; }
      *::-webkit-scrollbar { display: none; }
    }`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  return null;
}
