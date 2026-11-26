import type { ImageSourcePropType } from 'react-native';
import type { EditorImage } from './editorModel';

export type ImageOrigin = EditorImage['source'];
export type ImageAsset = Omit<EditorImage, 'id' | 'offset' | 'source'>;
export type ImageLease = { asset: ImageAsset; release: () => void };
export type ImagePermission = 'granted' | 'limited' | 'denied' | 'cancelled';
export type EditorImageSource = {
  pick?: (origin: 'camera' | 'library', signal: AbortSignal) => Promise<ImageLease | null>;
  activate?: () => () => void;
  retainDocuments?: (assetIds: readonly string[]) => void;
  retainHistory?: (assetIds: readonly string[]) => () => void;
  search: (query: string, signal: AbortSignal) => Promise<ImageAsset[]>;
  requestAccess: (origin: 'camera' | 'library', signal: AbortSignal) => Promise<ImagePermission>;
  prepare: (assetId: string, signal: AbortSignal) => Promise<ImageLease>;
  resolve: (assetId: string) => ImageSourcePropType | undefined;
};

const fixtures: { asset: ImageAsset; image: ImageSourcePropType; keywords: string }[] = [
  { asset: { assetId: 'local-sunset', description: '해질녘 풍경', credit: 'Local fixture', width: 240, height: 168 }, image: require('../../../assets/medium/sunset.png'), keywords: 'sunset nature 노을 자연' },
  { asset: { assetId: 'local-vinyl', description: '음악과 레코드', credit: 'Local fixture', width: 240, height: 160 }, image: require('../../../assets/medium/vinyl.png'), keywords: 'music record 음악 레코드' },
  { asset: { assetId: 'local-life', description: '지구 모양의 아이스크림 그림', credit: 'Local fixture', width: 1035, height: 486 }, image: require('../../../assets/medium/topic-life.png'), keywords: 'life nature 일상 자연' },
  { asset: { assetId: 'local-morning', description: '해와 물결을 그린 삽화', credit: 'Local fixture', width: 720, height: 360 }, image: require('../../../assets/medium/morning-routine.png'), keywords: 'morning 아침' },
];

function wait(delayMs: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(new Error('cancelled')); return; }
    const cancel = () => { clearTimeout(timer); reject(new Error('cancelled')); };
    const timer = setTimeout(() => { signal.removeEventListener('abort', cancel); resolve(); }, delayMs);
    signal.addEventListener('abort', cancel, { once: true });
  });
}

export function createMockEditorImageSource(options: { delayMs?: number; permission?: ImagePermission; searchFailures?: number; prepareFailures?: number } = {}): EditorImageSource {
  let searchFailures = options.searchFailures ?? 0;
  let prepareFailures = options.prepareFailures ?? 0;
  const delayMs = options.delayMs ?? 180;
  return {
    async search(query, signal) {
      await wait(delayMs, signal);
      if (searchFailures-- > 0) throw new Error('image-search-failed');
      const normalized = query.normalize('NFC').trim().toLowerCase();
      return fixtures.filter(item => !normalized || `${item.asset.description} ${item.keywords}`.includes(normalized)).map(item => ({ ...item.asset }));
    },
    async requestAccess(_origin, signal) { await wait(delayMs, signal); return options.permission ?? 'granted'; },
    async prepare(assetId, signal) {
      await wait(delayMs * 2, signal);
      if (prepareFailures-- > 0) throw new Error('image-prepare-failed');
      const fixture = fixtures.find(item => item.asset.assetId === assetId);
      if (!fixture) throw new Error('image-not-found');
      // 번들 자산은 파일이나 임시 URL을 소유하지 않아 선택 수명 종료가 원본 자산을 지우지 않는다.
      return { asset: { ...fixture.asset }, release: () => undefined };
    },
    resolve: assetId => fixtures.find(item => item.asset.assetId === assetId)?.image,
  };
}
