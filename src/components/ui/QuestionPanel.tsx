import { Lightbulb, MessageSquare, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Question, QuestionEvaluation } from '../../mocks/types';
import { DifficultyBadge } from './Badges';

type QuestionTab = 'prompt' | 'followup' | 'hints';

interface QuestionPanelProps {
  question: Question;
  index?: number;
  total?: number;
  evaluation?: QuestionEvaluation;
}

export function QuestionPanel({
  question,
  index,
  total,
  evaluation,
}: QuestionPanelProps) {
  const [activeTab, setActiveTab] = useState<QuestionTab>('prompt');
  const examples = question.examples ?? [];
  const constraints = question.constraints ?? [];

  return (
    <div
      className="rounded-xl border overflow-hidden flex flex-col"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Top View Tabs */}
      <div
        className="flex items-center justify-between px-4 border-b"
        style={{
          backgroundColor: 'var(--bg-surface-subtle)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-1">
          {([
            { id: 'prompt', label: 'Prompt' },
            { id: 'followup', label: 'AI Follow-up', badge: Boolean(evaluation) },
            { id: 'hints', label: `Hints (${question.hints.length})` },
          ] as const).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="relative px-3 py-2.5 text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5"
                style={{
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive
                    ? '2px solid var(--accent-primary)'
                    : '2px solid transparent',
                }}
              >
                {tab.label}
                {'badge' in tab && tab.badge && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--emerald)' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {typeof index === 'number' && typeof total === 'number' && (
          <span
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            Q{index + 1}/{total}
          </span>
        )}
      </div>

      {/* Tab Content */}
      <div className="p-5 space-y-4">
        {/* Header Metadata */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={question.difficulty} />
            <span
              className="px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide rounded-md border"
              style={{
                backgroundColor: 'var(--bg-surface-subtle)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {question.trackId === 'system-design'
                ? 'System Design'
                : question.trackId.toUpperCase()}
            </span>
          </div>

          <h2
            className="text-lg font-bold leading-snug"
            style={{ color: 'var(--text-primary)' }}
          >
            {question.title}
          </h2>
        </div>

        {activeTab === 'prompt' && (
          <div className="space-y-4">
            <p
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: 'var(--text-secondary)' }}
            >
              {question.prompt}
            </p>

            {/* Question-Specific Examples */}
            {examples.length > 0 && (
              <div className="space-y-2.5">
                {examples.map((ex, idx) => (
                  <div
                    key={`${question.id}-ex-${idx + 1}`}
                    className="rounded-lg border p-3 space-y-1 text-xs"
                    style={{
                      backgroundColor: 'var(--bg-surface-subtle)',
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Example {idx + 1}
                    </p>
                    <p className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Input:</strong> {ex.input}
                    </p>
                    <p className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Output:</strong> {ex.output}
                    </p>
                    {ex.explanation && (
                      <p style={{ color: 'var(--text-muted)' }}>
                        <strong>Explanation:</strong> {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Question-Specific Constraints */}
            {constraints.length > 0 && (
              <div className="space-y-1.5">
                <p
                  className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Constraints & Expectations
                </p>
                <ul
                  className="space-y-1 text-xs list-disc list-inside"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {constraints.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'followup' && (
          <div className="space-y-3">
            {evaluation ? (
              <>
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
                  <div className="space-y-1">
                    <p
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      Interviewer Follow-Up
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                      {evaluation.followUpPrompt}
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-lg border p-3.5 space-y-2 text-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      AI Rubric Snapshot
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full font-bold tabular-nums"
                      style={{
                        backgroundColor: 'var(--emerald-soft)',
                        color: 'var(--emerald)',
                      }}
                    >
                      {evaluation.score}/100
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }}>{evaluation.feedback}</p>
                </div>
              </>
            ) : (
              <div
                className="rounded-lg border p-4 text-xs flex items-start gap-2.5"
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Sparkles
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: 'var(--accent-primary)' }}
                />
                <span>
                  Submit your approach in the <strong>AI Interviewer Follow-up</strong> box below
                  to receive a contextual follow-up question and rubric snapshot.
                </span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="space-y-2">
            {question.hints.map((hint, idx) => (
              <div
                key={idx}
                className="rounded-lg border p-3 flex items-start gap-2.5 text-xs"
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Lightbulb
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: 'var(--amber)' }}
                />
                <span>{hint}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
