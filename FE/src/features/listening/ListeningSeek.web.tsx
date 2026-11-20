import type { ListeningSeekProps } from './ListeningSeek';
import { formatListeningTime } from './types';

export function ListeningSeek({ positionSeconds, durationSeconds, onSeek, children }: ListeningSeekProps) {
  const disabled = durationSeconds <= 0;
  return (
    <div
      role="slider"
      aria-label="재생 위치"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-valuemin={0}
      aria-valuemax={durationSeconds}
      aria-valuenow={Math.floor(positionSeconds)}
      aria-valuetext={`${formatListeningTime(positionSeconds)} / ${formatListeningTime(durationSeconds)}`}
      onClick={(event) => {
        // 웹 click은 native locationX 대신 현재 슬라이더의 화면 좌표를 사용한다.
        if (disabled || event.detail === 0) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        onSeek(((event.clientX - bounds.left) / Math.max(1, bounds.width)) * durationSeconds);
      }}
      onKeyDown={(event) => {
        if (disabled) return;
        const next =
          event.key === 'ArrowRight' || event.key === 'ArrowUp'
            ? positionSeconds + 30
            : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
              ? positionSeconds - 10
              : event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? durationSeconds
                  : null;
        if (next !== null) {
          event.preventDefault();
          onSeek(next);
        }
      }}
      style={{
        height: 48,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {children}
    </div>
  );
}
