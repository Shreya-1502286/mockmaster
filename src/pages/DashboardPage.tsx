import { ArrowRight, Calendar, Flame, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CourseCard,
  DebriefCard,
  EmptyState,
  ErrorState,
  LoadingState,
  ProgressBar,
  TimelineRail,
} from '../components';
import { AppLayout } from '../components/layout/AppLayout';
import { useUser } from '../context/useUser';
import { mockApi } from '../mocks/api';
import type {
  DebriefQuote,
  ProgressSummary,
  Track,
  WeeklyPlanItem,
} from '../mocks/types';

export function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlanItem[]>([]);
  const [debriefs, setDebriefs] = useState<DebriefQuote[]>([]);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([
      mockApi.getTracks(),
      mockApi.getMyWeeklyPlan(),
      mockApi.getMyDebrief(),
      mockApi.getMyProgress(),
    ])
      .then(([tracksData, planData, debriefData, progressData]) => {
        if (!active) return;
        setTracks(tracksData);
        setWeeklyPlan(planData);
        setDebriefs(debriefData);
        setProgress(progressData);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Failed to load dashboard.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id, reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  };

  const enrolledTracks = tracks.filter((t) => t.isEnrolled);
  const freeTracks = tracks.filter((t) => t.isFree);
  const todayItem = weeklyPlan.find((item) => item.status === 'today');
  const weeklyPct =
    progress && progress.weeklySessionTarget > 0
      ? Math.round(
          (progress.weeklySessionsCompleted / progress.weeklySessionTarget) * 100
        )
      : 0;

  return (
    <AppLayout>
      {loading ? (
        <LoadingState label="Loading your dashboard..." />
      ) : error ? (
        <ErrorState message={error} onRetry={handleRetry} />
      ) : (
        <div className="space-y-8">
          {/* Welcome & Weekly Progress Header */}
          <section
            className="rounded-2xl border p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full"
                  style={{
                    backgroundColor: 'var(--amber-soft)',
                    color: 'var(--amber)',
                  }}
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {progress?.streakDays ?? user?.streakDays ?? 0} day streak
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Target: {user?.targetRole ?? 'Frontend Dev'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome back, {user?.name ?? 'Shreya'}
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                You’ve completed{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  {progress?.weeklySessionsCompleted ?? 0} of{' '}
                  {progress?.weeklySessionTarget ?? 5}
                </strong>{' '}
                planned sessions this week.
              </p>

              <div className="pt-2 max-w-md">
                <ProgressBar
                  value={weeklyPct}
                  label="Weekly Goal"
                  tone={weeklyPct >= 80 ? 'emerald' : 'accent'}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {todayItem && (
                <button
                  type="button"
                  onClick={() => navigate(`/lobby/${todayItem.trackId}`)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                  }}
                >
                  <Play className="w-4 h-4 fill-current" />
                  Start Today’s Mock
                </button>
              )}
              <Link
                to="/tracks"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl border no-underline"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              >
                All Tracks
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Compact Horizontal "Your week" + "Last debrief" */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <section
              className="lg:col-span-7 rounded-2xl border p-5 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar
                    className="w-4 h-4"
                    style={{ color: 'var(--accent-primary)' }}
                  />
                  <h2 className="text-base font-bold">Your week</h2>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Mon – Fri Plan
                </span>
              </div>

              {weeklyPlan.length === 0 ? (
                <EmptyState
                  title="No weekly plan yet"
                  description="Pick a track to generate your 5-day interview prep plan."
                />
              ) : (
                <TimelineRail
                  items={weeklyPlan}
                  onSelectItem={(item) => navigate(`/lobby/${item.trackId}`)}
                />
              )}
            </section>

            <section className="lg:col-span-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold">Last debrief</h2>
                <Link
                  to="/progress"
                  className="text-xs font-semibold no-underline"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  View history
                </Link>
              </div>

              <div className="flex-1">
                {debriefs.length > 0 ? (
                  <DebriefCard debrief={debriefs[0]} />
                ) : (
                  <EmptyState
                    title="No debriefs yet"
                    description="Complete your first mock interview to receive personalized mentor feedback."
                  />
                )}
              </div>
            </section>
          </div>

          {/* My Courses Shelf */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">My Courses</h2>
              <Link
                to="/tracks"
                className="text-xs font-semibold no-underline"
                style={{ color: 'var(--accent-primary)' }}
              >
                Explore all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledTracks.map((track) => (
                <CourseCard
                  key={track.id}
                  track={track}
                  actionLabel="Resume"
                  onSelect={(t) => navigate(`/lobby/${t.id}`)}
                />
              ))}
            </div>
          </section>

          {/* Free Courses / Free Practice Shelf */}
          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold">Free Courses / Free Practice</h2>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Open tracks you can practice anytime without limits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {freeTracks.map((track) => (
                <CourseCard
                  key={track.id}
                  track={track}
                  actionLabel="Start"
                  onSelect={(t) => navigate(`/lobby/${t.id}`)}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </AppLayout>
  );
}
