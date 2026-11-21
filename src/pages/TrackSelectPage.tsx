import { Filter } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CourseCard,
  DifficultyBadge,
  EmptyState,
  ErrorState,
  LoadingState,
} from '../components';
import { AppLayout } from '../components/layout/AppLayout';
import { mockApi } from '../mocks/api';
import type { Difficulty, Question, Track, TrackId } from '../mocks/types';

type StatusFilter = 'all' | 'free' | 'in_progress';

export function TrackSelectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTrack, setSelectedTrack] = useState<TrackId | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [tracksData, questionsData] = await Promise.all([
        mockApi.getTracks(),
        mockApi.getQuestions(),
      ]);
      setTracks(tracksData);
      setQuestions(questionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tracks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleSearchChange = (next: string) => {
    setQuery(next);
    if (next.trim()) {
      setSearchParams({ q: next });
    } else {
      setSearchParams({});
    }
  };

  const filteredTracks = useMemo(() => {
    return tracks.filter((t) => {
      if (selectedTrack !== 'all' && t.id !== selectedTrack) return false;
      if (statusFilter === 'free' && !t.isFree) return false;
      if (statusFilter === 'in_progress' && !t.isEnrolled) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${t.name} ${t.shortName} ${t.description} ${t.tags.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tracks, selectedTrack, statusFilter, query]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedTrack !== 'all' && q.trackId !== selectedTrack) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (query.trim()) {
        const needle = query.trim().toLowerCase();
        if (!`${q.title} ${q.prompt}`.toLowerCase().includes(needle)) return false;
      }
      return true;
    });
  }, [questions, selectedTrack, selectedDifficulty, query]);

  return (
    <AppLayout searchQuery={query} onSearchChange={handleSearchChange}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Interview Tracks</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Filter by track, difficulty, or free access and launch a tailored mock session.
          </p>
        </div>

        {/* Filters Bar */}
        <div
          className="rounded-xl border p-4 flex flex-wrap items-center gap-4"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            <Filter className="w-3.5 h-3.5" />
            Filters:
          </div>

          <select
            aria-label="Filter by track"
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value as TrackId | 'all')}
            className="px-3 py-1.5 text-sm rounded-lg border outline-none"
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="all">All Tracks</option>
            <option value="dsa">DSA</option>
            <option value="frontend">Frontend</option>
            <option value="behavioral">Behavioral</option>
            <option value="system-design">System Design</option>
          </select>

          <select
            aria-label="Filter by difficulty"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as Difficulty | 'all')}
            className="px-3 py-1.5 text-sm rounded-lg border outline-none"
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <div className="flex items-center gap-1.5">
            {(['all', 'free', 'in_progress'] as StatusFilter[]).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition-colors"
                style={
                  statusFilter === status
                    ? {
                        backgroundColor: 'var(--accent-primary-soft)',
                        borderColor: 'var(--accent-primary-border)',
                        color: 'var(--accent-primary)',
                      }
                    : {
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-secondary)',
                      }
                }
              >
                {status === 'all' ? 'All' : status === 'free' ? 'Free' : 'In Progress'}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingState label="Loading tracks & question bank..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => void loadData()} />
        ) : filteredTracks.length === 0 ? (
          <EmptyState
            title="No matching tracks"
            description="Try clearing your search or switching the status filter."
            action={
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack('all');
                  setSelectedDifficulty('all');
                  setStatusFilter('all');
                  handleSearchChange('');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                }}
              >
                Reset Filters
              </button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredTracks.map((track) => (
                <CourseCard
                  key={track.id}
                  track={track}
                  onSelect={(t) =>
                    navigate(
                      `/lobby/${t.id}${
                        selectedDifficulty !== 'all'
                          ? `?difficulty=${selectedDifficulty}`
                          : ''
                      }`
                    )
                  }
                />
              ))}
            </div>

            {/* Matching Question Preview */}
            <section className="space-y-3 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">
                  Question Bank Preview ({filteredQuestions.length})
                </h2>
              </div>

              <div
                className="rounded-xl border divide-y"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {filteredQuestions.slice(0, 8).map((q) => (
                  <div
                    key={q.id}
                    className="px-4 py-3 flex items-center justify-between gap-4"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{q.title}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {q.trackId.toUpperCase()} · {q.hints.length} hints
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <DifficultyBadge difficulty={q.difficulty} />
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/lobby/${q.trackId}?difficulty=${q.difficulty}`)
                        }
                        className="text-xs font-semibold cursor-pointer"
                        style={{ color: 'var(--accent-primary)' }}
                      >
                        Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </AppLayout>
  );
}

