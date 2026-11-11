import { useState } from "react";
import { projects } from "../data/content";
import { External, Reveal, SectionHeading } from "./ui";

function repoLabel(url: string): string {
  return url.replace(/^https?:\/\/github\.com\//, "");
}

export function Projects() {
  const languages = ["All", ...Array.from(new Set(projects.map((project) => project.language)))];
  const [language, setLanguage] = useState("All");
  const visible = projects.filter((project) => language === "All" || project.language === language);

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="shell">
        <SectionHeading
          id="projects-title"
          index="03"
          kicker="GitHub"
          title="Projects"
          lede="Six public repositories. The profile README isn’t listed — it isn’t a product."
        />
        <div className="filters" role="group" aria-label="Filter by language">
          {languages.map((item) => (
            <button
              key={item}
              type="button"
              className={item === language ? "chip-btn is-on" : "chip-btn"}
              aria-pressed={item === language}
              onClick={() => setLanguage(item)}
            >
              {item}
            </button>
          ))}
          <p className="filter-count">
            {visible.length} of {projects.length}
          </p>
        </div>
        <div className="project-grid">
          {visible.map((project) => (
            <Reveal key={project.id} className={project.rank === 1 ? "project-span" : undefined}>
              <article className={project.rank === 1 ? "project project-feature" : "project"}>
                <div>
                  <p className="project-kicker">
                    <span>{String(project.rank).padStart(2, "0")}</span>
                    {project.language}
                    {project.license ? <span>{project.license}</span> : null}
                  </p>
                  <h3>{project.name}</h3>
                  {project.label ? <p className="label-flag">{project.label}</p> : null}
                  <p className="project-line">{project.oneLiner}</p>
                  <p>{project.description}</p>
                  <ul className="chips">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="note">{project.featuredReason}</p>
                  {project.caveats ? (
                    <ul className="caveats">
                      {project.caveats.map((caveat) => (
                        <li key={caveat}>{caveat}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className="project-meta">
                  <p className="repo-path">{repoLabel(project.repoUrl)}</p>
                  <p className="note">Updated {project.lastUpdatedLagos}</p>
                  <div className="project-links">
                    <External href={project.repoUrl}>
                      Repository <span aria-hidden="true">↗</span>
                    </External>
                    {project.liveUrl ? (
                      <External href={project.liveUrl}>
                        Live site <span aria-hidden="true">↗</span>
                      </External>
                    ) : null}
                  </div>
                  {project.liveUrlNote ? <p className="note">{project.liveUrlNote}</p> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
