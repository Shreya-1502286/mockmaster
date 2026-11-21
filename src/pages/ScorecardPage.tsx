import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  DifficultyBadge,
  ErrorState,
  LoadingState,
  ProgressBar,
} from '../components';
import { AppLayout } from '../components/layout/AppLayout';
import { mockApi } from '../mocks/api';
import type { SessionRecord } from '../mocks/types';

export function ScorecardPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [session, setSession] = useState<SessionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  const loadScorecard = useCallback(async () => {
    if (!sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await mockApi.getSessionById(sessionId);
      setSession(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load scorecard.');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void loadScorecard();
  }, [loadScorecard]);

  const scorecard = session?.scorecard;
  const score = scorecard?.overallScore ?? 0;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <AppLayout>
      {loading ? (
        <LoadingState label="Generating scorecard..." />
      ) : error || !session || !scorecard ? (
        <ErrorState
          message={error ?? 'Scorecard not found.'}
          onRetry={() => void loadScorecard()}
        />
      ) : (
        <div className="space-y-6">
          {/* Header Summary with Score Ring */}
          <section
            className="rounded-2xl border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="var(--border-subtle)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={score >= 76 ? 'var(--emerald)' : 'var(--accent-primary)'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold tabular-nums">{score}</span>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    / 100
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: 'var(--emerald-soft)',
                      color: 'var(--emerald)',
                    }}
                  >
                    <Award className="w-3.5 h-3.5" />
                    {scorecard.gradeLabel}
                  </span>
                  <DifficultyBadge difficulty={session.difficulty} />
                </div>

                <h1 className="text-2xl font-bold">{session.trackName}</h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {scorecard.mentorDebrief}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/progress"
                className="px-4 py-2 text-sm font-semibold rounded-xl border no-underline"
                style={{
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              >
                View Progress
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl no-underline"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                }}
              >
                Back to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Rubric Breakdown + Strengths/Improvements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section
              className="lg:col-span-7 rounded-2xl border p-6 space-y-4"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <h2 className="text-base font-bold">Rubric Breakdown</h2>
              <div className="space-y-4">
                {scorecard.rubric.map((dim) => (
                  <div key={dim.key} className="space-y-1">
                    <ProgressBar
                      value={dim.score}
                      label={dim.label}
                      tone={dim.score >= 80 ? 'emerald' : 'accent'}
                    />
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {dim.feedback}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="lg:col-span-5 space-y-5">
              <div
                className="rounded-2xl border p-5 space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--emerald)' }} />
                  <h3 className="text-sm font-bold">Strengths</h3>
                </div>
                <ul className="space-y-2 text-sm list-disc list-inside" style={{ color: 'var(--text-secondary)' }}>
                  {scorecard.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-2xl border p-5 space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                  <h3 className="text-sm font-bold">Focus Next</h3>
                </div>
                <ul className="space-y-2 text-sm list-disc list-inside" style={{ color: 'var(--text-secondary)' }}>
                  {scorecard.improvements.map((imp, idx) => (
                    <li key={idx}>{imp}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Expandable Question Review */}
          <section className="space-y-3">
            <h2 className="text-base font-bold">
              Question-by-Question Review ({session.evaluations.length})
            </h2>

            {session.evaluations.length === 0 ? (
              <div
                className="rounded-xl border p-5 text-sm"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                Summary scorecard recorded for this session.
              </div>
            ) : (
              <div className="space-y-3">
                {session.evaluations.map((ev) => {
                  const isOpen = expandedQ === ev.questionId;
                  return (
                    <div
                      key={ev.questionId}
                      className="rounded-xl border overflow-hidden"
                      style={{
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedQ(isOpen ? null : ev.questionId)
                        }
                        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <DifficultyBadge difficulty={ev.difficulty} />
                          <span className="text-sm font-semibold truncate">
                            {ev.questionTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className="text-xs font-bold px-2.5 py-0.5 rounded-full tabular-nums"
                            style={{
                              backgroundColor: 'var(--emerald-soft)',
                              color: 'var(--emerald)',
                            }}
                          >
                            {ev.score}/100
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          className="px-5 pb-5 pt-2 border-t space-y-3 text-sm"
                          style={{ borderColor: 'var(--border-subtle)' }}
                        >
                          <div>
                            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
                              Your Answer
                            </p>
                            <p style={{ color: 'var(--text-primary)' }}>{ev.userAnswer}</p>
                          </div>

                          <div
                            className="rounded-lg p-3"
                            style={{ backgroundColor: 'var(--accent-primary-soft)' }}
                          >
                            <p
                              className="text-xs font-semibold mb-1 flex items-center gap-1"
                              style={{ color: 'var(--accent-primary)' }}
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              Follow-Up Prompt
                            </p>
                            <p className="text-xs" style={{ color: 'var(--text-primary)' }}>
                              {ev.followUpPrompt}
                            </p>
                            {ev.followUpAnswer && (
                              <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                                <strong>Your follow-up:</strong> {ev.followUpAnswer}
                              </p>
                            )}
                          </div>

                          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>AI Feedback: </strong>
                            {ev.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </AppLayout>
  );
}

