import { useEffect, useState } from 'react';
import { useListening } from './ListeningProvider';
import type { ListeningVoice } from './listeningOptions';

type VoiceQueryState = { key: string; status: 'loading' | 'ready' | 'error'; voices: ListeningVoice[] };
export function useListeningVoices(input: string) {
  const { store, scope } = useListening();
  const query = input.normalize('NFC').trim().toLowerCase();
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify([scope, query, attempt]);
  const [state, setState] = useState<VoiceQueryState>({ key, status: 'loading', voices: [] });
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(
      () => {
        void Promise.resolve()
          .then(() => {
            if (!store) throw new Error('Missing player');
            return store.searchVoices(query, controller.signal);
          })
          .then((voices) => {
            if (controller.signal.aborted) return;
            if (
              !Array.isArray(voices) ||
              new Set(voices.map((voice) => voice.id)).size !== voices.length ||
              voices.some(
                (voice) =>
                  !voice.id?.trim() ||
                  !voice.name?.trim() ||
                  !voice.section?.trim() ||
                  !voice.country?.trim() ||
                  !['Female', 'Male'].includes(voice.gender) ||
                  !['US', 'GB', 'DE', 'IT', 'KR', 'BR'].includes(voice.countryCode),
              )
            )
              throw new Error('Invalid voices');
            setState({ key, status: 'ready', voices });
          })
          .catch(() => {
            if (!controller.signal.aborted) setState({ key, status: 'error', voices: [] });
          });
      },
      query ? 200 : 0,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [key, query, store]);
  if (state.key !== key) setState({ key, status: 'loading', voices: [] });
  const current: VoiceQueryState = state.key === key ? state : { key, status: 'loading', voices: [] };
  return { ...current, retry: () => setAttempt((value) => value + 1) };
}
