import { ProfilePhotoError, type ProfilePhotoPicker } from './profilePhoto';

let photoSequence = 0;

// 웹 선택기는 사용자 클릭 안에서 열고 닫기·취소·이탈 시 DOM과 임시 URL을 정리한다.
export const pickProfilePhoto: ProfilePhotoPicker = (origin, signal) => new Promise((resolve, reject) => {
  if (signal.aborted) { resolve(null); return; }
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  if (origin === 'camera') input.capture = 'environment';
  input.style.display = 'none';
  document.body.appendChild(input);
  let settled = false;
  const cleanup = () => { input.remove(); signal.removeEventListener('abort', cancel); };
  const cancel = () => { if (!settled) { settled = true; cleanup(); resolve(null); } };
  input.addEventListener('cancel', cancel, { once: true });
  signal.addEventListener('abort', cancel, { once: true });
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (!file) { cancel(); return; }
    void preparePhoto(file).then(lease => {
      if (settled || signal.aborted) { lease.release(); return; }
      settled = true;
      cleanup();
      resolve(lease);
    }).catch(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new ProfilePhotoError('processing'));
    });
  }, { once: true });
  try { input.click(); } catch {
    settled = true;
    cleanup();
    reject(new ProfilePhotoError('unsupported'));
  }
});

async function preparePhoto(file: File) {
  if (!file.type.startsWith('image/') || file.size > 20_000_000) throw new ProfilePhotoError('invalid');
  const original = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = original;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 40_000_000) throw new ProfilePhotoError('invalid');
    const scale = Math.min(1, 768 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new ProfilePhotoError('unsupported');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(result => result ? resolve(result) : reject(new ProfilePhotoError('processing')), 'image/jpeg', 0.85);
    });
    const uri = URL.createObjectURL(blob);
    return {
      photo: { id: `profile-photo-${Date.now()}-${++photoSequence}`, uri, width: canvas.width, height: canvas.height },
      release: () => URL.revokeObjectURL(uri),
    };
  } finally { URL.revokeObjectURL(original); }
}
