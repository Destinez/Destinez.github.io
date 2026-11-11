import { motion } from "motion/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export function External({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer noopener">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  id,
  index,
  kicker,
  title,
  lede,
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lede?: ReactNode;
}) {
  return (
    <Reveal>
      <header className="section-head">
        <p className="kicker">
          <span className="kicker-index">{index}</span>
          {kicker}
        </p>
        <h2 id={id}>{title}</h2>
        {lede ? <div className="lede">{lede}</div> : null}
      </header>
    </Reveal>
  );
}
