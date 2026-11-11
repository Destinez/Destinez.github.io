import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { registerSceneScroller, scrollToScene } from "../lib/dom";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Boundary } from "./Boundary";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { Projects } from "./Projects";
import { SCENE_BEATS, SCENE_ENDS, SCENE_STARTS, SCENE_TOTAL } from "./scenes";

const Terminal = lazy(() => import("./Terminal"));

function canPin(): boolean {
  return (
    window.matchMedia("(min-width: 1100px) and (hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function PinnedScene({
  id,
  progress,
  start,
  end,
  first,
  last,
  active,
  children,
}: {
  id: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  first: boolean;
  last: boolean;
  active: boolean;
  children: ReactNode;
}) {
  const fade = 0.045;
  const opacity = useTransform(
    progress,
    first
      ? [0, Math.max(end - fade, 0.001), end]
      : last
        ? [start, Math.min(start + fade, 0.98), 1]
        : [start, start + fade, Math.max(end - fade, start + fade + 0.01), end],
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const pointerEvents = useTransform(opacity, (value) => (value > 0.45 ? "auto" : "none"));

  return (
    <motion.section
      id={id}
      className="scene"
      aria-labelledby={`${id}-title`}
      style={{ opacity, pointerEvents }}
      aria-hidden={active ? undefined : true}
      inert={!active}
    >
      <div className="scene-body">{children}</div>
    </motion.section>
  );
}

export function Reel() {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(canPin);
  const firstId: string = SCENE_BEATS[0].id;
  const [activeId, setActiveId] = useState(firstId);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1100px) and (hover: hover) and (pointer: fine)");
    const update = () => setPinned(wide.matches && !reduced);
    update();
    wide.addEventListener("change", update);
    return () => wide.removeEventListener("change", update);
  }, [reduced]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!pinned) return;
    let next: string = SCENE_BEATS[0].id;
    SCENE_BEATS.forEach((scene, index) => {
      const start = SCENE_STARTS[index] ?? 0;
      const end = SCENE_ENDS[index] ?? 1;
      if (value >= start && value < end + 0.001) next = scene.id;
    });
    setActiveId((current) => (current === next ? current : next));
  });

  useEffect(() => {
    if (pinned) return;
    const nodes = SCENE_BEATS.map((scene) => document.getElementById(scene.id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) setActiveId(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.2, 0.5] },
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [pinned]);

  useEffect(() => {
    return registerSceneScroller((id, fraction = 0) => {
      const index = SCENE_BEATS.findIndex((scene) => scene.id === id);
      const track = trackRef.current;
      if (!pinned || !track || index < 0) {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      const start = SCENE_STARTS[index] ?? 0;
      const end = SCENE_ENDS[index] ?? start;
      const point = start + (end - start) * Math.min(1, Math.max(0, fraction));
      const distance = track.offsetHeight - window.innerHeight;
      const previous = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo({ top: track.offsetTop + point * distance, behavior: "auto" });
      document.documentElement.style.scrollBehavior = previous;
    });
  }, [pinned]);

  const workStart = SCENE_STARTS[1] ?? 0;
  const workEnd = SCENE_ENDS[1] ?? 1;
  const terminal = (
    <Boundary
      fallback={<p className="note">The terminal didn’t start. Email is on the next scene.</p>}
    >
      <Suspense fallback={<p className="note">Loading terminal…</p>}>
        <Terminal />
      </Suspense>
    </Boundary>
  );

  const projects = <Projects progress={scrollYProgress} range={[workStart, workEnd]} pinned={pinned} />;

  return (
    <>
      <Nav activeId={activeId} />
      <ol className="scene-meter">
        {SCENE_BEATS.map((scene, index) => (
          <li key={scene.id}>
            <button
              type="button"
              aria-label={`${scene.label}, scene ${index + 1} of ${SCENE_BEATS.length}`}
              aria-current={activeId === scene.id ? "true" : undefined}
              onClick={() => scrollToScene(scene.id)}
            />
          </li>
        ))}
      </ol>
      <div
        ref={trackRef}
        className={pinned ? "reel" : "scene-stack"}
        {...(pinned ? { style: { height: `${SCENE_TOTAL * 100}vh` } } : {})}
      >
        {pinned ? (
          <div className="stage">
            <ScrollRail progress={scrollYProgress} />
            {SCENE_BEATS.map((scene, index) => (
              <PinnedScene
                key={scene.id}
                id={scene.id}
                progress={scrollYProgress}
                start={SCENE_STARTS[index] ?? 0}
                end={SCENE_ENDS[index] ?? 1}
                first={index === 0}
                last={index === SCENE_BEATS.length - 1}
                active={activeId === scene.id}
              >
                {scene.id === "hero" ? <Hero /> : null}
                {scene.id === "work" ? projects : null}
                {scene.id === "path" ? <Experience /> : null}
                {scene.id === "terminal" ? terminal : null}
                {scene.id === "contact" ? <Contact /> : null}
              </PinnedScene>
            ))}
          </div>
        ) : (
          SCENE_BEATS.map((scene) => (
            <section key={scene.id} id={scene.id} className="scene" aria-labelledby={`${scene.id}-title`}>
              <div className="scene-body">
                {scene.id === "hero" ? <Hero /> : null}
                {scene.id === "work" ? projects : null}
                {scene.id === "path" ? <Experience /> : null}
                {scene.id === "terminal" ? terminal : null}
                {scene.id === "contact" ? <Contact /> : null}
              </div>
            </section>
          ))
        )}
      </div>
    </>
  );
}

function ScrollRail({ progress }: { progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
