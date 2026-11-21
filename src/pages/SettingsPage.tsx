import { Check, Moon, RotateCcw, Save, Sun } from 'lucide-react';
import { useState } from 'react';
import { LoadingState } from '../components';
import { AppLayout } from '../components/layout/AppLayout';
import { useTheme } from '../context/useTheme';
import { useUser } from '../context/useUser';
import { mockApi } from '../mocks/api';
import type { Difficulty, PersonaRole, UserPersona } from '../mocks/types';

function SettingsForm({
  user,
  refreshUser,
}: {
  user: UserPersona;
  refreshUser: () => Promise<void>;
}) {
  const { theme, setTheme } = useTheme();

  const [personaRole, setPersonaRole] = useState<PersonaRole>(user.settings.personaRole);
  const [targetRole, setTargetRole] = useState(user.settings.targetRole);
  const [weeklySessionTarget, setWeeklySessionTarget] = useState(user.settings.weeklySessionTarget);
  const [preferredDifficulty, setPreferredDifficulty] = useState<Difficulty>(user.settings.preferredDifficulty);
  const [pacingMinutes, setPacingMinutes] = useState(user.settings.pacingMinutes);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedToast(false);
    try {
      await mockApi.patchMySettings({
        personaRole,
        targetRole,
        weeklySessionTarget,
        preferredDifficulty,
        pacingMinutes,
        theme,
      });
      await refreshUser();
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleResetDemo = async () => {
    mockApi.resetMockStore();
    await refreshUser();
    await setTheme('light');
  };

  return (
    <form
      onSubmit={(e) => void handleSave(e)}
      className="rounded-2xl border p-6 space-y-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Theme Toggle */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          Appearance
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => void setTheme('light')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer"
            style={
              theme === 'light'
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
            <Sun className="w-4 h-4" />
            Light Mode
          </button>
          <button
            type="button"
            onClick={() => void setTheme('dark')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer"
            style={
              theme === 'dark'
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
            <Moon className="w-4 h-4" />
            Dark Mode
          </button>
        </div>
      </div>

      {/* Persona & Target Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="settings-role"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            Experience Level
          </label>
          <select
            id="settings-role"
            value={personaRole}
            onChange={(e) => setPersonaRole(e.target.value as PersonaRole)}
            className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="fresher">Fresher (0–1 yrs)</option>
            <option value="professional">Working Professional (2+ yrs)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="settings-target"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            Target Role
          </label>
          <input
            id="settings-target"
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      </div>

      {/* Weekly Target & Defaults */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="settings-weekly"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            Weekly Sessions Goal
          </label>
          <input
            id="settings-weekly"
            type="number"
            min={1}
            max={7}
            value={weeklySessionTarget}
            onChange={(e) => setWeeklySessionTarget(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="settings-diff"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            Default Difficulty
          </label>
          <select
            id="settings-diff"
            value={preferredDifficulty}
            onChange={(e) => setPreferredDifficulty(e.target.value as Difficulty)}
            className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="settings-pacing"
            className="block text-xs font-semibold mb-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            Default Pacing (min)
          </label>
          <select
            id="settings-pacing"
            value={pacingMinutes}
            onChange={(e) => setPacingMinutes(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm rounded-lg border outline-none"
            style={{
              backgroundColor: 'var(--bg-surface-subtle)',
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <option value={15}>15 min</option>
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
          type="button"
          onClick={() => void handleResetDemo()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
            color: 'var(--text-secondary)',
          }}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>

        <div className="flex items-center gap-3">
          {savedToast && (
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold"
              style={{ color: 'var(--emerald)' }}
            >
              <Check className="w-3.5 h-3.5" />
              Saved
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-lg cursor-pointer"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
            }}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </form>
  );
}

export function SettingsPage() {
  const { user, loading, refreshUser } = useUser();

  return (
    <AppLayout>
      {loading || !user ? (
        <LoadingState label="Loading settings..." />
      ) : (
        <div className="max-w-2xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Settings</h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Customize your target role, theme preference, and weekly interview goal.
            </p>
          </div>

          <SettingsForm key={user.id} user={user} refreshUser={refreshUser} />
        </div>
      )}
    </AppLayout>
  );
}
