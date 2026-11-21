import {
  ChevronDown,
  Flame,
  LogOut,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import type { UserPersona } from '../../mocks/types';

interface NavbarProps {
  user?: UserPersona | null;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onLogout?: () => void;
}

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/tracks', label: 'Tracks' },
  { to: '/progress', label: 'Progress' },
];

export function Navbar({
  user,
  searchQuery = '',
  onSearchChange,
  onLogout,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(localQuery);
    } else {
      navigate(`/tracks?q=${encodeURIComponent(localQuery.trim())}`);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-sm"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand + Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 font-bold text-base tracking-tight no-underline"
            style={{ color: 'var(--text-primary)' }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
              }}
            >
              <Sparkles className="w-4 h-4" />
            </span>
            <span>MockMaster</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline"
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? 'var(--accent-primary-soft)'
                    : 'transparent',
                  color: isActive
                    ? 'var(--accent-primary)'
                    : 'var(--text-secondary)',
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Center/Right: Search + Streak + Theme + User Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <form onSubmit={handleSearchSubmit} className="hidden sm:block relative">
            <Search
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="search"
              value={localQuery}
              onChange={(e) => {
                setLocalQuery(e.target.value);
                onSearchChange?.(e.target.value);
              }}
              placeholder="Search tracks or topics..."
              aria-label="Search tracks or topics"
              className="w-48 lg:w-64 pl-9 pr-3 py-1.5 text-sm rounded-lg border outline-none transition-colors"
              style={{
                backgroundColor: 'var(--bg-surface-subtle)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            />
          </form>

          {/* Streak Badge */}
          <div
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border"
            title="Current practice streak"
            style={{
              backgroundColor: 'var(--emerald-soft)',
              color: 'var(--emerald)',
              borderColor: 'var(--emerald-border)',
            }}
          >
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span className="tabular-nums">{user?.streakDays ?? 0}d</span>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => void toggleTheme()}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border cursor-pointer transition-colors"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                }}
              >
                {user?.avatarInitials ?? 'MM'}
              </span>
              <span className="hidden sm:inline text-sm font-medium">
                {user?.name ?? 'Guest'}
              </span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 rounded-xl border py-1.5 z-40"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {user && (
                  <div
                    className="px-3.5 py-2 border-b mb-1"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    <p
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {user.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {user.targetRole} · {user.role}
                    </p>
                  </div>
                )}

                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-3.5 py-2 text-sm no-underline transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <Settings className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  Settings & Persona
                </Link>

                <Link
                  to="/login"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout?.();
                  }}
                  role="menuitem"
                  className="flex items-center gap-2.5 px-3.5 py-2 text-sm no-underline transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <LogOut className="w-4 h-4" />
                  Switch Account / Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        className="flex md:hidden items-center gap-1 px-4 pb-2 overflow-x-auto"
        aria-label="Mobile Primary"
      >
        {NAV_LINKS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="px-3 py-1 rounded-lg text-xs font-medium no-underline whitespace-nowrap"
            style={({ isActive }) => ({
              backgroundColor: isActive
                ? 'var(--accent-primary-soft)'
                : 'transparent',
              color: isActive
                ? 'var(--accent-primary)'
                : 'var(--text-secondary)',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

