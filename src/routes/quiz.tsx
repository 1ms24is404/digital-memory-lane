import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/quiz")({ component: Quiz });

const QUESTIONS = [
  { q: "What's our most repeated inside joke?", opts: ["the one about the chair", "the cursed playlist", "that one professor's voice", "you know which one"] },
  { q: "Where do we always end up at 2am?", opts: ["the parking lot", "your room", "that diner", "lost"] },
  { q: "Pick our anthem.", opts: ["song A", "song B", "song C", "song D"] },
  { q: "What snack is non-negotiable?", opts: ["maggi", "chips", "ice cream", "everything"] },
  { q: "Best memory of us?", opts: ["that night", "that trip", "that random tuesday", "all of it"] },
];

function Quiz() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const next = () => {
    if (i < QUESTIONS.length - 1) {
      setI(i + 1);
      setPicked(null);
    } else {
      nav({ to: "/heart" });
    }
  };

  const q = QUESTIONS[i];
  const progress = ((i + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <Scene theme="theme-mono">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 pb-6 pt-10">
        <div className="w-full max-w-xl">
          <div className="mb-8 flex items-center justify-between text-xs tracking-widest text-white/50">
            <span>question {i + 1} / {QUESTIONS.length}</span>
            <span>quiz</span>
          </div>
          <div className="mb-10 h-px w-full overflow-hidden bg-white/10">
            <div className="h-full bg-white/70 transition-[width] duration-700" style={{ width: `${progress}%` }} />
          </div>

          <h2 key={i} className="scene-enter text-3xl text-white md:text-4xl">{q.q}</h2>

          <div className="mt-8 grid gap-3">
            {q.opts.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setPicked(idx)}
                className={`group flex items-center justify-between rounded-lg border px-5 py-4 text-left text-white/85 transition ${
                  picked === idx
                    ? "border-white/60 bg-white/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                }`}
              >
                <span className="font-light">{opt}</span>
                <span className="font-hand text-xl text-white/40">{String.fromCharCode(65 + idx)}</span>
              </button>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <button onClick={next} disabled={picked === null} className="cine-btn disabled:opacity-30">
              {i === QUESTIONS.length - 1 ? "finish →" : "next →"}
            </button>
          </div>
        </div>
      </div>
    </Scene>
  );
}
