import { experienceStrip } from "../data/content";

export function Experience() {
  return (
    <div className="path-scene">
      <div className="scene-kicker">
        <p className="kicker">
          <span className="kicker-index">03</span>
          Path
        </p>
        <h2 id="path-title" className="scene-title">
          Experience
        </h2>
      </div>
      <div className="path-file">
        <div className="editor-chrome">
          <span className="traffic" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="editor-tab is-selected">path.ts</span>
        </div>
        <ol className="path-list">
          {experienceStrip.map((item, index) => (
            <li key={item.id}>
              <span className="ln" aria-hidden="true">
                {index + 1}
              </span>
              <span className="path-co">{item.company}</span>
              <span className="path-line">{item.line}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
