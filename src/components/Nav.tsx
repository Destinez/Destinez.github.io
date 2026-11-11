import { person } from "../data/content";
import { scrollToScene } from "../lib/dom";
import { SCENE_BEATS } from "./scenes";

export function Nav({ activeId }: { activeId: string }) {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="logo" href="#hero" onClick={(event) => {
          event.preventDefault();
          scrollToScene("hero");
        }}>
          <span className="logo-mark" aria-hidden="true">
            OD
          </span>
          <span className="logo-name">{person.shortName}</span>
        </a>
        <nav className="scene-nav" aria-label="Scenes">
          {SCENE_BEATS.map((scene) => (
            <button
              key={scene.id}
              type="button"
              className={activeId === scene.id ? "scene-link is-on" : "scene-link"}
              aria-current={activeId === scene.id ? "true" : undefined}
              onClick={() => scrollToScene(scene.id)}
            >
              {scene.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
