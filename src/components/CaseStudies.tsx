import { caseStudies } from "../data/content";
import { External, SectionHeading } from "./ui";

export default function CaseStudies() {
  return (
    <section className="section" id="cases" aria-labelledby="cases-title">
      <div className="shell">
        <SectionHeading
          id="cases-title"
          index="04"
          kicker="Engagements"
          title="Case studies"
          lede="Client and product work from the CV. These codebases are not public."
        />
        <div className="cases">
          {caseStudies.map((study, index) => (
            <article key={study.id} id={`case-${study.id}`} className="case">
              <p className="case-index">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3>{study.name}</h3>
                <p className="case-meta">
                  {study.role}
                  <span> · {study.company}</span>
                  <span> · {study.periodLabel}</span>
                </p>
                <p className="project-line">{study.oneLiner}</p>
                <p>{study.summary}</p>
                {study.productName ? (
                  <p className="note">
                    Product name {study.productName}
                    {study.productNameSource ? ` — ${study.productNameSource}` : ""}.
                  </p>
                ) : null}
                {study.relatedDelivery ? (
                  <>
                    <p className="note">Also in this role</p>
                    <ul className="bullets">
                      {study.relatedDelivery.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {study.stack ? (
                  <>
                    <ul className="chips">
                      {study.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {study.stackSource ? <p className="note">{study.stackSource}</p> : null}
                  </>
                ) : null}
                {study.liveUrl ? (
                  <p>
                    <External href={study.liveUrl}>{study.liveUrl.replace(/^https?:\/\//, "")}</External>
                  </p>
                ) : null}
                <p className="note">{study.urlNote}</p>
                {study.metrics.length > 0 ? (
                  <ul className="metrics">
                    {study.metrics.map((metric) => (
                      <li key={metric.label}>
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                        <small>
                          {metric.onCv
                            ? metric.source
                            : `${metric.source}${metric.guidance ? `. ${metric.guidance}` : ""}`}
                        </small>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {study.codeNote ? <p className="note">{study.codeNote}</p> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
