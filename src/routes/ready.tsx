import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/ready")({ component: Ready });

function Ready() {
  const nav = useNavigate();
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const dodge = () => {
    setNoPos({
      x: (Math.random() - 0.5) * 240,
      y: (Math.random() - 0.5) * 160,
    });
  };

  return (
    <Scene theme="theme-purple">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="font-hand text-2xl text-white/60">a small question,</p>
        <h1 className="mt-3 text-5xl text-white md:text-7xl">are you ready?</h1>
        <p className="mt-5 max-w-md text-sm text-white/55">
          (you can't really say no. the button knows.)
        </p>

        <div className="relative mt-12 flex h-32 w-full max-w-md items-center justify-center gap-6">
          <button onClick={() => nav({ to: "/hub" })} className="cine-btn">
            yes, always
          </button>
          <button
            onMouseEnter={dodge}
            onClick={dodge}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              transition: "transform 0.35s cubic-bezier(.2,.7,.2,1)",
            }}
            className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-white/40"
          >
            no
          </button>
        </div>
      </div>
    </Scene>
  );
}
