import { motion } from "motion/react";
import { lazy, Suspense } from "react";
import { hero, pageHeroLine, person } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Boundary } from "./Boundary";

const HeroCanvas = lazy(() => import("./HeroCanvas"));
const ease = [0.22, 1, 0.36, 1] as const;

function Word({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const reduced = usePrefersReducedMotion();
  return (
    <span className={className} aria-hidden="true">
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="glyph"
          initial={reduced ? false : { opacity: 0, y: "0.4em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + index * 0.03, ease }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <div className="scene-hero">
      <Boundary fallback={null}>
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </Boundary>
      <div className="hero-shade" aria-hidden="true" />
      <div className="scene-copy">
        <p className="eyebrow">
          <span className="live-dot" aria-hidden="true" />
          {hero.role}
          <span className="eyebrow-sep">·</span>
          {person.location}
        </p>
        <h1 id="hero-title" className="scene-name">
          <span className="sr-only">{hero.name}</span>
          <span className="lockup" aria-hidden="true">
            <Word text="Obaro" delay={0.04} />
            <Word text="Destiny" delay={0.14} />
            <Word text="Udurie" delay={0.26} className="word-last" />
          </span>
        </h1>
        <p className="scene-line">{pageHeroLine}</p>
      </div>
    </div>
  );
}
