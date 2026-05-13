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

  return (
    <Scene theme="theme-purple">
      <div className="flex h-full w-full flex-col items-center px-6 pt-10 pb-6">
        <p className="font-hand text-xl text-white/60">pick a chapter</p>
        <h1 className="mt-1 text-4xl text-white md:text-5xl">memory hub</h1>

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
                <div className="frame">
                  <span>memory</span>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <p className="font-hand text-lg text-neutral-800">{m.title}</p>
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
          className="cine-btn mt-8 disabled:cursor-not-allowed disabled:opacity-30"
        >
          {allDone ? "continue →" : `unlock ${MEMORY_IDS.length - done.length} more`}
        </button>
      </div>
    </Scene>
  );
}
