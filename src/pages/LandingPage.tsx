import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Code2,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FreeBadge } from '../components';
import { useTheme } from '../context/useTheme';
import { useUser } from '../context/useUser';

const TRACK_HIGHLIGHTS = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    desc: 'Sliding windows, trees, graphs, and complexity follow-ups.',
    free: true,
  },
  {
    id: 'frontend',
    title: 'Frontend & React Engineering',
    desc: 'Hooks, async race conditions, DOM delegation, and rendering perf.',
    free: false,
  },
  {
    id: 'behavioral',
    title: 'Behavioral & STAR Stories',
    desc: 'Structured storytelling for ownership, conflict, and ambiguity.',
    free: true,
  },
  {
    id: 'system-design',
    title: 'Frontend & Web System Design',
    desc: 'Autocomplete, client caching, real-time sync, and scalability.',
    free: false,
  },
];

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const { loginAsPersona } = useUser();
  const navigate = useNavigate();

  const handleQuickDemo = async () => {
    await loginAsPersona('user-shreya');
    navigate('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Top Bar */}
      <header
        className="border-b"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-base no-underline"
            style={{ color: 'var(--text-primary)' }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent-primary)', color: '#ffffff' }}
            >
              <Sparkles className="w-4 h-4" />
            </span>
            <span>MockMaster</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void toggleTheme()}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <Link
              to="/auth"
              className="px-3.5 py-2 text-sm font-medium rounded-lg border no-underline"
              style={{
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => void handleQuickDemo()}
              className="px-4 py-2 text-sm font-semibold rounded-lg cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
              }}
            >
              Try Demo
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-6"
            style={{
              backgroundColor: 'var(--accent-primary-soft)',
              color: 'var(--accent-primary)',
              borderColor: 'var(--accent-primary-border)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Mock Interview Simulator & Analytics
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl mx-auto mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            Practice real interviews with instant rubric feedback.
          </h1>

          <p
            className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Master DSA, Frontend Engineering, Behavioral STAR stories, and System Design.
            Get adaptive follow-up questions, structured scorecards, and weekly streak tracking.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => void handleQuickDemo()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
              }}
            >
              Launch Demo as Shreya
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/tracks"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border no-underline"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
              }}
            >
              Browse Tracks
            </Link>
          </div>

          {/* 3 Feature Pills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16 text-left">
            <div
              className="rounded-xl border p-5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <Code2 className="w-5 h-5 mb-3" style={{ color: 'var(--accent-primary)' }} />
              <h3 className="text-base font-semibold mb-1">Split-Pane Coding & Q&A</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Write TypeScript/JavaScript solutions alongside dynamic interviewer follow-ups.
              </p>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <CheckCircle2 className="w-5 h-5 mb-3" style={{ color: 'var(--emerald)' }} />
              <h3 className="text-base font-semibold mb-1">Actionable Scorecards</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                4-dimension rubric breakdown covering problem solving, code, communication, and edge cases.
              </p>
            </div>

            <div
              className="rounded-xl border p-5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <BarChart3 className="w-5 h-5 mb-3" style={{ color: 'var(--accent-primary)' }} />
              <h3 className="text-base font-semibold mb-1">Weekly Plan & Streaks</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Stay consistent with a guided Mon–Fri schedule and 4-week mastery analytics.
              </p>
            </div>
          </div>
        </section>

        {/* Track Preview */}
        <section
          className="border-t py-14"
          style={{
            borderColor: 'var(--border-subtle)',
            backgroundColor: 'var(--bg-surface-subtle)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-xl font-bold mb-6">4 Focused Interview Tracks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRACK_HIGHLIGHTS.map((t) => (
                <Link
                  key={t.id}
                  to={`/lobby/${t.id}`}
                  className="rounded-xl border p-5 no-underline transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold">{t.title}</span>
                    {t.free && <FreeBadge />}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {t.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

