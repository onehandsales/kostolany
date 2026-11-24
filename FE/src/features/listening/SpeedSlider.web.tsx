import type { SpeedSliderProps } from './SpeedSlider';
import { speedAtFraction } from './listeningOptions';

export function SpeedSlider({ value, onChange, onAdjust, children, disabled }: SpeedSliderProps) {
  return (
    <div
      role="slider"
      aria-label="재생 속도"
      aria-orientation="vertical"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-valuemin={0.5}
      aria-valuemax={4}
      aria-valuenow={value}
      aria-valuetext={`${value}배`}
      onPointerDown={(event) => {
        if (disabled) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        const bounds = event.currentTarget.getBoundingClientRect();
        onChange(speedAtFraction(1 - (event.clientY - bounds.top) / Math.max(1, bounds.height)));
      }}
      onPointerMove={(event) => {
        if (disabled) return;
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        onChange(speedAtFraction(1 - (event.clientY - bounds.top) / Math.max(1, bounds.height)));
      }}
      onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
      onKeyDown={(event) => {
        if (disabled) return;
        const offset =
          event.key === 'ArrowUp' || event.key === 'ArrowRight'
            ? 0.5
            : event.key === 'ArrowDown' || event.key === 'ArrowLeft'
              ? -0.5
              : null;
        if (offset !== null) {
          event.preventDefault();
          onAdjust(offset);
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          onChange(event.key === 'Home' ? 0.5 : 4);
        }
      }}
      style={{ flex: 1, width: 96, position: 'relative', touchAction: 'none', cursor: 'pointer' }}
    >
      <div style={{ height: '100%', pointerEvents: 'none' }}>{children}</div>
    </div>
  );
}
