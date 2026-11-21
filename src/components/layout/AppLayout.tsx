import type { ReactNode } from 'react';
import { useUser } from '../../context/UserContext';
import { Navbar } from './Navbar';

interface AppLayoutProps {
  children: ReactNode;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function AppLayout({
  children,
  searchQuery,
  onSearchChange,
}: AppLayoutProps) {
  const { user, logout } = useUser();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
      }}
    >
      <Navbar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onLogout={logout}
      />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}

