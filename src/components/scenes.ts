export const SCENE_BEATS = [
  { id: "hero", label: "Intro", weight: 1 },
  { id: "work", label: "Work", weight: 1.65 },
  { id: "path", label: "Path", weight: 0.85 },
  { id: "terminal", label: "Shell", weight: 1 },
  { id: "contact", label: "Contact", weight: 0.75 },
] as const;

export const SCENE_TOTAL = SCENE_BEATS.reduce((sum, scene) => sum + scene.weight, 0);

export const SCENE_STARTS = SCENE_BEATS.map((_, index) => {
  const before = SCENE_BEATS.slice(0, index).reduce((sum, scene) => sum + scene.weight, 0);
  return before / SCENE_TOTAL;
});

export const SCENE_ENDS = SCENE_BEATS.map((scene, index) => {
  const start = SCENE_STARTS[index] ?? 0;
  return start + scene.weight / SCENE_TOTAL;
});
