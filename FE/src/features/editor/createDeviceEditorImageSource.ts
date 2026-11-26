import { pickLocalImage } from '../../shared/media/pickLocalImage';
import { LocalImageError, type LocalImageLease, type LocalImagePicker } from '../../shared/media/localImage';
import {
  createMockEditorImageSource,
  type EditorImageSource,
  type ImageAsset,
  type ImageLease,
} from './imageSource';

type Entry = { asset: ImageAsset; lease: LocalImageLease; count: number };

// 화면의 선택 참조와 확정 문서 참조를 함께 소유하며 서버 업로드나 영구 저장을 만들지 않는다.
export function createDeviceEditorImageSource(pick: LocalImagePicker = pickLocalImage): EditorImageSource {
  const fixtures = createMockEditorImageSource();
  const entries = new Map<string, Entry>();
  let documents = new Set<string>();
  let mounts = 0;
  let disposed = false;
  let generation = 0;
  function sweep() {
    entries.forEach((entry, id) => {
      if (entry.count === 0 && !documents.has(id)) {
        entries.delete(id);
        entry.lease.release();
      }
    });
  }
  function retain(entry: Entry): ImageLease {
    entry.count += 1;
    let released = false;
    return {
      asset: entry.asset,
      release: () => {
        if (released) return;
        released = true;
        entry.count -= 1;
        sweep();
      },
    };
  }
  return {
    ...fixtures,
    activate() {
      disposed = false;
      mounts += 1;
      return () => {
        mounts -= 1;
        queueMicrotask(() => {
          if (mounts > 0) return;
          disposed = true;
          generation += 1;
          entries.forEach((entry) => entry.lease.release());
          entries.clear();
          documents.clear();
        });
      };
    },
    retainDocuments(assetIds) {
      documents = new Set(assetIds);
      sweep();
    },
    retainHistory(assetIds) {
      const leases = [...new Set(assetIds)].flatMap(id => { const entry = entries.get(id); return entry ? [retain(entry)] : []; });
      return () => leases.forEach(lease => lease.release());
    },
    async pick(origin, signal) {
      const current = generation;
      const lease = await pick(origin, signal, 1600);
      if (!lease) return null;
      if (signal.aborted || disposed || current !== generation) {
        lease.release();
        return null;
      }
      const image = lease.image;
      if (
        !image.id ||
        entries.has(image.id) ||
        !/^(file:|blob:|data:image\/)/u.test(image.uri) ||
        !Number.isFinite(image.width) ||
        !Number.isFinite(image.height) ||
        image.width <= 0 ||
        image.height <= 0
      ) {
        lease.release();
        throw new LocalImageError('invalid');
      }
      const entry: Entry = {
        lease,
        count: 0,
        asset: {
          assetId: image.id,
          width: image.width,
          height: image.height,
          description: origin === 'camera' ? '촬영한 사진' : '선택한 사진',
          credit: '',
        },
      };
      entries.set(image.id, entry);
      return retain(entry);
    },
    async prepare(assetId, signal) {
      if (signal.aborted) throw new Error('cancelled');
      const entry = entries.get(assetId);
      return entry ? retain(entry) : fixtures.prepare(assetId, signal);
    },
    resolve(assetId) {
      const entry = entries.get(assetId);
      return entry ? { uri: entry.lease.image.uri } : fixtures.resolve(assetId);
    },
  };
}
