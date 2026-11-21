import { Quote, Sparkles } from 'lucide-react';
import type { DebriefQuote } from '../../mocks/types';

export function DebriefCard({ debrief }: { debrief: DebriefQuote }) {
  return (
    <div
      className="rounded-xl border p-5 flex flex-col justify-between gap-4"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'var(--accent-primary-soft)',
                color: 'var(--accent-primary)',
              }}
            >
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {debrief.mentorName}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {debrief.mentorTitle} · {debrief.sessionDate}
              </p>
            </div>
          </div>

          <span
            className="px-2.5 py-0.5 text-xs font-semibold rounded-full tabular-nums"
            style={{
              backgroundColor: 'var(--emerald-soft)',
              color: 'var(--emerald)',
            }}
          >
            {debrief.score}/100
          </span>
        </div>

        <blockquote
          className="text-sm leading-relaxed italic"
          style={{ color: 'var(--text-primary)' }}
        >
          “{debrief.quote}”
        </blockquote>
      </div>

      <div
        className="flex items-start gap-2 rounded-lg px-3 py-2 text-xs"
        style={{
          backgroundColor: 'var(--bg-surface-subtle)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <Sparkles
          className="w-3.5 h-3.5 shrink-0 mt-0.5"
          style={{ color: 'var(--accent-primary)' }}
        />
        <span>
          <strong style={{ color: 'var(--text-primary)' }}>Next focus: </strong>
          {debrief.takeaway}
        </span>
      </div>
    </div>
  );
}

