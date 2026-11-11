import { awards, certifications, education } from "../data/content";
import { SectionHeading } from "./ui";

export function Education() {
  return (
    <section className="section" id="education" aria-labelledby="education-title">
      <div className="shell">
        <SectionHeading id="education-title" index="07" kicker="Background" title="Education" />
        <div className="edu-grid">
          <article>
            <h3>Degree</h3>
            <ul className="plain-list">
              {education.map((item) => (
                <li key={item.abbreviation}>
                  <p className="edu-title">{item.degree}</p>
                  <p>
                    {item.institution} ({item.abbreviation})
                  </p>
                  <p className="note">{item.periodLabel}</p>
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Certifications</h3>
            <ul className="plain-list">
              {certifications.map((item) => (
                <li key={item.name}>
                  <p className="edu-title">{item.name}</p>
                  <p className="note">{item.issuer}</p>
                </li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Awards</h3>
            <ul className="plain-list">
              {awards.map((award) => (
                <li key={`${award.year}-${award.title}`}>
                  <p className="edu-title">
                    <span className="award-year">{award.year}</span>
                    {award.title}
                  </p>
                  {award.note ? <p className="note">{award.note}</p> : null}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
