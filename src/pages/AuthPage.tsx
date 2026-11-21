import { ArrowRight, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingState } from '../components';
import { useUser } from '../context/UserContext';
import { mockApi } from '../mocks/api';
import type { UserPersona } from '../mocks/types';

export function AuthPage() {
  const [personas, setPersonas] = useState<UserPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [email, setEmail] = useState('shreya@mockmaster.dev');
  const [password, setPassword] = useState('demo1234');
  const { loginAsPersona } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    mockApi
      .getPersonas()
      .then(setPersonas)
      .finally(() => setLoading(false));
  }, []);

  const handleDemoLogin = async (personaId: string) => {
    setSubmittingId(personaId);
    try {
      await loginAsPersona(personaId);
      navigate('/dashboard');
    } finally {
      setSubmittingId(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const matched = personas.find(
      (p) => p.email.toLowerCase() === email.trim().toLowerCase()
    );
    await handleDemoLogin(matched?.id ?? 'user-shreya');
  };

  return (
    <div
      className="min-h-screen grid grid-cols-1 lg:grid-cols-2"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Left 50% Brand Panel */}
      <div
        className="flex flex-col justify-between p-8 sm:p-12 lg:p-16"
        style={{
          backgroundColor: 'var(--accent-primary)',
          color: '#ffffff',
        }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-bold text-lg text-white no-underline w-fit"
        >
          <Sparkles className="w-5 h-5" />
          <span>MockMaster</span>
        </Link>

        <div className="my-12 max-w-md space-y-5">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Interview confidence built one mock at a time.
          </h1>
          <p className="text-sm sm:text-base opacity-90 leading-relaxed">
            Switch seamlessly between fresher and working-professional personas to preview
            adaptive difficulty, weekly goals, and 4-week analytics.
          </p>
          <ul className="space-y-2.5 text-sm opacity-95">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              36 curated prompts across DSA, Frontend, Behavioral & System Design
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Deterministic AI follow-ups & 4-dimension rubric scorecards
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Pure-white light mode & Chrome-inspired dark mode
            </li>
          </ul>
        </div>

        <p className="text-xs opacity-75">
          Local Demo Mode · No external account or API key required
        </p>
      </div>

      {/* Right 50% Login & One-Click Personas */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Pick a one-click demo persona or sign in below.
            </p>
          </div>

          {/* One-Click Demo Personas */}
          <div className="space-y-3">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              One-Click Demo Login
            </p>

            {loading ? (
              <LoadingState compact label="Loading demo personas..." />
            ) : (
              personas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  disabled={submittingId !== null}
                  onClick={() => void handleDemoLogin(p.id)}
                  className="w-full flex items-center justify-between gap-3 rounded-xl border p-4 text-left cursor-pointer transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-default)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{
                        backgroundColor: 'var(--accent-primary-soft)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {p.avatarInitials}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{p.name}</span>
                        <span
                          className="px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize"
                          style={{
                            backgroundColor: 'var(--emerald-soft)',
                            color: 'var(--emerald)',
                          }}
                        >
                          {p.role}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Target: {p.targetRole} · {p.streakDays}d streak
                      </p>
                    </div>
                  </div>

                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {submittingId === p.id ? 'Entering...' : 'Enter'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t" style={{ borderColor: 'var(--border-subtle)' }} />
            <span className="flex-shrink mx-3 text-xs" style={{ color: 'var(--text-muted)' }}>
              or sign in with email
            </span>
            <div className="flex-grow border-t" style={{ borderColor: 'var(--border-subtle)' }} />
          </div>

          <form onSubmit={(e) => void handleFormSubmit(e)} className="space-y-4">
            <div>
              <label
                htmlFor="auth-email"
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="auth-password"
                className="block text-xs font-semibold mb-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                Password
              </label>
              <input
                id="auth-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border outline-none"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submittingId !== null}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg cursor-pointer"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
              }}
            >
              <UserCheck className="w-4 h-4" />
              Continue to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

