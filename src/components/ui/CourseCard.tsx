import { ArrowRight, Clock, Layers } from 'lucide-react';
import type { Track } from '../../mocks/types';
import { FreeBadge } from './Badges';
import { ProgressBar } from './ProgressBar';

interface CourseCardProps {
  track: Track;
  onSelect?: (track: Track) => void;
  actionLabel?: string;
}

export function CourseCard({ track, onSelect, actionLabel }: CourseCardProps) {
  const progressPct =
    track.totalQuestions > 0
      ? Math.round((track.completedQuestions / track.totalQuestions) * 100)
      : 0;

  const cta = actionLabel ?? (track.isEnrolled ? 'Continue' : 'Start Practice');

  return (
    <div
      className="flex flex-col justify-between rounded-xl border p-5 transition-all"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: 'var(--text-muted)' }}
          >
            {track.category}
          </span>
          {track.isFree && <FreeBadge />}
        </div>

        <h3
          className="text-base font-semibold mb-1.5"
          style={{ color: 'var(--text-primary)' }}
        >
          {track.name}
        </h3>

        <p
          className="text-sm leading-relaxed mb-4 line-clamp-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {track.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {track.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded-md"
              style={{
                backgroundColor: 'var(--bg-surface-subtle)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        {track.isEnrolled && (
          <ProgressBar
            value={progressPct}
            label={`${track.completedQuestions}/${track.totalQuestions} prompts`}
            tone={progressPct >= 75 ? 'emerald' : 'accent'}
            height="sm"
          />
        )}

        <div className="flex items-center justify-between pt-1">
          <div
            className="flex items-center gap-3 text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {track.estimatedMinutes}m
            </span>
            <span className="inline-flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {track.totalQuestions} Qs
            </span>
          </div>

          {onSelect && (
            <button
              type="button"
              onClick={() => onSelect(track)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              style={{
                backgroundColor: track.isEnrolled
                  ? 'var(--accent-primary)'
                  : 'var(--accent-primary-soft)',
                color: track.isEnrolled
                  ? 'var(--text-inverse)'
                  : 'var(--accent-primary)',
              }}
            >
              {cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

