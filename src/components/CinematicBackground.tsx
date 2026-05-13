import { useMemo } from "react";

export function CinematicBackground({ theme = "theme-purple" }: { theme?: string }) {
  const dust = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 1 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className={`cine-stage cine-vignette cine-grain ${theme}`} aria-hidden>
      <div className="cine-blob b1" />
      <div className="cine-blob b2" />
      <div className="cine-blob b3" />
      <div
        className="cine-bubble"
        style={{ width: 240, height: 240, left: "10%", top: "60%", animationDelay: "-4s" }}
      />
      <div
        className="cine-bubble"
        style={{ width: 160, height: 160, right: "15%", top: "20%", animationDelay: "-9s" }}
      />
      <div className="dust">
        {dust.map((d, i) => (
          <span
            key={i}
            style={{
              left: `${d.left}%`,
              width: d.size,
              height: d.size,
              animationDelay: `-${d.delay}s`,
              animationDuration: `${d.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
