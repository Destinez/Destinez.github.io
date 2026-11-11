import { MotionConfig } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { About } from "./components/About";
import { Boundary } from "./components/Boundary";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { focusTerminal } from "./lib/dom";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const CaseStudies = lazy(() => import("./components/CaseStudies"));
const Terminal = lazy(() => import("./components/Terminal"));

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}

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
      document.getElementById("terminal")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
      focusTerminal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced]);

  return null;
}

function SectionFallback({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} className="section" aria-busy="true">
      <div className="shell">
        <p role="status" className="note">
          Loading {label}…
        </p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Boundary fallback={<SectionFallback id="cases" label="case studies" />}>
          <Suspense fallback={<SectionFallback id="cases" label="case studies" />}>
            <CaseStudies />
          </Suspense>
        </Boundary>
        <Skills />
        <Boundary
          fallback={
            <section id="terminal" className="section">
              <div className="shell">
                <p>The terminal didn’t start. The rest of the page is still here.</p>
              </div>
            </section>
          }
        >
          <Suspense fallback={<SectionFallback id="terminal" label="terminal" />}>
            <Terminal />
          </Suspense>
        </Boundary>
        <Education />
        <Contact />
      </main>
      <Footer />
      <Shortcuts />
    </MotionConfig>
  );
}
