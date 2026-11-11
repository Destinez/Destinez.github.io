type SceneScroller = (id: string, fraction?: number) => void;

let sceneScroller: SceneScroller | null = null;

export function registerSceneScroller(scroller: SceneScroller): () => void {
  sceneScroller = scroller;
  return () => {
    if (sceneScroller === scroller) sceneScroller = null;
  };
}

export function scrollToScene(id: string, fraction = 0): void {
  if (sceneScroller) {
    sceneScroller(id, fraction);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function focusTerminal(): void {
  const focusNow = () => {
    const input = document.getElementById("terminal-input");
    if (input instanceof HTMLInputElement) {
      input.focus();
      return true;
    }
    return false;
  };

  if (focusNow()) return;
  window.setTimeout(() => {
    focusNow();
  }, 280);
}
