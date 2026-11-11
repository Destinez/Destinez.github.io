import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { coreSkills, hero, person } from "../data/content";
import { focusTerminal } from "../lib/dom";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Boundary } from "./Boundary";
import { Arrow } from "./ui";

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
          initial={reduced ? false : { opacity: 0, y: "0.45em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: delay + index * 0.028, ease }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState<number>(hero.preferredTaglineIndex);
  const [paused, setPaused] = useState(false);
  const line = hero.taglineOptions[index] ?? hero.taglineOptions[0] ?? "";
  const skills = coreSkills.flatMap((group) => [...group.items]);
  const marquee = reduced ? skills : [...skills, ...skills];

  useEffect(() => {
    if (reduced || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % hero.taglineOptions.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Boundary fallback={null}>
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </Boundary>
      <div className="hero-shade" aria-hidden="true" />
      <div className="frame" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="shell hero-copy">
        <p className="eyebrow">
          <span className="live-dot" aria-hidden="true" />
          {person.headlineLong}
          <span className="eyebrow-sep">·</span>
          {person.location}
        </p>
        <h1 id="hero-title">
          <span className="sr-only">{hero.name}</span>
          <span className="lockup" aria-hidden="true">
            <Word text="Obaro" delay={0.05} />
            <Word text="Destiny" delay={0.16} />
            <Word text="Udurie" delay={0.28} className="word-last" />
          </span>
        </h1>
        <p className="role-line">{hero.role}</p>
        <div className="tagline-slot">
          <AnimatePresence mode="wait">
            <motion.p
              key={line}
              className="tagline"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
            >
              {line}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="tagline-controls">
          {hero.taglineOptions.map((option, optionIndex) => (
            <button
              key={option}
              type="button"
              className={optionIndex === index ? "dot is-on" : "dot"}
              aria-label={`Show tagline ${optionIndex + 1} of ${hero.taglineOptions.length}`}
              aria-pressed={optionIndex === index}
              onClick={() => setIndex(optionIndex)}
            />
          ))}
          {reduced ? null : (
            <button
              type="button"
              className="pause"
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
            >
              {paused ? "Play tagline" : "Pause tagline"}
            </button>
          )}
        </div>
        <p className="support">{hero.supportingOneLiner}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">
            View projects <Arrow />
          </a>
          <a
            className="btn btn-ghost"
            href="#terminal"
            onClick={() => {
              window.setTimeout(() => focusTerminal(), 60);
            }}
          >
            Open terminal <Arrow />
          </a>
        </div>
        <p className="availability">{hero.availabilityLine}</p>
      </div>
      <div className={reduced ? "marquee is-static" : "marquee"} aria-hidden="true">
        <div className="marquee-track">
          {marquee.map((item, itemIndex) => (
            <span key={`${item}-${itemIndex}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
