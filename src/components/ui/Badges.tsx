import type { Difficulty, WeeklyPlanTag } from '../../mocks/types';

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const styles: Record<Difficulty, { bg: string; color: string; label: string }> = {
    easy: {
      bg: 'var(--badge-easy-bg)',
      color: 'var(--badge-easy-text)',
      label: 'Easy',
    },
    medium: {
      bg: 'var(--badge-medium-bg)',
      color: 'var(--badge-medium-text)',
      label: 'Medium',
    },
    hard: {
      bg: 'var(--badge-hard-bg)',
      color: 'var(--badge-hard-text)',
      label: 'Hard',
    },
  };

  const current = styles[difficulty];

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize"
      style={{
        backgroundColor: current.bg,
        color: current.color,
      }}
    >
      {current.label}
    </span>
  );
}

export function FreeBadge({ label = 'Free' }: { label?: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border"
      style={{
        backgroundColor: 'var(--emerald-soft)',
        color: 'var(--emerald)',
        borderColor: 'var(--emerald-border)',
      }}
    >
      {label}
    </span>
  );
}

export function PlanTagBadge({ tag }: { tag: WeeklyPlanTag }) {
  const map: Record<WeeklyPlanTag, { bg: string; color: string; label: string }> = {
    learn: {
      bg: 'var(--status-info-soft)',
      color: 'var(--status-info)',
      label: 'Learn',
    },
    practise: {
      bg: 'var(--emerald-soft)',
      color: 'var(--emerald)',
      label: 'Practise',
    },
    interview: {
      bg: 'var(--accent-primary-soft)',
      color: 'var(--accent-primary)',
      label: 'Interview',
    },
  };

  const current = map[tag];

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-md"
      style={{
        backgroundColor: current.bg,
        color: current.color,
      }}
    >
      {current.label}
    </span>
  );
}

