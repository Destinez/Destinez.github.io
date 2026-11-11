import { useState } from "react";
import { about, caseStudies, hero } from "../data/content";
import { aboutTabList } from "../data/editorFiles";
import { CodeEditor } from "./CodeEditor";
import { External, SectionHeading } from "./ui";

function Paragraph({ text }: { text: string }) {
  const apel = caseStudies.find((study) => study.id === "apel");
  const href = apel?.liveUrl;
  if (!href || !text.includes("apel.com.ng")) return <>{text}</>;
  const parts = text.split("apel.com.ng");
  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 ? <External href={href}>apel.com.ng</External> : null}
        </span>
      ))}
    </>
  );
}

export function About() {
  const [activeId, setActiveId] = useState(aboutTabList[0]?.id ?? "about");

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="shell">
        <SectionHeading id="about-title" index="01" kicker="Profile" title="About" lede={hero.supportingOneLiner} />
        <div className="split">
          <div className="prose">
            {about.firstPerson.map((paragraph) => (
              <p key={paragraph}>
                <Paragraph text={paragraph} />
              </p>
            ))}
            <p className="availability">{hero.availabilityLine}</p>
          </div>
          <CodeEditor
            idBase="about"
            label="About files"
            tabs={aboutTabList}
            activeId={activeId}
            onChange={setActiveId}
          />
        </div>
      </div>
    </section>
  );
}
