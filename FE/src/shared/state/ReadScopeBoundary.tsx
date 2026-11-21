import { useEffect } from 'react';

type ReadScopeStore = { setReadScope: (scope: string) => void };

// 공유 저장소의 확정 값과 쓰기는 유지하고 화면을 구독하는 인증 범위의 조회만 교체한다.
export function ReadScopeBoundary({ store, scope }: { store: ReadScopeStore | null; scope: string }) {
  useEffect(() => {
    store?.setReadScope(scope);
    return () => store?.setReadScope('');
  }, [store, scope]);
  return null;
}
