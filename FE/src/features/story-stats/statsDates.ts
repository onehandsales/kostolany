export const DAY_MS = 86_400_000;

export function parseStatsDate(date: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('invalid-stats-date');
  const time = Date.parse(`${date}T00:00:00.000Z`);
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== date) {
    throw new Error('invalid-stats-date');
  }
  return time;
}

export function monthBounds(month: string): { start: number; end: number } {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new Error('invalid-stats-month');
  const start = parseStatsDate(`${month}-01`);
  const next = new Date(start);
  next.setUTCMonth(next.getUTCMonth() + 1);
  return { start, end: next.getTime() };
}

// 표시 언어와 기기 시간대가 달라도 집계 날짜는 UTC 자정 경계를 유지한다.
export function formatStatsDate(date: string, monthOnly = false): string {
  const utcDate = date.length > 10 ? new Date(date).toISOString().slice(0, 10) : date;
  const time = date.length === 7 ? monthBounds(date).start : parseStatsDate(utcDate);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', month: 'short', year: 'numeric', ...(monthOnly ? {} : { day: 'numeric' }),
  }).format(time);
}

export function statsDateRange(start: string, endExclusive: string): string {
  const last = new Date(Date.parse(endExclusive) - DAY_MS).toISOString().slice(0, 10);
  return `${formatStatsDate(start)} – ${formatStatsDate(last)} (UTC)`;
}
