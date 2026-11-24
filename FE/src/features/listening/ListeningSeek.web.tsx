import type { ListeningSeekProps } from './ListeningSeek';
import { formatListeningTime } from './types';

export function ListeningSeek({ positionSeconds, durationSeconds, onSeek, onSkip, children }: ListeningSeekProps) {
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
        const offsetSeconds =
          event.key === 'ArrowRight' || event.key === 'ArrowUp'
            ? 30
            : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
              ? -10
              : null;
        if (offsetSeconds !== null) {
          event.preventDefault();
          onSkip(offsetSeconds);
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          onSeek(event.key === 'Home' ? 0 : durationSeconds);
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
