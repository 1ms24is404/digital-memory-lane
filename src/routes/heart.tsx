import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Scene } from "@/components/Scene";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/heart")({ component: HeartGame });

function HeartGame() {
  const nav = useNavigate();
  const [clicks, setClicks] = useState(0);
  const [bursting, setBursting] = useState(false);
  const [floats, setFloats] = useState<number[]>([]);
  const MAX = 12;

  const click = () => {
    if (bursting) return;
    const next = Math.min(MAX, clicks + 1);
    setClicks(next);
    setFloats((f) => [...f, Date.now()]);
    if (next >= MAX) {
      setBursting(true);
      setTimeout(() => nav({ to: "/letter" }), 1600);
    }
  };

  const scale = 1 + (clicks / MAX) * 1.8;

  return (
    <Scene theme="theme-red">
      <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="font-hand text-xl text-white/60">tap, gently</p>
        <h1 className="mt-1 text-4xl text-white md:text-5xl">until it's full</h1>

        <div className="relative mt-16 flex h-64 w-64 items-center justify-center">
          {floats.slice(-8).map((id, i) => (
            <Heart
              key={id}
              size={20}
              className="absolute float-heart text-rose-300"
              style={{ left: `${30 + Math.random() * 40}%`, fill: "currentColor", animationDelay: `${i * 0.05}s` }}
            />
          ))}
          <button
            onClick={click}
            className="heartbeat transition-transform duration-500"
            style={{ transform: `scale(${scale}) ${bursting ? "scale(0)" : ""}`, opacity: bursting ? 0 : 1 }}
            aria-label="heart"
          >
            <Heart
              size={96}
              className="text-rose-400 drop-shadow-[0_0_30px_rgba(244,114,182,0.6)]"
              fill="currentColor"
            />
          </button>
        </div>

        <p className="mt-8 text-sm tracking-widest text-white/45">
          {bursting ? "…" : `${clicks} / ${MAX}`}
        </p>
      </div>
    </Scene>
  );
}
