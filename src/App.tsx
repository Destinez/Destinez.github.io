import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { Reel } from "./components/Reel";
import { focusTerminal, scrollToScene } from "./lib/dom";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

function Shortcuts() {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "?") return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }
      event.preventDefault();
      scrollToScene("terminal");
      window.setTimeout(() => focusTerminal(), reduced ? 0 : 350);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#hero" onClick={(event) => {
        event.preventDefault();
        scrollToScene("hero");
      }}>
        Skip to content
      </a>
      <main id="main">
        <Reel />
      </main>
      <Shortcuts />
    </MotionConfig>
  );
}
