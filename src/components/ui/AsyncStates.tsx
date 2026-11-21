import { AlertTriangle, Inbox, Loader2, RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

export function LoadingState({
  label = 'Loading...',
  compact = false,
}: {
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border ${
        compact ? 'py-8 px-4' : 'py-14 px-6'
      }`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <Loader2
        className="w-6 h-6 animate-spin mb-2.5"
        style={{ color: 'var(--accent-primary)' }}
      />
      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-xl border py-12 px-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
        style={{
          backgroundColor: 'var(--bg-surface-subtle)',
          color: 'var(--text-secondary)',
        }}
      >
        {icon ?? <Inbox className="w-5 h-5" />}
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-md mb-4" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      {action}
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-xl border py-10 px-6"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--status-danger-soft)',
      }}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
        style={{
          backgroundColor: 'var(--status-danger-soft)',
          color: 'var(--status-danger)',
        }}
      >
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-md mb-4" style={{ color: 'var(--text-secondary)' }}>
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border cursor-pointer transition-colors"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
            color: 'var(--text-primary)',
          }}
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  );
}

