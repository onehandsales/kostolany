import { act, render } from '@testing-library/react-native';
import { deferred } from '../feed/tests/helpers';
import { createDeviceEditorImageSource } from './createDeviceEditorImageSource';
import { WrittenStoriesProvider } from './WrittenStoriesProvider';
import { createMockDraftSource } from './draftSource';
import { changeBody, emptyEditor, insertImage } from './editorModel';
import { emptyPublishOptions } from './publishing';
import type { LocalImageLease } from '../../shared/media/localImage';

const lease = (): LocalImageLease => ({
  image: { id: 'selected', uri: 'file:///cache/editor.jpg', width: 1600, height: 900 },
  release: jest.fn(),
});
const signal = () => new AbortController().signal;

it('확정 초안과 발행 이미지의 수명은 편집 화면보다 길고 마지막 문서와 공급부 종료 때 해제된다', async () => {
  const picked = lease();
  const images = createDeviceEditorImageSource(async () => picked);
  const source = createMockDraftSource({ delayMs: 0 });
  const view = await render(
    <WrittenStoriesProvider value={{ source, images, sessionRevision: 1 }}>{null}</WrittenStoriesProvider>,
  );
  const selected = await images.pick!('library', signal());
  const prepared = await images.prepare(selected!.asset.assetId, signal());
  selected!.release();
  const document = {
    ...insertImage(changeBody(emptyEditor(), '사진 문서'), {
      ...prepared.asset,
      id: 'image-1',
      source: 'library',
    }).document,
    title: '사진 문서',
  };
  const draftId = source.newId('A');
  await act(async () => {
    await source.save({ userId: 'A', draftId, operationId: 'save-1', document }, signal());
  });
  prepared.release();
  expect(images.resolve('selected')).toEqual({ uri: picked.image.uri });
  expect(picked.release).not.toHaveBeenCalled();
  await act(async () => {
    await source.publish(
      {
        userId: 'A',
        draftId,
        operationId: 'publish-1',
        authorName: 'A',
        document,
        publishing: emptyPublishOptions(),
      },
      signal(),
    );
  });
  expect(images.resolve('selected')).toEqual({ uri: picked.image.uri });
  await view.unmount();
  await Promise.resolve();
  expect(picked.release).toHaveBeenCalledTimes(1);
  expect(images.resolve('selected')).toBeUndefined();
});

it('취소한 선택과 문서에서 제거한 사진은 참조를 해제하며 늦은 선택은 공급부를 부활시키지 않는다', async () => {
  const picked = lease();
  const images = createDeviceEditorImageSource(async () => picked);
  const stop = images.activate!();
  const selection = await images.pick!('camera', signal());
  images.retainDocuments!(['selected']);
  selection!.release();
  images.retainDocuments!([]);
  expect(picked.release).toHaveBeenCalledTimes(1);
  const pending = deferred<LocalImageLease | null>();
  const stale = lease();
  const other = createDeviceEditorImageSource(() => pending.promise);
  const dispose = other.activate!();
  const result = other.pick!('library', signal());
  dispose();
  await Promise.resolve();
  pending.resolve(stale);
  expect(await result).toBeNull();
  expect(stale.release).toHaveBeenCalledTimes(1);
  stop();
  await Promise.resolve();
  expect(picked.release).toHaveBeenCalledTimes(1);
});
