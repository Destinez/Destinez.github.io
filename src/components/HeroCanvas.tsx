import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer = { x: 0.72, y: 0.42 };
    const target = { x: 0.72, y: 0.42 };
    let frame = 0;
    let running = false;
    let onscreen = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width < 2 || height < 2) return;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const filament = (width: number, height: number, index: number, time: number) => {
      const y = height * (0.16 + index * 0.13);
      const swing = height * 0.07;
      context.beginPath();
      context.moveTo(-30, y);
      context.bezierCurveTo(
        width * 0.25,
        y + Math.sin(time * 0.33 + index) * swing,
        width * 0.62,
        y + Math.cos(time * 0.27 + index * 1.3) * swing + (pointer.y - 0.5) * 36,
        width + 30,
        y + Math.sin(time * 0.21 + index * 0.6) * 24,
      );
    };

    const draw = (time: number) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width < 2 || height < 2) return;
      pointer.x += (target.x - pointer.x) * 0.06;
      pointer.y += (target.y - pointer.y) * 0.06;
      context.clearRect(0, 0, width, height);

      const glow = context.createRadialGradient(
        width * pointer.x,
        height * pointer.y,
        0,
        width * pointer.x,
        height * pointer.y,
        width * 0.48,
      );
      glow.addColorStop(0, "rgba(255, 106, 61, 0.18)");
      glow.addColorStop(0.42, "rgba(195, 182, 255, 0.07)");
      glow.addColorStop(1, "rgba(9, 8, 12, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const seconds = reduced ? 1.4 : time / 1000;
      const count = width < 720 ? 4 : 6;
      for (let index = 0; index < count; index += 1) {
        const ember = index % 2 === 0;
        filament(width, height, index, seconds);
        context.lineWidth = 7;
        context.strokeStyle = ember ? "rgba(255, 106, 61, 0.05)" : "rgba(231, 177, 90, 0.05)";
        context.stroke();
        context.lineWidth = ember ? 1.35 : 1;
        context.strokeStyle = ember ? "rgba(255, 106, 61, 0.38)" : "rgba(231, 177, 90, 0.42)";
        context.stroke();
      }

      const cx = width * (0.74 + (pointer.x - 0.72) * 0.08);
      const cy = height * (0.46 + (pointer.y - 0.42) * 0.08);
      for (let index = 0; index < 3; index += 1) {
        const rx = width * (0.12 + index * 0.075);
        const ry = height * (0.16 + index * 0.07);
        context.beginPath();
        context.ellipse(cx, cy, rx, ry, seconds * 0.05 + index * 0.4, 0, Math.PI * 2);
        context.strokeStyle = index === 1 ? "rgba(195, 182, 255, 0.4)" : "rgba(246, 226, 184, 0.32)";
        context.lineWidth = 1;
        context.stroke();
        const angle = seconds * (0.35 + index * 0.12) + index;
        context.beginPath();
        context.fillStyle = index === 1 ? "#c3b6ff" : "#f6e2b8";
        context.arc(cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry, 2.5, 0, Math.PI * 2);
        context.fill();
      }

      const motes = width < 720 ? 14 : 26;
      for (let index = 0; index < motes; index += 1) {
        const seed = index * 12.9898;
        const x = ((Math.sin(seed) * 0.5 + 0.5) * width + seconds * (10 + (index % 4) * 4)) % width;
        const y = (Math.cos(seed * 1.7) * 0.5 + 0.5) * height;
        context.beginPath();
        context.fillStyle = index % 3 === 0 ? "rgba(255, 106, 61, 0.7)" : "rgba(246, 226, 184, 0.55)";
        context.arc(x, y, index % 5 === 0 ? 1.6 : 1, 0, Math.PI * 2);
        context.fill();
      }
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const loop = (time: number) => {
      if (!running) return;
      if (onscreen && !document.hidden) draw(time);
      frame = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = window.requestAnimationFrame(loop);
    };

    resize();
    draw(0);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced || !running) draw(0);
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry?.isIntersecting ?? false;
        if (onscreen) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    intersection.observe(canvas);

    const onMove = (event: PointerEvent) => {
      if (reduced) return;
      const rect = canvas.getBoundingClientRect();
      target.x = (event.clientX - rect.left) / rect.width;
      target.y = (event.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduced) start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
