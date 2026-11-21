import { Award, Clock, Flame, Target } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DifficultyBadge,
  EmptyState,
  ErrorState,
  LoadingState,
  ProgressBar,
} from "../components";
import { AppLayout } from "../components/layout/AppLayout";
import { mockApi } from "../mocks/api";
import type { ProgressSummary } from "../mocks/types";

export function ProgressPage() {
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockApi.getMyProgress();
      setProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load progress.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Progress & History</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Track your 4-week consistency, mastery across interview pillars, and
            past scorecards.
          </p>
        </div>

        {loading ? (
          <LoadingState label="Loading analytics..." />
        ) : error || !progress ? (
          <ErrorState
            message={error ?? "Could not load progress."}
            onRetry={() => void loadProgress()}
          />
        ) : (
          <>
            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className="rounded-xl border p-5"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Current Streak
                  </span>
                  <Flame
                    className="w-4 h-4"
                    style={{ color: "var(--emerald)" }}
                  />
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  {progress.streakDays} days
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Weekly Goal
                  </span>
                  <Target
                    className="w-4 h-4"
                    style={{ color: "var(--accent-primary)" }}
                  />
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  {progress.weeklySessionsCompleted}/
                  {progress.weeklySessionTarget}
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Average Score
                  </span>
                  <Award
                    className="w-4 h-4"
                    style={{ color: "var(--emerald)" }}
                  />
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  {progress.averageScore}/100
                </p>
              </div>

              <div
                className="rounded-xl border p-5"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-xs font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Practice Time
                  </span>
                  <Clock
                    className="w-4 h-4"
                    style={{ color: "var(--accent-primary)" }}
                  />
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  {progress.totalMinutesPracticed} min
                </p>
              </div>
            </div>

            {/* 4-Week Consistency + Track Mastery */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <section
                className="lg:col-span-6 rounded-2xl border p-6 space-y-4"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <h2 className="text-base font-bold">4-Week Consistency</h2>
                <div className="grid grid-cols-4 gap-3 items-end h-44 pt-4">
                  {progress.weeklyHistory.map((wk) => {
                    const heightPct = Math.min(
                      100,
                      Math.round(
                        (wk.sessionsCompleted /
                          Math.max(1, wk.targetSessions)) *
                          100,
                      ),
                    );
                    return (
                      <div
                        key={wk.weekLabel}
                        className="flex flex-col items-center gap-2 h-full justify-end"
                      >
                        <span
                          className="text-xs font-semibold tabular-nums"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {wk.avgScore}%
                        </span>
                        <div
                          className="w-full max-w-12 rounded-t-lg transition-all"
                          style={{
                            height: `${Math.max(18, heightPct)}%`,
                            backgroundColor:
                              heightPct >= 80
                                ? "var(--emerald)"
                                : "var(--accent-primary)",
                          }}
                          title={`${wk.sessionsCompleted}/${wk.targetSessions} sessions`}
                        />
                        <span
                          className="text-[11px] text-center"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {wk.weekLabel.split(" ")[0]}{" "}
                          {wk.weekLabel.split(" ")[1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section
                className="lg:col-span-6 rounded-2xl border p-6 space-y-4"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                <h2 className="text-base font-bold">Track Mastery</h2>
                <div className="space-y-4">
                  {progress.trackMastery.map((tm) => (
                    <ProgressBar
                      key={tm.trackId}
                      value={tm.masteryPct}
                      label={`${tm.trackName} (${tm.sessionsCount} mocks · avg ${tm.avgScore})`}
                      tone={tm.masteryPct >= 75 ? "emerald" : "accent"}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Past Sessions Table */}
            <section
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <div
                className="px-6 py-4 border-b"
                style={{ borderColor: "var(--border-subtle)" }}
              >
                <h2 className="text-base font-bold">Past Sessions</h2>
              </div>

              {progress.recentSessions.length === 0 ? (
                <div className="p-6">
                  <EmptyState
                    title="No completed sessions yet"
                    description="Finish a mock interview to see your scorecards here."
                  />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr
                        className="border-b text-xs uppercase tracking-wider"
                        style={{
                          borderColor: "var(--border-subtle)",
                          color: "var(--text-muted)",
                          backgroundColor: "var(--bg-surface-subtle)",
                        }}
                      >
                        <th className="px-6 py-3 font-semibold">Track</th>
                        <th className="px-6 py-3 font-semibold">Difficulty</th>
                        <th className="px-6 py-3 font-semibold">Mode</th>
                        <th className="px-6 py-3 font-semibold">Score</th>
                        <th className="px-6 py-3 font-semibold">Date</th>
                        <th className="px-6 py-3 font-semibold text-right">
                          Scorecard
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="divide-y"
                      style={{ borderColor: "var(--border-subtle)" }}
                    >
                      {progress.recentSessions.map((sess) => (
                        <tr key={sess.id}>
                          <td className="px-6 py-3.5 font-medium">
                            {sess.trackName}
                          </td>
                          <td className="px-6 py-3.5">
                            <DifficultyBadge difficulty={sess.difficulty} />
                          </td>
                          <td
                            className="px-6 py-3.5 capitalize"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {sess.mode}
                          </td>
                          <td className="px-6 py-3.5 font-semibold tabular-nums">
                            {sess.scorecard?.overallScore ?? "—"}/100
                          </td>
                          <td
                            className="px-6 py-3.5 text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {(sess.completedAt ?? sess.startedAt).slice(0, 10)}
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <Link
                              to={`/scorecard/${sess.id}`}
                              className="text-xs font-semibold no-underline"
                              style={{ color: "var(--accent-primary)" }}
                            >
                              View Scorecard
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </AppLayout>
  );
}
