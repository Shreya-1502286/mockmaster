import { ArrowRight, Clock, Layers } from 'lucide-react';
import type { Difficulty, Track, TrackId } from '../../mocks/types';
import { DifficultyBadge, FreeBadge } from './Badges';
import { ProgressBar } from './ProgressBar';

interface CourseCardProps {
  track: Track;
  onSelect?: (track: Track) => void;
  actionLabel?: string;
  difficulty?: Difficulty;
}

const DEFAULT_TRACK_DIFFICULTY: Record<TrackId, Difficulty> = {
  dsa: 'medium',
  frontend: 'medium',
  behavioral: 'easy',
  'system-design': 'hard',
};

function TrackGeometricBanner({ trackId }: { trackId: TrackId }) {
  return (
    <div
      className="h-24 w-full overflow-hidden border-b relative flex items-center justify-between px-5"
      style={{
        backgroundColor: 'var(--bg-surface-subtle)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <span
        className="text-xs font-bold uppercase tracking-widest z-10"
        style={{ color: 'var(--text-muted)' }}
      >
        {trackId === 'system-design' ? 'SYS DESIGN' : trackId.toUpperCase()}
      </span>

      {/* Distinct subtle flat geometric motif per track */}
      {trackId === 'dsa' && (
        <svg className="w-28 h-20 opacity-80" viewBox="0 0 120 80" fill="none" aria-hidden="true">
          <line x1="60" y1="16" x2="32" y2="44" stroke="var(--accent-primary-border)" strokeWidth="2" />
          <line x1="60" y1="16" x2="88" y2="44" stroke="var(--accent-primary-border)" strokeWidth="2" />
          <line x1="32" y1="44" x2="18" y2="66" stroke="var(--border-default)" strokeWidth="2" />
          <line x1="32" y1="44" x2="46" y2="66" stroke="var(--border-default)" strokeWidth="2" />
          <circle cx="60" cy="16" r="8" fill="var(--accent-primary)" />
          <circle cx="32" cy="44" r="7" fill="var(--accent-primary-soft)" stroke="var(--accent-primary)" strokeWidth="2" />
          <circle cx="88" cy="44" r="7" fill="var(--emerald-soft)" stroke="var(--emerald)" strokeWidth="2" />
          <circle cx="18" cy="66" r="5" fill="var(--border-default)" />
          <circle cx="46" cy="66" r="5" fill="var(--border-default)" />
        </svg>
      )}

      {trackId === 'frontend' && (
        <svg className="w-28 h-20 opacity-85" viewBox="0 0 120 80" fill="none" aria-hidden="true">
          <rect x="16" y="14" width="88" height="52" rx="8" fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth="2" />
          <rect x="24" y="22" width="28" height="36" rx="4" fill="var(--accent-primary-soft)" stroke="var(--accent-primary-border)" strokeWidth="1.5" />
          <rect x="58" y="22" width="38" height="14" rx="4" fill="var(--accent-primary)" />
          <rect x="58" y="42" width="38" height="16" rx="4" fill="var(--emerald-soft)" stroke="var(--emerald-border)" strokeWidth="1.5" />
        </svg>
      )}

      {trackId === 'behavioral' && (
        <svg className="w-28 h-20 opacity-85" viewBox="0 0 120 80" fill="none" aria-hidden="true">
          <rect x="16" y="16" width="52" height="26" rx="13" fill="var(--emerald-soft)" stroke="var(--emerald)" strokeWidth="2" />
          <rect x="48" y="38" width="56" height="26" rx="13" fill="var(--accent-primary-soft)" stroke="var(--accent-primary)" strokeWidth="2" />
          <circle cx="34" cy="29" r="3" fill="var(--emerald)" />
          <circle cx="44" cy="29" r="3" fill="var(--emerald)" />
          <circle cx="68" cy="51" r="3" fill="var(--accent-primary)" />
          <circle cx="78" cy="51" r="3" fill="var(--accent-primary)" />
        </svg>
      )}

      {trackId === 'system-design' && (
        <svg className="w-28 h-20 opacity-85" viewBox="0 0 120 80" fill="none" aria-hidden="true">
          <rect x="14" y="28" width="24" height="24" rx="5" fill="var(--accent-primary-soft)" stroke="var(--accent-primary)" strokeWidth="2" />
          <rect x="50" y="12" width="24" height="22" rx="5" fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth="2" />
          <rect x="50" y="46" width="24" height="22" rx="5" fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth="2" />
          <rect x="86" y="28" width="22" height="24" rx="5" fill="var(--emerald-soft)" stroke="var(--emerald)" strokeWidth="2" />
          <path d="M38 40 L50 23 M38 40 L50 57 M74 23 L86 40 M74 57 L86 40" stroke="var(--border-strong)" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

export function CourseCard({
  track,
  onSelect,
  actionLabel,
  difficulty,
}: CourseCardProps) {
  const progressPct =
    track.totalQuestions > 0
      ? Math.round((track.completedQuestions / track.totalQuestions) * 100)
      : 0;

  const badgeDifficulty = difficulty ?? DEFAULT_TRACK_DIFFICULTY[track.id];
  const isResume = track.isEnrolled;
  const cta = actionLabel ?? (isResume ? 'Resume' : 'Start');

  return (
    <div
      className="flex flex-col justify-between rounded-xl border overflow-hidden transition-all"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div>
        <TrackGeometricBanner trackId={track.id} />

        <div className="p-5 pb-3">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={badgeDifficulty} />
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {track.category}
              </span>
            </div>
            {track.isFree && <FreeBadge label="FREE" />}
          </div>

          <h3
            className="text-base font-semibold mb-1.5"
            style={{ color: 'var(--text-primary)' }}
          >
            {track.name}
          </h3>

          <p
            className="text-sm leading-relaxed mb-3.5 line-clamp-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {track.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
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
      </div>

      <div className="px-5 pb-5 pt-3 space-y-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        {track.isEnrolled && (
          <ProgressBar
            value={progressPct}
            label={`${track.completedQuestions}/${track.totalQuestions} prompts`}
            tone={progressPct >= 75 ? 'emerald' : 'accent'}
            height="sm"
          />
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
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
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              style={
                isResume
                  ? {
                      backgroundColor: 'var(--accent-primary)',
                      color: '#ffffff',
                    }
                  : {
                      backgroundColor: 'transparent',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-primary)',
                    }
              }
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
