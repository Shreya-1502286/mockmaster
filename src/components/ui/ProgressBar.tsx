interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  tone?: 'accent' | 'emerald';
  height?: 'sm' | 'md';
}

export function ProgressBar({
  value,
  label,
  showPercentage = true,
  tone = 'accent',
  height = 'md',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const fillColor = tone === 'emerald' ? 'var(--emerald)' : 'var(--accent-primary)';

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs mb-1.5">
          {label && (
            <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full ${height === 'sm' ? 'h-1.5' : 'h-2.5'}`}
        style={{ backgroundColor: 'var(--border-subtle)' }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${clamped}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  );
}

