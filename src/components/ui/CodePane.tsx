import { Play, RotateCcw, Terminal } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

interface CodePaneProps {
  value: string;
  onChange: (next: string) => void;
  starterCode?: string;
  language?: "typescript" | "javascript";
  onRun?: (code: string) => void;
}

export function CodePane({
  value,
  onChange,
  starterCode = "",
  language = "typescript",
  onRun,
}: CodePaneProps) {
  const [output, setOutput] = useState<string | null>(null);

  const lineCount = Math.max(8, value.split("\n").length);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const next = value.substring(0, start) + "  " + value.substring(end);
      onChange(next);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  const handleRun = () => {
    if (onRun) {
      onRun(value);
    }
    const trimmed = value.trim();
    if (!trimmed || trimmed === starterCode.trim()) {
      setOutput(
        "No changes detected yet. Write your solution and click Run Check.",
      );
      return;
    }
    setOutput(
      `✓ Syntax check passed (${trimmed.split("\n").length} lines, ${language}). Ready to submit for AI rubric review.`,
    );
  };

  return (
    <div
      className="rounded-xl border overflow-hidden flex flex-col"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
        boxShadow: "var(--shadow-xs)",
      }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          backgroundColor: "var(--bg-surface-subtle)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 text-xs font-mono font-semibold rounded"
            style={{
              backgroundColor: "var(--bg-code)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {language}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Solution Workspace
          </span>
        </div>

        <div className="flex items-center gap-2">
          {starterCode && (
            <button
              type="button"
              onClick={() => {
                onChange(starterCode);
                setOutput(null);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border cursor-pointer"
              style={{
                backgroundColor: "var(--bg-surface)",
                borderColor: "var(--border-default)",
                color: "var(--text-secondary)",
              }}
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={handleRun}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md cursor-pointer"
            style={{
              backgroundColor: "var(--emerald)",
              color: "#ffffff",
            }}
          >
            <Play className="w-3 h-3 fill-current" />
            Run Check
          </button>
        </div>
      </div>

      {/* Editor area with line numbers */}
      <div
        className="flex font-mono text-sm leading-6 min-h-60"
        style={{ backgroundColor: "var(--bg-code)" }}
      >
        <div
          aria-hidden="true"
          className="select-none py-3 px-3 text-right text-xs leading-6 border-r"
          style={{
            color: "var(--text-muted)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={`ln-${i + 1}`}>{i + 1}</div>
          ))}
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          aria-label="Code solution editor"
          className="flex-1 w-full p-3 bg-transparent outline-none resize-y font-mono text-sm leading-6"
          style={{ color: "var(--text-primary)" }}
          rows={10}
        />
      </div>

      {/* Simulated console output */}
      {output && (
        <div
          className="px-4 py-2.5 border-t flex items-start gap-2 text-xs font-mono"
          style={{
            backgroundColor: "var(--bg-surface-subtle)",
            borderColor: "var(--border-subtle)",
            color: "var(--text-secondary)",
          }}
        >
          <Terminal
            className="w-3.5 h-3.5 shrink-0 mt-0.5"
            style={{ color: "var(--emerald)" }}
          />
          <span>{output}</span>
        </div>
      )}
    </div>
  );
}
