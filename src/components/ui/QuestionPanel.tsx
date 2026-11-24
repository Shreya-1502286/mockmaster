import { Lightbulb, MessageSquare, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { Question, QuestionEvaluation, TrackId } from '../../mocks/types';
import { DifficultyBadge } from './Badges';

type QuestionTab = 'prompt' | 'followup' | 'hints';

interface QuestionPanelProps {
  question: Question;
  index?: number;
  total?: number;
  evaluation?: QuestionEvaluation;
}

interface ExampleCase {
  label: string;
  input: string;
  output: string;
  explanation?: string;
}

function getExamplesAndConstraints(question: Question): {
  examples: ExampleCase[];
  constraints: string[];
} {
  const byTrack: Record<TrackId, { examples: ExampleCase[]; constraints: string[] }> = {
    dsa: {
      examples: [
        {
          label: 'Example 1',
          input: 'nums = [2, 7, 11, 15], target = 9',
          output: '[0, 1]',
          explanation: 'Optimal linear pass avoids nested O(n^2) comparisons.',
        },
        {
          label: 'Example 2',
          input: 'nums = [3, 2, 4], target = 6',
          output: '[1, 2]',
        },
      ],
      constraints: [
        '1 <= input.length <= 10^5',
        'Aim for O(n) or O(n log n) time complexity',
        'Handle empty, single-element, and duplicate edge cases',
      ],
    },
    frontend: {
      examples: [
        {
          label: 'Example 1',
          input: 'Rapidly triggered calls within 300ms window',
          output: 'Invokes callback once after 300ms of inactivity',
          explanation: 'Previous pending timers or stale requests are cancelled.',
        },
        {
          label: 'Example 2',
          input: 'Component unmounts while async operation is pending',
          output: 'Cleanup cancels pending work; zero state-update warnings',
        },
      ],
      constraints: [
        'Zero memory leaks on unmount or repeated re-renders',
        'Preserve TypeScript type safety & DOM accessibility',
        'Avoid stale closures over state or props',
      ],
    },
    behavioral: {
      examples: [
        {
          label: 'Example 1 (STAR Framing)',
          input: 'Situation & Task (20–30s)',
          output: 'Clear context, stakes, and your direct ownership',
          explanation: 'Avoid spending more than 30 seconds on background setup.',
        },
        {
          label: 'Example 2 (Impact)',
          input: 'Action & Result (60–90s)',
          output: 'Concrete technical decision + measurable outcome',
        },
      ],
      constraints: [
        'Keep total story under 2–3 minutes',
        'Use "I" for your actions and "we" for team context',
        'Include at least one measurable or observable result',
      ],
    },
    'system-design': {
      examples: [
        {
          label: 'Example 1 (Happy Path)',
          input: '10k concurrent active users, <100ms p95 interaction',
          output: 'Cached client state + debounced/batched network sync',
          explanation: 'Minimize redundant round-trips and main-thread work.',
        },
        {
          label: 'Example 2 (Failure Mode)',
          input: 'Network drops or stale response arrives out-of-order',
          output: 'Optimistic rollback / AbortController + retry backoff',
        },
      ],
      constraints: [
        'Clarify functional & non-functional requirements first',
        'Cover API contract, client state, caching, and failure modes',
        'Discuss accessibility, security, and observability tradeoffs',
      ],
    },
  };

  return byTrack[question.trackId];
}

export function QuestionPanel({
  question,
  index,
  total,
  evaluation,
}: QuestionPanelProps) {
  const [activeTab, setActiveTab] = useState<QuestionTab>('prompt');
  const { examples, constraints } = getExamplesAndConstraints(question);

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

            {/* Examples 1 & 2 */}
            <div className="space-y-2.5">
              {examples.map((ex) => (
                <div
                  key={ex.label}
                  className="rounded-lg border p-3 space-y-1 text-xs"
                  style={{
                    backgroundColor: 'var(--bg-surface-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {ex.label}
                  </p>
                  <p className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Input:</strong> {ex.input}
                  </p>
                  <p className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>Output:</strong> {ex.output}
                  </p>
                  {ex.explanation && (
                    <p style={{ color: 'var(--text-muted)' }}>
                      <strong>Note:</strong> {ex.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
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
