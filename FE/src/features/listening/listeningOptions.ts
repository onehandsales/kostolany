export type ListeningOptions = { speed: number; voiceId: string };
export type ListeningVoice = {
  id: string;
  name: string;
  section: string;
  gender: 'Female' | 'Male';
  country: string;
  countryCode: 'US' | 'GB' | 'DE' | 'IT' | 'KR' | 'BR';
};
export type ListeningOptionsSource = {
  searchVoices: (query: string, signal: AbortSignal) => Promise<ListeningVoice[]>;
  apply: (articleId: string, options: ListeningOptions, signal: AbortSignal) => Promise<ListeningOptions>;
};
export const defaultListeningOptions: ListeningOptions = { speed: 1, voiceId: 'emma' };
// 두 관찰값 외의 속도 범위와 간격은 이 mock의 보완 정책이며 WPM을 추정하지 않는다.
export const listeningSpeeds = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4] as const;
export const speedPositions = [0.05, 0.21, 0.32, 0.43, 0.54, 0.68, 0.84, 1] as const;
export const listeningVoices: ListeningVoice[] = [
  {
    id: 'emma',
    name: 'Emma',
    section: 'FEATURED',
    gender: 'Female',
    country: 'United States',
    countryCode: 'US',
  },
  {
    id: 'matthew',
    name: 'Matthew',
    section: 'FEATURED',
    gender: 'Male',
    country: 'United States',
    countryCode: 'US',
  },
  {
    id: 'salli',
    name: 'Salli',
    section: 'ENGLISH',
    gender: 'Female',
    country: 'United States',
    countryCode: 'US',
  },
  {
    id: 'simon',
    name: 'Simon',
    section: 'ENGLISH',
    gender: 'Male',
    country: 'United States',
    countryCode: 'US',
  },
  {
    id: 'lupe',
    name: 'Lupe',
    section: 'ENGLISH',
    gender: 'Female',
    country: 'United States',
    countryCode: 'US',
  },
  {
    id: 'miguel',
    name: 'Miguel',
    section: 'ENGLISH',
    gender: 'Male',
    country: 'United States',
    countryCode: 'US',
  },
  {
    id: 'diego',
    name: 'Diego',
    section: 'ENGLISH',
    gender: 'Male',
    country: 'United States',
    countryCode: 'US',
  },
  {
    id: 'stephanie',
    name: 'Stephanie',
    section: 'ENGLISH',
    gender: 'Female',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
  { id: 'vicki', name: 'Vicki', section: 'GERMAN', gender: 'Female', country: 'Germany', countryCode: 'DE' },
  { id: 'hans', name: 'Hans', section: 'GERMAN', gender: 'Male', country: 'Germany', countryCode: 'DE' },
  { id: 'carla', name: 'Carla', section: 'ITALIAN', gender: 'Female', country: 'Italy', countryCode: 'IT' },
  { id: 'giorgio', name: 'Giorgio', section: 'ITALIAN', gender: 'Male', country: 'Italy', countryCode: 'IT' },
  {
    id: 'seoyeon',
    name: 'Seoyeon',
    section: 'KOREAN',
    gender: 'Female',
    country: 'South Korea',
    countryCode: 'KR',
  },
  {
    id: 'camila',
    name: 'Camila',
    section: 'PORTUGUESE',
    gender: 'Female',
    country: 'Brazil',
    countryCode: 'BR',
  },
  {
    id: 'ricardo',
    name: 'Ricardo',
    section: 'PORTUGUESE',
    gender: 'Male',
    country: 'Brazil',
    countryCode: 'BR',
  },
];
export function speedAtFraction(fraction: number): number {
  let index = 0;
  for (let candidate = 1; candidate < speedPositions.length; candidate++) {
    if (
      Math.abs((speedPositions[candidate] ?? 0) - fraction) <
      Math.abs((speedPositions[index] ?? 0) - fraction)
    )
      index = candidate;
  }
  return listeningSpeeds[index] ?? 1;
}
export function isListeningOptions(options: ListeningOptions): boolean {
  return (
    listeningSpeeds.some((speed) => speed === options.speed) &&
    listeningVoices.some((voice) => voice.id === options.voiceId)
  );
}
export function createMockListeningOptionsSource({
  delayMs = 150,
  searchFailures = 0,
  applyFailures = 0,
} = {}): ListeningOptionsSource {
  const wait = (signal: AbortSignal) =>
    new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(new Error('Cancelled'));
        return;
      }
      const abort = () => {
        clearTimeout(timer);
        reject(new Error('Cancelled'));
      };
      const timer = setTimeout(() => {
        signal.removeEventListener('abort', abort);
        resolve();
      }, delayMs);
      signal.addEventListener('abort', abort, { once: true });
    });
  return {
    async searchVoices(query, signal) {
      await wait(signal);
      if (signal.aborted) throw new Error('Cancelled');
      if (searchFailures > 0) {
        searchFailures--;
        throw new Error('Voice search failed');
      }
      const key = query.normalize('NFC').trim().toLowerCase();
      return listeningVoices
        .filter((voice) => `${voice.name} ${voice.section} ${voice.country}`.toLowerCase().includes(key))
        .map((voice) => ({ ...voice }));
    },
    async apply(_articleId, options, signal) {
      await wait(signal);
      if (signal.aborted) throw new Error('Cancelled');
      if (applyFailures > 0) {
        applyFailures--;
        throw new Error('Options failed');
      }
      if (!isListeningOptions(options)) throw new Error('Unknown listening options');
      return { ...options };
    },
  };
}
