import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { Scene } from "@/components/Scene";
import { resetProgress } from "@/lib/progress";

export const Route = createFileRoute("/final")({ component: Final });

function Final() {
  const nav = useNavigate();
  const collageImages = useMemo(
    () => [
      "/images/collage/collage-1.jpeg",
      "/images/collage/collage-2.jpeg",
      "/images/collage/collage-3.jpeg",
      "/images/collage/collage-4.jpeg",
      "/images/collage/collage-5.jpeg",
      "/images/collage/collage-6.jpeg",
    ],
    [],
  );
  const collageLabels = useMemo(
    () => ["laughs", "dance", "class", "hangouts", "nonsense", "always"],
    [],
  );
  const photos = useMemo(
    () =>
      Array.from({ length: collageImages.length }, (_, i) => ({
        r: (Math.random() - 0.5) * 6,
        d: i * 0.08,
      })),
    [collageImages.length],
  );
  const confetti = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 2.2,
        duration: 3.2 + Math.random() * 2,
        hue: (i * 37) % 360,
        size: 6 + Math.random() * 6,
        tilt: (Math.random() - 0.5) * 30,
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
        <div className="confetti">
          {confetti.map((p, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                background: `hsl(${p.hue} 70% 60%)`,
                width: `${p.size}px`,
                height: `${p.size * 1.6}px`,
                transform: `rotate(${p.tilt}deg)`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 px-6 pt-10">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {photos.map((p, i) => (
              <div
                key={i}
                className="polaroid scene-enter group"
                style={{
                  width: "min(28vw, 240px)",
                  transform: `rotate(${p.r}deg)`,
                  animationDelay: `${p.d}s`,
                }}
              >
                <div className="frame relative overflow-hidden">
                  <img
                    src={collageImages[i]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-end justify-center bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
                    <span className="mb-3 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/85">
                      {collageLabels[i]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
