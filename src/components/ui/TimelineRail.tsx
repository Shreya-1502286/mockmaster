import { Check, Circle, Clock, Play } from 'lucide-react';
import type { WeeklyPlanItem } from '../../mocks/types';
import { PlanTagBadge } from './Badges';

interface TimelineNodeProps {
  item: WeeklyPlanItem;
  isLast?: boolean;
  onSelect?: (item: WeeklyPlanItem) => void;
}

export function TimelineNode({ item, isLast = false, onSelect }: TimelineNodeProps) {
  const isDone = item.status === 'done';
  const isToday = item.status === 'today';

  return (
    <div className="relative flex gap-3.5">
      {/* Vertical connector rail */}
      <div className="flex flex-col items-center">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors"
          style={
            isDone
              ? {
                  backgroundColor: 'var(--emerald)',
                  borderColor: 'var(--emerald)',
                  color: '#ffffff',
                }
              : isToday
                ? {
                    backgroundColor: 'var(--accent-primary-soft)',
                    borderColor: 'var(--accent-primary)',
                    color: 'var(--accent-primary)',
                  }
                : {
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-muted)',
                  }
          }
        >
          {isDone ? (
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : isToday ? (
            <Play className="w-3 h-3 fill-current" />
          ) : (
            <Circle className="w-2.5 h-2.5" />
          )}
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 my-1 min-h-[20px]"
            style={{
              backgroundColor: isDone ? 'var(--emerald-border)' : 'var(--border-subtle)',
            }}
          />
        )}
      </div>

      {/* Content */}
      <button
        type="button"
        onClick={() => onSelect?.(item)}
        className={`flex-1 text-left rounded-lg border px-3.5 py-2.5 mb-2.5 transition-colors ${
          onSelect ? 'cursor-pointer' : 'cursor-default'
        }`}
        style={{
          backgroundColor: isToday ? 'var(--accent-primary-soft)' : 'var(--bg-surface)',
          borderColor: isToday ? 'var(--accent-primary-border)' : 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{
                color: isToday
                  ? 'var(--accent-primary)'
                  : isDone
                    ? 'var(--emerald)'
                    : 'var(--text-muted)',
              }}
            >
              {item.dayLabel}
              {isToday ? ' · Today' : ''}
            </span>
            <PlanTagBadge tag={item.tag} />
          </div>
          <span
            className="inline-flex items-center gap-1 text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            <Clock className="w-3 h-3" />
            {item.durationMinutes}m
          </span>
        </div>

        <p
          className={`text-sm font-medium ${isDone ? 'line-through opacity-75' : ''}`}
          style={{ color: 'var(--text-primary)' }}
        >
          {item.title}
        </p>
      </button>
    </div>
  );
}

export function TimelineRail({
  items,
  onSelectItem,
}: {
  items: WeeklyPlanItem[];
  onSelectItem?: (item: WeeklyPlanItem) => void;
}) {
  return (
    <div className="flex flex-col">
      {items.map((item, idx) => (
        <TimelineNode
          key={item.id}
          item={item}
          isLast={idx === items.length - 1}
          onSelect={onSelectItem}
        />
      ))}
    </div>
  );
}

