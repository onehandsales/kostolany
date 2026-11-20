import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { insertImage, type EditorValue } from './editorModel';
import type { EditorImageSource, ImageAsset, ImageLease, ImageOrigin } from './imageSource';

type PendingImage = { id: string; asset: ImageAsset; origin: ImageOrigin; value: EditorValue; source: EditorImageSource; ownerId: string | undefined; revision: number; status: 'loading' | 'error' };

export function useImageInsertion(value: EditorValue, source: EditorImageSource, onChange: (value: EditorValue) => void) {
  const { state, store } = useAuth();
  const ownerId = state.user?.id; const revision = state.revision;
  const [pending, setPending] = useState<PendingImage | null>(null);
  const job = useRef<{ id: string; abort: AbortController } | null>(null);
  const sequence = useRef(0);
  const leases = useRef(new Map<string, ImageLease>());
  const live = useRef({ value, source, ownerId, revision });
  useEffect(() => { live.current = { value, source, ownerId, revision }; }, [value, source, ownerId, revision]);
  useEffect(() => {
    const resources = leases.current;
    return () => {
      job.current?.abort.abort(); job.current = null;
      resources.forEach(lease => lease.release()); resources.clear();
    };
  }, [source, ownerId, revision]);
  useEffect(() => {
    const ids = new Set(value.document.images.map(image => image.id));
    leases.current.forEach((lease, id) => { if (!ids.has(id)) { lease.release(); leases.current.delete(id); } });
  }, [value.document.images]);
  const valid = pending && pending.value.document === value.document && pending.source === source && pending.ownerId === ownerId && pending.revision === revision;
  function cancel() { job.current?.abort.abort(); job.current = null; setPending(null); }
  async function run(request: PendingImage) {
    if (job.current) return;
    const abort = new AbortController(); job.current = { id: request.id, abort };
    setPending({ ...request, status: 'loading' });
    const current = () => job.current?.id === request.id && !abort.signal.aborted &&
      store.getSnapshot().user?.id === ownerId && store.getSnapshot().revision === revision &&
      live.current.source === source && live.current.value.document === request.value.document;
    try {
      const lease = await source.prepare(request.asset.assetId, abort.signal);
      if (!current()) { lease.release(); return; }
      if (lease.asset.assetId !== request.asset.assetId || !Number.isFinite(lease.asset.width) || !Number.isFinite(lease.asset.height) ||
        lease.asset.width <= 0 || lease.asset.height <= 0 || !source.resolve(lease.asset.assetId)) {
        lease.release(); throw new Error('invalid-image-result');
      }
      const next = insertImage(request.value, { ...lease.asset, id: request.id, source: request.origin });
      leases.current.set(request.id, lease); onChange(next); setPending(null);
    } catch {
      if (current()) setPending({ ...request, status: 'error' });
    } finally { if (job.current?.id === request.id) job.current = null; }
  }
  return { pending: valid ? pending : null, cancel,
    select(asset: ImageAsset, origin: ImageOrigin) {
      if (job.current) return;
      let id: string;
      do { id = `image-${revision}-${++sequence.current}`; } while (value.document.images.some(image => image.id === id));
      void run({ id, asset, origin, value, source, ownerId, revision, status: 'loading' });
    },
    retry() { if (pending && valid) void run(pending); },
  };
}
