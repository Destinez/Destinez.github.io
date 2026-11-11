import { useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { pageProjects } from "../data/content";
import { scrollToScene } from "../lib/dom";
import { External } from "./ui";

export function Projects({
  progress,
  range,
  pinned,
}: {
  progress: MotionValue<number>;
  range: readonly [number, number];
  pinned: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const step = useMotionValue(420);
  const t = useTransform(progress, [range[0], range[1]], [0, 1]);
  const x = useTransform([t, step], (latest) => {
    const value = typeof latest[0] === "number" ? latest[0] : 0;
    const distance = typeof latest[1] === "number" ? latest[1] : 0;
    return pinned ? -distance * (pageProjects.length - 1) * value : 0;
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(t, "change", (value) => {
    if (!pinned) return;
    const next = Math.min(pageProjects.length - 1, Math.max(0, Math.round(value * (pageProjects.length - 1))));
    setActive((current) => (current === next ? current : next));
  });

  useEffect(() => {
    const measure = () => {
      const card = rowRef.current?.querySelector<HTMLElement>(".spot");
      if (!card || !rowRef.current) return;
      const styles = window.getComputedStyle(rowRef.current);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
      step.set(card.offsetWidth + gap);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [step]);

  return (
    <div className="work-scene">
      <div className="scene-kicker">
        <p className="kicker">
          <span className="kicker-index">02</span>
          Work
        </p>
        <h2 id="work-title" className="scene-title">
          Three builds
        </h2>
      </div>
      <div className="editor-chrome work-tabs" role="tablist" aria-label="Projects">
        <span className="traffic" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {pageProjects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            className={index === active ? "editor-tab is-selected" : "editor-tab"}
            aria-selected={index === active}
            onClick={() => {
              setActive(index);
              if (pinned) {
                const fraction = pageProjects.length === 1 ? 0 : index / (pageProjects.length - 1);
                scrollToScene("work", fraction);
              } else {
                document.getElementById(`spot-${project.id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }
            }}
          >
            {project.name}
          </button>
        ))}
      </div>
      <div className="spot-viewport">
        <motion.div ref={rowRef} className={pinned ? "spot-row is-scrub" : "spot-row"} style={{ x }}>
          {pageProjects.map((project, index) => (
            <article key={project.id} id={`spot-${project.id}`} className={index === active ? "spot is-on" : "spot"}>
              <p className="project-kicker">
                <span>{String(index + 1).padStart(2, "0")}</span>
                {project.status ? <span className="label-flag">{project.status}</span> : <span>Public</span>}
              </p>
              <h3>{project.name}</h3>
              <p className="project-line">{project.oneLiner}</p>
              {project.chips.length > 0 ? (
                <ul className="chips">
                  {project.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              ) : null}
              <div className="project-links">
                {project.repoUrl ? (
                  <External href={project.repoUrl}>
                    Repository <span aria-hidden="true">↗</span>
                  </External>
                ) : null}
                {project.liveUrl ? (
                  <External href={project.liveUrl}>
                    Live site <span aria-hidden="true">↗</span>
                  </External>
                ) : null}
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
