import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  Send,
  Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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

function formatTimer(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

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
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

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

  useEffect(() => {
    if (loading || !session) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, session]);

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
        <div className="space-y-4">
          {/* Compact Session Top Bar */}
          <div
            className="rounded-xl border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <Link
                to="/tracks"
                className="font-medium no-underline"
                style={{ color: 'var(--text-muted)' }}
              >
                Tracks
              </Link>
              <span style={{ color: 'var(--text-muted)' }}>/</span>
              <span className="font-bold">{session.trackName}</span>
              <span
                className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-md"
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                Question {currentIdx + 1} of {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border tabular-nums"
                style={{
                  backgroundColor: 'var(--bg-surface-subtle)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)',
                }}
              >
                <Clock className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
                {formatTimer(elapsedSeconds)} / {session.pacingMinutes}:00
              </span>

              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border cursor-pointer disabled:opacity-40"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              <button
                type="button"
                disabled={currentIdx >= questions.length - 1}
                onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border cursor-pointer disabled:opacity-40"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg cursor-pointer"
                style={{
                  backgroundColor: 'var(--emerald)',
                  color: '#ffffff',
                }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {completing ? 'Grading...' : 'Finish Session'}
              </button>
            </div>
          </div>

          {/* Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Pane: Prompt Tabs + Compact AI Follow-Up Card */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <QuestionPanel
                question={currentQuestion}
                index={currentIdx}
                total={questions.length}
                evaluation={currentEval}
              />

              {/* Compact AI Interviewer Follow-up Card */}
              <div
                className="rounded-xl border p-4 space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    AI Interviewer Follow-up
                  </span>
                  {currentEval && (
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: 'var(--emerald)' }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {currentEval.score}/100
                    </span>
                  )}
                </div>

                {currentEval && (
                  <div
                    className="rounded-lg border p-3 text-xs space-y-1"
                    style={{
                      backgroundColor: 'var(--accent-primary-soft)',
                      borderColor: 'var(--accent-primary-border)',
                    }}
                  >
                    <p className="font-semibold" style={{ color: 'var(--accent-primary)' }}>
                      Follow-up Question:
                    </p>
                    <p style={{ color: 'var(--text-primary)' }}>
                      {currentEval.followUpPrompt}
                    </p>
                  </div>
                )}

                <textarea
                  id="session-answer"
                  rows={3}
                  value={
                    currentEval
                      ? (followUpAnswers[currentQuestion.id] ?? '')
                      : (answers[currentQuestion.id] ?? '')
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (currentEval) {
                      setFollowUpAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: val,
                      }));
                    } else {
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: val,
                      }));
                    }
                  }}
                  placeholder={
                    currentEval
                      ? 'Reply to the interviewer follow-up...'
                      : 'Explain your approach, complexity, or STAR story...'
                  }
                  className="w-full rounded-lg border p-2.5 text-sm outline-none resize-y"
                  style={{
                    backgroundColor: 'var(--bg-surface-subtle)',
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                    {currentEval ? currentEval.feedback : 'Submit to generate contextual follow-up'}
                  </span>

                  <button
                    type="button"
                    disabled={evaluating}
                    onClick={() => void handleEvaluateAnswer()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg cursor-pointer shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-primary)',
                      color: '#ffffff',
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {evaluating
                      ? 'Analyzing...'
                      : currentEval
                        ? 'Update Follow-Up'
                        : 'Submit & Get Follow-Up'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Pane: Dark IDE CodePane + Test Cases & Output */}
            <div className="lg:col-span-6 flex flex-col">
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
                onSubmitCode={() => void handleEvaluateAnswer()}
              />
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
