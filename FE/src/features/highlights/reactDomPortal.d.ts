// 설치된 React DOM의 웹 선택 메뉴에 필요한 공개 함수만 명시적으로 선언한다.
declare module 'react-dom' {
  export function createPortal(children: import('react').ReactNode, container: Element | DocumentFragment,
    key?: string | number | null): import('react').ReactPortal;
}
