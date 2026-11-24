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

const BANNER_BG: Record<TrackId, string> = {
  dsa: 'var(--banner-dsa)',
  frontend: 'var(--banner-frontend)',
  behavioral: 'var(--banner-behavioral)',
  'system-design': 'var(--banner-system-design)',
};

function TrackGeometricBanner({
  trackId,
  isFree,
}: {
  trackId: TrackId;
  isFree: boolean;
}) {
  return (
    <div
      className="h-28 w-full overflow-hidden relative border-b"
      style={{
        backgroundColor: BANNER_BG[trackId],
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Full-bleed geometric motif */}
      {trackId === 'dsa' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 320 112"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="268" cy="24" r="46" fill="var(--accent-primary)" fillOpacity="0.08" />
          <line x1="92" y1="30" x2="54" y2="68" stroke="var(--accent-primary)" strokeOpacity="0.45" strokeWidth="2.5" />
          <line x1="92" y1="30" x2="134" y2="62" stroke="var(--accent-primary)" strokeOpacity="0.45" strokeWidth="2.5" />
          <line x1="134" y1="62" x2="188" y2="34" stroke="var(--accent-primary)" strokeOpacity="0.35" strokeWidth="2" />
          <line x1="188" y1="34" x2="236" y2="74" stroke="var(--emerald)" strokeOpacity="0.45" strokeWidth="2.5" />
          <circle cx="92" cy="30" r="10" fill="var(--accent-primary)" />
          <circle cx="54" cy="68" r="8" fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeWidth="2.5" />
          <circle cx="134" cy="62" r="9" fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeWidth="2.5" />
          <circle cx="188" cy="34" r="8" fill="var(--accent-primary)" fillOpacity="0.75" />
          <circle cx="236" cy="74" r="10" fill="var(--emerald)" />
        </svg>
      )}

      {trackId === 'frontend' && (
        <svg
          className="w-full h-full block"
          viewBox="0 0 320 112"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="44" cy="96" r="54" fill="var(--amber)" fillOpacity="0.14" />
          <circle cx="284" cy="18" r="42" fill="var(--accent-primary)" fillOpacity="0.09" />
          <rect x="64" y="22" width="56" height="68" rx="8" fill="var(--accent-primary-soft)" stroke="var(--accent-primary-border)" strokeWidth="1.5" />
          <rect x="130" y="22" width="126" height="28" rx="8" fill="var(--accent-primary)" />
          <rect x="130" y="58" width="76" height="32" rx="8" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.5" />
          <rect x="214" y="58" width="42" height="32" rx="8" fill="var(--emerald-soft)" stroke="var(--emerald)" strokeWidth="1.5" />
        </svg>
      )}

      {trackId === 'behavioral' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 320 112"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="272" cy="86" r="48" fill="var(--emerald)" fillOpacity="0.1" />
          <rect x="52" y="22" width="120" height="36" rx="18" fill="var(--bg-surface)" stroke="var(--emerald)" strokeWidth="2" />
          <circle cx="82" cy="40" r="4" fill="var(--emerald)" />
          <circle cx="102" cy="40" r="4" fill="var(--emerald)" />
          <circle cx="122" cy="40" r="4" fill="var(--emerald)" />
          <rect x="132" y="54" width="136" height="36" rx="18" fill="var(--accent-primary-soft)" stroke="var(--accent-primary)" strokeWidth="2" />
          <rect x="156" y="69" width="72" height="6" rx="3" fill="var(--accent-primary)" />
        </svg>
      )}

      {trackId === 'system-design' && (
        <svg
          className="w-full h-full"
          viewBox="0 0 320 112"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
        >
          <path d="M96 56 L146 30 M96 56 L146 82 M194 30 L242 56 M194 82 L242 56" stroke="var(--status-info)" strokeOpacity="0.55" strokeWidth="2" />
          <rect x="48" y="38" width="48" height="36" rx="8" fill="var(--bg-surface)" stroke="var(--accent-primary)" strokeWidth="2" />
          <rect x="146" y="14" width="48" height="32" rx="8" fill="var(--bg-surface)" stroke="var(--status-info)" strokeWidth="2" />
          <rect x="146" y="66" width="48" height="32" rx="8" fill="var(--bg-surface)" stroke="var(--status-info)" strokeWidth="2" />
          <rect x="242" y="38" width="46" height="36" rx="8" fill="var(--emerald-soft)" stroke="var(--emerald)" strokeWidth="2" />
        </svg>
      )}

      {isFree && (
        <div className="absolute top-3 right-3">
          <FreeBadge label="FREE" />
        </div>
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
        <TrackGeometricBanner trackId={track.id} isFree={track.isFree} />

        <div className="p-4 pb-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <DifficultyBadge difficulty={badgeDifficulty} />
            <div
              className="flex items-center gap-2.5 text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {track.estimatedMinutes}m
              </span>
              <span className="inline-flex items-center gap-1">
                <Layers className="w-3 h-3" />
                {track.totalQuestions} Qs
              </span>
            </div>
          </div>

          <h3
            className="text-base font-semibold leading-snug"
            style={{ color: 'var(--text-primary)' }}
          >
            {track.name}
          </h3>

          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {track.description}
          </p>
        </div>
      </div>

      <div
        className="px-4 pb-4 pt-3 space-y-3 border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        {track.isEnrolled && (
          <ProgressBar
            value={progressPct}
            label={`${track.completedQuestions}/${track.totalQuestions} completed`}
            tone={progressPct >= 75 ? 'emerald' : 'accent'}
            height="sm"
          />
        )}

        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(track)}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
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
  );
}
