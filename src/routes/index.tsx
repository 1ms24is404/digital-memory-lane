import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A film for you" },
      { name: "description", content: "A handcrafted birthday experience." },
    ],
  }),
  component: Loading,
});

const MESSAGES = [
  "Loading something soft…",
  "Polishing memories…",
  "Tuning the violins…",
  "Folding paper hearts…",
  "Almost ready for you…",
];

function Loading() {
  const nav = useNavigate();
  const [msg, setMsg] = useState(MESSAGES[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % MESSAGES.length;
      setMsg(MESSAGES[i]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const total = 4200;
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / total) * 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => nav({ to: "/intro" }), 500);
    };
    requestAnimationFrame(tick);
  }, [nav]);

  return (
    <Scene theme="theme-purple" showMusic={false}>
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="font-hand text-2xl text-white/70">a little film,</p>
        <h1 className="mt-2 text-5xl text-white/95 md:text-7xl">just for you</h1>
        <div className="mt-12 h-px w-64 overflow-hidden bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-white/30 via-white/80 to-white/30 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-6 text-sm tracking-widest text-white/50 caret">{msg}</p>
      </div>
    </Scene>
  );
}
