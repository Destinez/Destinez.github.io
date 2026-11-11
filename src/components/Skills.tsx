import { coreSkills } from "../data/content";
import { SectionHeading } from "./ui";

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <SectionHeading
          id="skills-title"
          index="05"
          kicker="Stack"
          title="Skills"
          lede="From the CV and the public GitHub profile. Libraries that show up in a single repo stay on that project card."
        />
        <div className="skill-grid">
          {coreSkills.map((group) => (
            <article key={group.group} className="skill-card">
              <header>
                <h3>{group.group}</h3>
                <span>{group.items.length}</span>
              </header>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {group.sourceNote ? <p className="note">{group.sourceNote}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
