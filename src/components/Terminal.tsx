import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import {
  applyHint,
  autocomplete,
  completeInput,
  runCommand,
  welcomeBlocks,
  type Block,
  type Segment,
} from "../lib/terminal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { SectionHeading } from "./ui";

const QUICK = ["help", "about", "projects", "experience", "skills", "contact", "resume", "clear"] as const;

function Segments({ segments }: { segments: readonly Segment[] }) {
  return segments.map((segment, index) => {
    if (segment.type === "link") {
      const external = segment.href.startsWith("http");
      return (
        <a
          key={index}
          href={segment.href}
          {...(external ? { target: "_blank" as const, rel: "noreferrer noopener" } : {})}
        >
          {segment.value}
        </a>
      );
    }
    if (segment.type === "text") return <span key={index}>{segment.value}</span>;
    return (
      <span key={index} className={`seg-${segment.type}`}>
        {segment.value}
      </span>
    );
  });
}

export default function Terminal() {
  const reduced = usePrefersReducedMotion();
  const [blocks, setBlocks] = useState<Block[]>(() => welcomeBlocks());
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const suggestion = autocomplete(value);
  const showHints =
    value.trim().length > 0 &&
    suggestion.matches.length > 0 &&
    !(suggestion.matches.length === 1 && suggestion.matches[0] === value.trim());

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }, [blocks]);

  function submit(raw: string) {
    const command = raw.trim();
    if (!command) {
      setBlocks((current) => [...current, { tone: "in", segments: [{ type: "text", value: "" }] }]);
      return;
    }
    const nextHistory = [...history, command];
    const result = runCommand(command, { history: nextHistory });
    setHistory(nextHistory);
    setHistIndex(-1);
    setDraft("");
    if (result.clear) {
      setBlocks([]);
    } else {
      setBlocks((current) => {
        const next = [
          ...current,
          { tone: "in" as const, segments: [{ type: "text" as const, value: command }] },
          ...result.blocks,
        ];
        return next.length > 400 ? next.slice(-400) : next;
      });
    }
    if (result.navigate) {
      document.querySelector(result.navigate)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
    setValue("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      const next = completeInput(value);
      setValue(next.next);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = histIndex < 0 ? history.length - 1 : Math.max(0, histIndex - 1);
      if (histIndex < 0) setDraft(value);
      setHistIndex(next);
      const command = history[next];
      if (command !== undefined) setValue(command);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (histIndex < 0) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(-1);
        setValue(draft);
      } else {
        setHistIndex(next);
        const command = history[next];
        if (command !== undefined) setValue(command);
      }
      return;
    }
    if (event.key === "c" && event.ctrlKey) {
      event.preventDefault();
      if (value) setValue("");
      else setBlocks((current) => [...current, { tone: "out", segments: [{ type: "dim", value: "^C" }] }]);
      return;
    }
    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setBlocks([]);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit(value);
  }

  return (
    <section className="section" id="terminal" aria-labelledby="terminal-title">
      <div className="shell">
        <SectionHeading
          id="terminal-title"
          index="06"
          kicker="Shell"
          title="Terminal"
          lede="Same facts as the rest of the page. Type a command, or use the buttons. Press ? anywhere else to focus this shell."
        />
        <div className="term">
          <div className="term-chrome">
            <span className="traffic" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>obaro@portfolio — shell</span>
          </div>
          <div ref={logRef} className="term-out" role="log" aria-relevant="additions" tabIndex={0}>
            {blocks.map((block, index) => (
              <div key={index} className={`term-line term-${block.tone}`}>
                {block.tone === "in" ? <span className="term-prompt">obaro@portfolio:~$ </span> : null}
                <Segments segments={block.segments} />
              </div>
            ))}
          </div>
          {showHints ? (
            <div id="terminal-hints" className="term-hints" role="group" aria-label="Completions">
              {suggestion.matches.slice(0, 16).map((match) => (
                <button
                  key={match}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setValue(applyHint(value, match));
                    inputRef.current?.focus();
                  }}
                >
                  {match}
                </button>
              ))}
            </div>
          ) : null}
          <div className="term-chips">
            {QUICK.map((command) => (
              <button key={command} type="button" onClick={() => submit(command)}>
                {command}
              </button>
            ))}
          </div>
          <form className="term-form" onSubmit={onSubmit}>
            <label className="term-prompt" htmlFor="terminal-input">
              obaro@portfolio:~$
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              className="term-input"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setHistIndex(-1);
              }}
              onKeyDown={onKeyDown}
              aria-describedby="terminal-help"
              {...(showHints ? { "aria-controls": "terminal-hints" } : {})}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoComplete="off"
              enterKeyHint="send"
            />
          </form>
          <p id="terminal-help" className="sr-only">
            Type a command and press Enter. Tab completes. Up and Down move through command history. Shift Tab leaves this field.
          </p>
        </div>
      </div>
    </section>
  );
}
