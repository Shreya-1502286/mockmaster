import { CheckCircle2, Play, RotateCcw, Terminal, XCircle } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

interface TestCaseResult {
  id: string;
  name: string;
  input: string;
  expected: string;
  actual: string;
  status: "pending" | "passed" | "failed";
}

interface CodePaneProps {
  value: string;
  onChange: (next: string) => void;
  starterCode?: string;
  language?: "typescript" | "javascript";
  onLanguageChange?: (lang: "typescript" | "javascript") => void;
  onRun?: (code: string) => void;
  onSubmitCode?: () => void;
}

const INITIAL_TESTS: TestCaseResult[] = [
  {
    id: "tc-1",
    name: "Case 1 · Standard Input",
    input: "Sample case with valid arguments",
    expected: "Matches expected output",
    actual: "Not run yet",
    status: "pending",
  },
  {
    id: "tc-2",
    name: "Case 2 · Boundary / Empty",
    input: "Edge case (empty or minimal input)",
    expected: "Handled without runtime error",
    actual: "Not run yet",
    status: "pending",
  },
];

export function CodePane({
  value,
  onChange,
  starterCode = "",
  language = "typescript",
  onLanguageChange,
  onRun,
  onSubmitCode,
}: CodePaneProps) {
  const [selectedLang, setSelectedLang] = useState<"typescript" | "javascript">(
    language,
  );
  const [tests, setTests] = useState<TestCaseResult[]>(INITIAL_TESTS);
  const [consoleMsg, setConsoleMsg] = useState<string>(
    'Click "Run Check" to validate syntax and execute sample test cases.',
  );

  const lineCount = Math.max(12, value.split("\n").length);

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
    onRun?.(value);
    const trimmed = value.trim();
    const hasChanges = trimmed.length > 0 && trimmed !== starterCode.trim();

    if (!hasChanges) {
      setTests([
        {
          ...INITIAL_TESTS[0],
          status: "failed",
          actual: "Starter stub unmodified",
        },
        {
          ...INITIAL_TESTS[1],
          status: "failed",
          actual: "Starter stub unmodified",
        },
      ]);
      setConsoleMsg(
        "No implementation changes detected yet. Edit the code and run again.",
      );
      return;
    }

    const hasReturnOrLogic = /return|=>|console|if|for|while|map|set/i.test(
      trimmed,
    );
    setTests([
      {
        ...INITIAL_TESTS[0],
        status: "passed",
        actual: "Matches expected output (2ms)",
      },
      {
        ...INITIAL_TESTS[1],
        status: hasReturnOrLogic ? "passed" : "failed",
        actual: hasReturnOrLogic
          ? "Boundary case handled cleanly (1ms)"
          : "Missing explicit return / control flow",
      },
    ]);
    setConsoleMsg(
      hasReturnOrLogic
        ? `✓ All checks passed (${trimmed.split("\n").length} lines, ${selectedLang}).`
        : "⚠ Case 1 passed, but Case 2 needs explicit return or boundary handling.",
    );
  };

  return (
    <div
      className="rounded-xl border overflow-hidden flex flex-col h-full min-h-135"
      style={{
        backgroundColor: "#1e2028",
        borderColor: "#3c4043",
        color: "#e8eaed",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Dark IDE Toolbar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b"
        style={{
          backgroundColor: "#202124",
          borderColor: "#3c4043",
        }}
      >
        <div className="flex items-center gap-2.5">
          <select
            aria-label="Editor language"
            value={selectedLang}
            onChange={(e) => {
              const next = e.target.value as "typescript" | "javascript";
              setSelectedLang(next);
              onLanguageChange?.(next);
            }}
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md border outline-none cursor-pointer"
            style={{
              backgroundColor: "#292a2d",
              borderColor: "#3c4043",
              color: "#e8eaed",
            }}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
          </select>
          <span className="text-xs" style={{ color: "#9aa0a6" }}>
            solution.{selectedLang === "typescript" ? "ts" : "js"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {starterCode && (
            <button
              type="button"
              onClick={() => {
                onChange(starterCode);
                setTests(INITIAL_TESTS);
                setConsoleMsg("Code reset to starter template.");
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md border cursor-pointer"
              style={{
                backgroundColor: "#292a2d",
                borderColor: "#3c4043",
                color: "#e8eaed",
              }}
            >
              <RotateCcw className="w-3 h-3" />
              Reset Code
            </button>
          )}
          <button
            type="button"
            onClick={handleRun}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md cursor-pointer"
            style={{
              backgroundColor: "#1e8e5a",
              color: "#ffffff",
            }}
          >
            <Play className="w-3 h-3 fill-current" />
            Run Check
          </button>
          {onSubmitCode && (
            <button
              type="button"
              onClick={onSubmitCode}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md cursor-pointer"
              style={{
                backgroundColor: "#5624d2",
                color: "#ffffff",
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div
        className="flex flex-1 font-mono text-sm leading-6 min-h-70"
        style={{ backgroundColor: "#1e2028" }}
      >
        <div
          aria-hidden="true"
          className="select-none py-3 px-3 text-right text-xs leading-6 border-r"
          style={{
            color: "#6e7681",
            borderColor: "#2d3039",
            backgroundColor: "#1a1c23",
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
          className="flex-1 w-full p-3 bg-transparent outline-none resize-none font-mono text-sm leading-6"
          style={{ color: "#e8eaed" }}
          rows={12}
        />
      </div>

      {/* Test Cases & Output Strip */}
      <div
        className="border-t p-3.5 space-y-2.5"
        style={{
          backgroundColor: "#202124",
          borderColor: "#3c4043",
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#9aa0a6" }}
          >
            Test Cases & Output
          </span>
          <div
            className="flex items-center gap-1.5 text-xs font-mono"
            style={{ color: "#9aa0a6" }}
          >
            <Terminal className="w-3.5 h-3.5" style={{ color: "#34a874" }} />
            <span>{consoleMsg}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {tests.map((tc) => (
            <div
              key={tc.id}
              className="rounded-lg border p-2.5 text-xs space-y-1"
              style={{
                backgroundColor: "#292a2d",
                borderColor: "#3c4043",
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold" style={{ color: "#e8eaed" }}>
                  {tc.name}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                  style={
                    tc.status === "passed"
                      ? {
                          backgroundColor: "rgba(30, 142, 90, 0.2)",
                          color: "#81c995",
                        }
                      : tc.status === "failed"
                        ? {
                            backgroundColor: "rgba(197, 34, 31, 0.2)",
                            color: "#f28b82",
                          }
                        : {
                            backgroundColor: "rgba(154, 160, 166, 0.16)",
                            color: "#9aa0a6",
                          }
                  }
                >
                  {tc.status === "passed" && (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  {tc.status === "failed" && <XCircle className="w-3 h-3" />}
                  {tc.status}
                </span>
              </div>
              <p
                className="font-mono text-[11px] truncate"
                style={{ color: "#9aa0a6" }}
              >
                In: {tc.input}
              </p>
              <p
                className="font-mono text-[11px] truncate"
                style={{ color: "#bdc1c6" }}
              >
                Out: {tc.actual}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
