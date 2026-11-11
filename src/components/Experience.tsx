import { useState } from "react";
import { experience } from "../data/content";
import { experienceTabList } from "../data/editorFiles";
import { CodeEditor } from "./CodeEditor";
import { SectionHeading } from "./ui";

export function Experience() {
  const [activeId, setActiveId] = useState(experience[0]?.id ?? "freelance");

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="shell">
        <SectionHeading
          id="experience-title"
          index="02"
          kicker="Timeline"
          title="Experience"
          lede="Newest first. Dates and titles follow the CV."
        />
        <div className="exp-layout">
          <ol className="timeline">
            {experience.map((role) => {
              const selected = role.id === activeId;
              return (
                <li key={role.id} className={selected ? "role is-active" : "role"}>
                  <button type="button" aria-pressed={selected} onClick={() => setActiveId(role.id)}>
                    <span className="role-period">
                      {role.periodLabel}
                      {role.current ? <span className="now">Now</span> : null}
                    </span>
                    <span className="role-title">{role.title}</span>
                    <span className="role-company">
                      {role.company}
                      <span className="role-where"> · {role.location}</span>
                    </span>
                  </button>
                  <ul className="bullets">
                    {role.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {role.productName ? (
                    <p className="note">
                      Product name {role.productName}
                      {role.productNameSource ? ` — ${role.productNameSource}` : ""}.
                    </p>
                  ) : null}
                  {role.stackFromGithubReadme ? (
                    <ul className="chips" aria-label="Stack from the public GitHub profile">
                      {role.stackFromGithubReadme.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {role.stackSource ? <p className="note">{role.stackSource}</p> : null}
                  {role.codeNote ? <p className="note">{role.codeNote}</p> : null}
                  {role.attributedHeadcount ? (
                    <p className="note">
                      {role.attributedHeadcount.value} {role.attributedHeadcount.unit} — {role.attributedHeadcount.attribution}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <div className="exp-editor">
            <CodeEditor
              idBase="experience"
              label="Experience files"
              tabs={experienceTabList}
              activeId={activeId}
              onChange={setActiveId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
