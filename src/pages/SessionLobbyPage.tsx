import { ArrowLeft, Clock, Flame, Play, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  DifficultyBadge,
  ErrorState,
  FreeBadge,
  LoadingState,
} from '../components';
import { AppLayout } from '../components/layout/AppLayout';
import { useUser } from '../context/useUser';
import { mockApi } from '../mocks/api';
import type {
  Difficulty,
  Question,
  SessionMode,
  Track,
  TrackId,
} from '../mocks/types';

export function SessionLobbyPage() {
  const { trackId } = useParams<{ trackId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const initialDiff = (searchParams.get('difficulty') as Difficulty) || user?.settings.preferredDifficulty || 'medium';

  const [track, setTrack] = useState<Track | null>(null);
  const [previewQuestions, setPreviewQuestions] = useState<Question[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDiff);
  const [mode, setMode] = useState<SessionMode>('timed');
  const [pacingMinutes, setPacingMinutes] = useState<number>(
    user?.settings.pacingMinutes ?? 30
  );
  const [questionCount, setQuestionCount] = useState<number>(2);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([
      mockApi.getTracks(),
      mockApi.getQuestions({
        track: (trackId as TrackId) ?? 'dsa',
        difficulty,
      }),
    ])
      .then(([tracks, qs]) => {
        if (!active) return;
        const found = tracks.find((t) => t.id === trackId) ?? tracks[0];
        setTrack(found);
        setPreviewQuestions(qs);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load session lobby.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [trackId, difficulty, reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  };

  const handleStartSession = async () => {
    if (!track) return;
    setStarting(true);
    try {
      const session = await mockApi.createSession({
        trackId: track.id,
        difficulty,
        mode,
        pacingMinutes,
        questionCount,
      });
      navigate(`/session/${session.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create session.');
      setStarting(false);
    }
  };

  return (
    <AppLayout>
      {loading ? (
        <LoadingState label="Preparing session lobby..." />
      ) : error || !track ? (
        <ErrorState
          message={error ?? 'Track not found.'}
          onRetry={handleRetry}
        />
      ) : (
        <div className="space-y-6">
          <Link
            to="/tracks"
            className="inline-flex items-center gap-1.5 text-xs font-semibold no-underline"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Tracks
          </Link>

          {/* Full-width Header Band */}
          <section
            className="rounded-2xl border p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--accent-primary)' }}
              >
                {track.category}
              </span>
              {track.isFree && <FreeBadge />}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{track.name}</h1>
            <p className="text-sm max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {track.description}
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Configuration Panel */}
            <section
              className="lg:col-span-7 rounded-2xl border p-6 space-y-6"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <h2 className="text-base font-bold">Configure Your Mock Session</h2>

              {/* Difficulty */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  Difficulty
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className="px-3 py-2.5 rounded-xl border text-sm font-semibold capitalize cursor-pointer transition-colors"
                      style={
                        difficulty === d
                          ? {
                              backgroundColor: 'var(--accent-primary-soft)',
                              borderColor: 'var(--accent-primary)',
                              color: 'var(--accent-primary)',
                            }
                          : {
                              backgroundColor: 'var(--bg-surface)',
                              borderColor: 'var(--border-subtle)',
                              color: 'var(--text-secondary)',
                            }
                      }
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  Interview Mode
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {([
                    { id: 'timed', label: 'Timed Mock' },
                    { id: 'practice', label: 'Practice' },
                    { id: 'guided', label: 'Guided' },
                  ] as const).map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id)}
                      className="px-3 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-colors"
                      style={
                        mode === m.id
                          ? {
                              backgroundColor: 'var(--accent-primary-soft)',
                              borderColor: 'var(--accent-primary)',
                              color: 'var(--accent-primary)',
                            }
                          : {
                              backgroundColor: 'var(--bg-surface)',
                              borderColor: 'var(--border-subtle)',
                              color: 'var(--text-secondary)',
                            }
                      }
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pacing & Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="lobby-pacing"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Pacing (minutes)
                  </label>
                  <select
                    id="lobby-pacing"
                    value={pacingMinutes}
                    onChange={(e) => setPacingMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border outline-none"
                    style={{
                      backgroundColor: 'var(--bg-surface-subtle)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value={15}>15 min (Sprint)</option>
                    <option value={30}>30 min (Standard)</option>
                    <option value={45}>45 min (Deep Dive)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lobby-qcount"
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Questions
                  </label>
                  <select
                    id="lobby-qcount"
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border outline-none"
                    style={{
                      backgroundColor: 'var(--bg-surface-subtle)',
                      borderColor: 'var(--border-default)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <option value={1}>1 Question</option>
                    <option value={2}>2 Questions</option>
                    <option value={3}>3 Questions</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                disabled={starting}
                onClick={() => void handleStartSession()}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl cursor-pointer"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                {starting ? 'Starting Session...' : 'Start Interview Session'}
              </button>
            </section>

            {/* Right: Weekly Impact & Preview */}
            <aside className="lg:col-span-5 space-y-5">
              <div
                className="rounded-2xl border p-5 space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4" style={{ color: 'var(--emerald)' }} />
                  <h3 className="text-sm font-bold">Weekly Goal Impact</h3>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Completing this session extends your streak to{' '}
                  <strong style={{ color: 'var(--emerald)' }}>
                    {(user?.streakDays ?? 0) + 1} days
                  </strong>{' '}
                  and updates your weekly timeline.
                </p>
                <div className="flex items-center gap-4 text-xs pt-1" style={{ color: 'var(--text-muted)' }}>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {pacingMinutes} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    AI Rubric + Follow-ups
                  </span>
                </div>
              </div>

              <div
                className="rounded-2xl border p-5 space-y-3"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                <h3 className="text-sm font-bold">
                  Sample Prompts ({difficulty})
                </h3>
                <div className="space-y-2.5">
                  {previewQuestions.slice(0, questionCount).map((q) => (
                    <div
                      key={q.id}
                      className="rounded-lg border p-3 flex items-center justify-between gap-2"
                      style={{
                        backgroundColor: 'var(--bg-surface-subtle)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <span className="text-xs font-medium truncate">{q.title}</span>
                      <DifficultyBadge difficulty={q.difficulty} />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

