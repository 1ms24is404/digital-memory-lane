import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Scene } from "@/components/Scene";
import { getCompleted, MEMORY_IDS, type MemoryId } from "@/lib/progress";
import { Check } from "lucide-react";

export const Route = createFileRoute("/hub")({ component: Hub });

const MEMORIES: { id: MemoryId; title: string; theme: string; rotate: string }[] = [
  { id: "laughs",   title: "Our Laughs Together",   theme: "theme-gold",    rotate: "-rotate-3" },
  { id: "dance",    title: "Dance Disasters",       theme: "theme-red",     rotate: "rotate-2" },
  { id: "class",    title: "Class & Lab Chitchats", theme: "theme-emerald", rotate: "-rotate-2" },
  { id: "hangouts", title: "Hangouts",              theme: "theme-blue",    rotate: "rotate-3" },
  { id: "nonsense", title: "Pure Nonsense",         theme: "theme-magenta", rotate: "-rotate-1" },
];

function Hub() {
  const nav = useNavigate();
  const [done, setDone] = useState<MemoryId[]>([]);

  useEffect(() => { setDone(getCompleted()); }, []);

  const allDone = MEMORY_IDS.every((id) => done.includes(id));
  const doneCount = done.length;
  const progress = (doneCount / MEMORY_IDS.length) * 100;

  return (
    <Scene theme="theme-purple">
      <div className="flex h-full w-full flex-col items-center px-6 pt-10 pb-6">
        <p className="font-hand text-xl text-white/60">pick a chapter</p>
        <h1 className="mt-1 text-4xl text-white md:text-5xl">memory hub</h1>
        <div className="mt-3 w-full max-w-2xl">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/50">
            <span>{doneCount} of {MEMORY_IDS.length} unlocked</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full bg-white/70 transition-[width] duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="mt-10 grid w-full max-w-5xl flex-1 grid-cols-2 gap-4 overflow-auto md:grid-cols-3 md:gap-8">
          {MEMORIES.map((m) => {
            const isDone = done.includes(m.id);
            return (
              <Link
                key={m.id}
                to="/memory/$id"
                params={{ id: m.id }}
                className={`polaroid group ${m.rotate} relative`}
              >
                <div className="frame overflow-hidden">
                  <img
                    src={`/images/${m.id}/${m.id}-1.jpeg`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <div>
                    <p className="font-hand text-lg text-neutral-800">{m.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">{m.id}</p>
                  </div>
                  {isDone && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-white">
                      <Check size={12} />
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        <button
          disabled={!allDone}
          onClick={() => nav({ to: "/quiz" })}
          className={`cine-btn mt-8 disabled:cursor-not-allowed disabled:opacity-30 ${
            allDone ? "glow" : ""
          }`}
        >
          {allDone ? "continue →" : `unlock ${MEMORY_IDS.length - done.length} more`}
        </button>
      </div>
    </Scene>
  );
}
