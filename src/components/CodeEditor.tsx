import { useMemo, type KeyboardEvent } from "react";
import type { EditorFile } from "../data/editorFiles";
import { tokenize, type Token } from "../lib/highlight";
import { useTypewriter } from "../hooks/useTypewriter";

function Tokens({ tokens }: { tokens: readonly Token[] }) {
  return tokens.map((token, index) =>
    token.type === "plain" ? (
      <span key={index}>{token.value}</span>
    ) : (
      <span key={index} className={`tok tok-${token.type}`}>
        {token.value}
      </span>
    ),
  );
}

export function CodeEditor({
  idBase,
  label,
  tabs,
  activeId,
  onChange,
}: {
  idBase: string;
  label: string;
  tabs: readonly EditorFile[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const typed = useTypewriter(active?.code ?? "");
  const code = active?.code ?? "";
  const lang = active?.lang ?? "ts";

  const fullTokens = useMemo(() => code.split("\n").map((line) => tokenize(line, lang)), [code, lang]);

  if (!active) return null;

  const lines = code.split("\n");
  const typedLines = typed.text.split("\n");
  const activeLine = Math.max(0, typedLines.length - 1);

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    let next = index;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    const tab = tabs[next];
    if (!tab) return;
    onChange(tab.id);
    document.getElementById(`${idBase}-tab-${tab.id}`)?.focus();
  }

  return (
    <div className="editor">
      <div className="editor-chrome">
        <div className="traffic" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="editor-tabs" role="tablist" aria-label={label}>
          {tabs.map((tab, index) => {
            const selected = tab.id === active.id;
            return (
              <button
                key={tab.id}
                id={`${idBase}-tab-${tab.id}`}
                type="button"
                role="tab"
                className={selected ? "editor-tab is-selected" : "editor-tab"}
                aria-selected={selected}
                aria-controls={`${idBase}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => onChange(tab.id)}
                onKeyDown={(event) => onTabKey(event, index)}
              >
                {tab.filename}
              </button>
            );
          })}
        </div>
      </div>
      <div
        id={`${idBase}-panel`}
        className="editor-scroll"
        role="tabpanel"
        aria-labelledby={`${idBase}-tab-${active.id}`}
        tabIndex={0}
      >
        {lines.map((line, index) => {
          const partial = typedLines[index] ?? "";
          const tokens =
            index < activeLine ? (fullTokens[index] ?? tokenize(line, lang)) : index === activeLine ? tokenize(partial, lang) : [];
          const future = index > activeLine;
          return (
            <div className="editor-line" key={`${active.id}-${index}`}>
              <span className={future ? "ln is-future" : "ln"} aria-hidden="true">
                {index + 1}
              </span>
              <span className="editor-src">
                <Tokens tokens={tokens} />
                {index === activeLine && !typed.done ? <span className="caret" aria-hidden="true" /> : null}
              </span>
            </div>
          );
        })}
      </div>
      <div className="editor-status">
        <span>{active.filename}</span>
        <span>{lines.length} lines</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>Africa/Lagos</span>
      </div>
    </div>
  );
}
