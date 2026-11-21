import { ChevronDown, ChevronUp, Lightbulb, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import type { Question } from '../../mocks/types';
import { DifficultyBadge } from './Badges';

interface QuestionPanelProps {
  question: Question;
  index?: number;
  total?: number;
  followUpPrompt?: string;
}

export function QuestionPanel({
  question,
  index,
  total,
  followUpPrompt,
}: QuestionPanelProps) {
  const [showHints, setShowHints] = useState(false);

  return (
    <div
      className="rounded-xl border p-5 space-y-4"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {typeof index === 'number' && typeof total === 'number' && (
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: 'var(--text-muted)' }}
            >
              Question {index + 1} of {total}
            </span>
          )}
          <DifficultyBadge difficulty={question.difficulty} />
        </div>

        <span
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: 'var(--text-muted)' }}
        >
          {question.trackId}
        </span>
      </div>

      <div>
        <h2
          className="text-lg font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {question.title}
        </h2>
        <p
          className="text-sm leading-relaxed whitespace-pre-line"
          style={{ color: 'var(--text-secondary)' }}
        >
          {question.prompt}
        </p>
      </div>

      {question.hints.length > 0 && (
        <div
          className="rounded-lg border"
          style={{
            borderColor: 'var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-subtle)',
          }}
        >
          <button
            type="button"
            onClick={() => setShowHints((prev) => !prev)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" style={{ color: 'var(--status-warning)' }} />
              Hints ({question.hints.length})
            </span>
            {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showHints && (
            <ul
              className="px-4 pb-3 pt-1 space-y-1.5 text-xs list-disc list-inside"
              style={{ color: 'var(--text-secondary)' }}
            >
              {question.hints.map((hint, idx) => (
                <li key={idx}>{hint}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {followUpPrompt && (
        <div
          className="rounded-lg border p-3.5 flex items-start gap-2.5"
          style={{
            backgroundColor: 'var(--accent-primary-soft)',
            borderColor: 'var(--accent-primary-border)',
          }}
        >
          <MessageSquare
            className="w-4 h-4 shrink-0 mt-0.5"
            style={{ color: 'var(--accent-primary)' }}
          />
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-0.5"
              style={{ color: 'var(--accent-primary)' }}
            >
              Interviewer Follow-Up
            </p>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
              {followUpPrompt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

