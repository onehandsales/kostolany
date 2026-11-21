export type LocalImage = Readonly<{ id: string; uri: string; width: number; height: number }>;
export type LocalImageLease = { image: LocalImage; release: () => void };
export type LocalImageOrigin = 'camera' | 'library';
export type LocalImagePicker = (
  origin: LocalImageOrigin,
  signal: AbortSignal,
  maxDimension?: number,
) => Promise<LocalImageLease | null>;
export class LocalImageError extends Error {
  constructor(public readonly reason: 'permission' | 'unsupported' | 'invalid' | 'processing') {
    super(reason);
  }
}
