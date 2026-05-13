import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Scene } from "@/components/Scene";
import { resetProgress } from "@/lib/progress";

export const Route = createFileRoute("/final")({ component: Final });

function Final() {
  const nav = useNavigate();
  const photos = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        x: 5 + (i % 3) * 30 + (Math.random() - 0.5) * 8,
        y: 8 + Math.floor(i / 3) * 28 + (Math.random() - 0.5) * 6,
        r: (Math.random() - 0.5) * 14,
        d: i * 0.15,
      })),
    [],
  );

  const replay = () => {
    resetProgress();
    nav({ to: "/" });
  };

  return (
    <Scene theme="theme-blend">
      <div className="relative h-full w-full">
        <div className="pointer-events-none absolute inset-0">
          {photos.map((p, i) => (
            <div
              key={i}
              className="polaroid absolute scene-enter"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: "min(22vw, 180px)",
                transform: `rotate(${p.r}deg)`,
                animationDelay: `${p.d}s`,
              }}
            >
              <div className="frame">us</div>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-hand text-2xl text-white/65">and that's a wrap.</p>
          <h1 className="mt-2 text-5xl text-white md:text-7xl">happy birthday.</h1>
          <p className="mt-4 max-w-md text-white/65">
            Here's to more chapters, louder laughs, and quieter mornings.
          </p>
          <button onClick={replay} className="cine-btn mt-10">
            replay the film ↺
          </button>
        </div>
      </div>
    </Scene>
  );
}
