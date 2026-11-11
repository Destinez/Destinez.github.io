import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useTypewriter(source: string): { text: string; done: boolean } {
  const reduced = usePrefersReducedMotion();
  const seen = useRef(new Set<string>());
  const [state, setState] = useState(() => ({
    source,
    count: reduced ? source.length : 0,
  }));

  if (state.source !== source) {
    setState({
      source,
      count: reduced || seen.current.has(source) ? source.length : 0,
    });
  }

  useEffect(() => {
    if (reduced || seen.current.has(source)) {
      return;
    }

    let count = 0;
    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      if (now - last >= 16) {
        last = now;
        const step = Math.max(4, Math.ceil(source.length / 80));
        count = Math.min(source.length, count + step);
        setState({ source, count });
        if (count >= source.length) {
          seen.current.add(source);
          return;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduced, source]);

  return {
    text: source.slice(0, state.count),
    done: state.count >= source.length,
  };
}
