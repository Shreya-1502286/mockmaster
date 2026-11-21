import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CodePane,
  ErrorState,
  LoadingState,
  QuestionPanel,
} from '../components';
import { AppLayout } from '../components/layout/AppLayout';
import { useUser } from '../context/useUser';
import { mockApi } from '../mocks/api';
import type { Question, QuestionEvaluation, SessionRecord } from '../mocks/types';

export function InterviewSessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { refreshUser } = useUser();

  const [session, setSession] = useState<SessionRecord | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [codeMap, setCodeMap] = useState<Record<string, string>>({});
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [evaluations, setEvaluations] = useState<Record<string, QuestionEvaluation>>({});

  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!sessionId) return;
    let active = true;
    mockApi
      .getSessionById(sessionId)
      .then(async (sess) => {
        const allQs = await mockApi.getQuestions({ track: sess.trackId });
        if (!active) return;
        const ordered = sess.questionIds
          .map((id) => allQs.find((q) => q.id === id))
          .filter((q): q is Question => Boolean(q));

        setSession(sess);
        setQuestions(ordered);

        const initialCode: Record<string, string> = {};
        ordered.forEach((q) => {
          if (q.starterCode) initialCode[q.id] = q.starterCode;
        });
        setCodeMap((prev) => ({ ...initialCode, ...prev }));

        const existingEvals: Record<string, QuestionEvaluation> = {};
        sess.evaluations.forEach((ev) => {
          existingEvals[ev.questionId] = ev;
        });
        setEvaluations(existingEvals);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load interview session.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [sessionId, reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  };

  const currentQuestion = questions[currentIdx];
  const currentEval = currentQuestion ? evaluations[currentQuestion.id] : undefined;

  const handleEvaluateAnswer = async () => {
    if (!session || !currentQuestion) return;
    const answerText = (answers[currentQuestion.id] ?? '').trim();
    const codeText = codeMap[currentQuestion.id] ?? '';
    const followUpText = followUpAnswers[currentQuestion.id] ?? '';

    if (!answerText && !codeText.trim()) return;

    setEvaluating(true);
    try {
      const ev = await mockApi.submitSessionAnswer(
        session.id,
        currentQuestion.id,
        answerText || 'Submitted code solution.',
        codeText,
        followUpText
      );
      setEvaluations((prev) => ({ ...prev, [currentQuestion.id]: ev }));
    } finally {
      setEvaluating(false);
    }
  };

  const handleCompleteSession = async () => {
    if (!session) return;
    setCompleting(true);
    try {
      // Auto-evaluate current question if user typed an answer but hasn't submitted yet
      if (currentQuestion && !evaluations[currentQuestion.id]) {
        const answerText = (answers[currentQuestion.id] ?? '').trim();
        const codeText = codeMap[currentQuestion.id] ?? '';
        if (answerText || codeText.trim()) {
          await mockApi.submitSessionAnswer(
            session.id,
            currentQuestion.id,
            answerText || 'Submitted code solution.',
            codeText,
            followUpAnswers[currentQuestion.id]
          );
        }
      }
      await mockApi.completeSession(session.id);
      await refreshUser();
      navigate(`/scorecard/${session.id}`);
    } finally {
      setCompleting(false);
    }
  };

  return (
    <AppLayout>
      {loading ? (
        <LoadingState label="Loading interview workspace..." />
      ) : error || !session || !currentQuestion ? (
        <ErrorState
          message={error ?? 'Session not found.'}
          onRetry={handleRetry}
        />
      ) : (
        <div className="space-y-5">
          {/* Session Top Bar */}
          <div
            className="rounded-xl border px-4 py-3 flex flex-wrap items-center justify-between gap-3"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">{session.trackName}</span>
              <span
                className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                {session.pacingMinutes}m · {session.mode}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer disabled:opacity-40"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              <span className="text-xs font-semibold tabular-nums px-1" style={{ color: 'var(--text-muted)' }}>
                {currentIdx + 1} / {questions.length}
              </span>

              <button
                type="button"
                disabled={currentIdx >= questions.length - 1}
                onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer disabled:opacity-40"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                disabled={completing}
                onClick={() => void handleCompleteSession()}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg cursor-pointer ml-2"
                style={{
                  backgroundColor: 'var(--emerald)',
                  color: '#ffffff',
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {completing ? 'Grading...' : 'Finish & View Scorecard'}
              </button>
            </div>
          </div>

          {/* Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Pane: Question + Explanation + Follow-Up */}
            <div className="lg:col-span-6 space-y-4">
              <QuestionPanel
                question={currentQuestion}
                index={currentIdx}
                total={questions.length}
                followUpPrompt={currentEval?.followUpPrompt}
              />

              <div
                className="rounded-xl border p-4 space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <label
                  htmlFor="session-answer"
                  className="block text-xs font-semibold uppercase tracking-wide"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Your Approach & Explanation
                </label>
                <textarea
                  id="session-answer"
                  rows={4}
                  value={answers[currentQuestion.id] ?? ''}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  placeholder="Explain your approach, time/space complexity, or STAR story..."
                  className="w-full rounded-lg border p-3 text-sm outline-none resize-y"
                  style={{
                    backgroundColor: 'var(--bg-surface-subtle)',
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                />

                {currentEval && (
                  <div className="space-y-2 pt-1">
                    <label
                      htmlFor="session-followup"
                      className="block text-xs font-semibold uppercase tracking-wide"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      Response to Follow-Up
                    </label>
                    <textarea
                      id="session-followup"
                      rows={2}
                      value={followUpAnswers[currentQuestion.id] ?? ''}
                      onChange={(e) =>
                        setFollowUpAnswers((prev) => ({
                          ...prev,
                          [currentQuestion.id]: e.target.value,
                        }))
                      }
                      placeholder="Answer the interviewer's follow-up question..."
                      className="w-full rounded-lg border p-2.5 text-sm outline-none resize-y"
                      style={{
                        backgroundColor: 'var(--bg-surface-subtle)',
                        borderColor: 'var(--accent-primary-border)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  {currentEval ? (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: 'var(--emerald)' }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Evaluated ({currentEval.score}/100)
                    </span>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Submit to trigger AI follow-up
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={evaluating}
                    onClick={() => void handleEvaluateAnswer()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: '#ffffff',
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {evaluating
                      ? 'Analyzing...'
                      : currentEval
                        ? 'Re-evaluate'
                        : 'Submit & Get Follow-Up'}
                  </button>
                </div>

                {currentEval && (
                  <p
                    className="text-xs rounded-lg p-3"
                    style={{
                      backgroundColor: 'var(--bg-surface-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <strong style={{ color: 'var(--text-primary)' }}>Feedback: </strong>
                    {currentEval.feedback}
                  </p>
                )}
              </div>
            </div>

            {/* Right Pane: Code Editor / Scratchpad */}
            <div className="lg:col-span-6">
              <CodePane
                value={
                  codeMap[currentQuestion.id] ??
                  currentQuestion.starterCode ??
                  '// Write notes, pseudocode, or architecture outline here...\n'
                }
                onChange={(next) =>
                  setCodeMap((prev) => ({ ...prev, [currentQuestion.id]: next }))
                }
                starterCode={currentQuestion.starterCode}
                language={currentQuestion.language ?? 'typescript'}
              />
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

