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
    <div className="relative flex-1 min-w-[115px] flex flex-col">
      {/* Node + Horizontal Connector */}
      <div className="flex items-center mb-2.5">
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
                    boxShadow: '0 0 0 3px var(--accent-primary-soft)',
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
            className="h-0.5 flex-1 mx-1.5 rounded-full"
            style={{
              backgroundColor: isDone ? 'var(--emerald-border)' : 'var(--border-subtle)',
            }}
          />
        )}
      </div>

      {/* Compact Card */}
      <button
        type="button"
        onClick={() => onSelect?.(item)}
        className={`flex-1 flex flex-col justify-between text-left rounded-xl border p-3 transition-colors ${
          onSelect ? 'cursor-pointer' : 'cursor-default'
        }`}
        style={{
          backgroundColor: isToday ? 'var(--accent-primary-soft)' : 'var(--bg-surface-subtle)',
          borderColor: isToday ? 'var(--accent-primary-border)' : 'var(--border-subtle)',
        }}
      >
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-1">
            <span
              className="text-[11px] font-bold uppercase tracking-wider"
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
            <span
              className="inline-flex items-center gap-0.5 text-[11px]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Clock className="w-2.5 h-2.5" />
              {item.durationMinutes}m
            </span>
          </div>

          <p
            className={`text-xs font-semibold leading-snug line-clamp-2 ${
              isDone ? 'opacity-75' : ''
            }`}
            style={{ color: 'var(--text-primary)' }}
          >
            {item.title}
          </p>
        </div>

        <div className="pt-2">
          <PlanTagBadge tag={item.tag} />
        </div>
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
    <div className="flex items-stretch gap-2 overflow-x-auto pb-1">
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
