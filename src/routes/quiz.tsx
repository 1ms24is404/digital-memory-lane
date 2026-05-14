import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/quiz")({ component: Quiz });

const QUESTIONS = [
  {
    q: "Who is more likely to survive an exam using pure luck?",
    opts: ["Me 😭", "You 😭", "We both are academically finished", "Bro trust me I studied (biggest lie ever)"],
  },
  {
    q: "What defines our friendship best?",
    opts: [
      "Sending reels instead of replying",
      "Bullying each other affectionately",
      "Acting normal in public and insane privately",
      "One braincell shared between two people",
    ],
  },
  {
    q: "What was our strongest skill in class?",
    opts: ["Listening sincerely", "Gossiping silently", "Pretending to understand", "Surviving somehow"],
  },
  {
    q: "Which memory deserves a Netflix documentary?",
    opts: ["The dance disaster", "That one hangout", "Classroom chaos", "All of the above 😭"],
  },
  {
    q: "Final Question 💌\nWould I choose you as my best friend again?",
    opts: ["Always", "Obviously", "In every universe", "You're stuck with me now"],
  },
];
const ANSWERS = [2, 3, 1, 3, 2];

function Quiz() {
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const next = () => {
    if (i < QUESTIONS.length - 1) {
      setI(i + 1);
      setPicked(null);
    } else {
      nav({ to: "/heart" });
    }
  };

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === ANSWERS[i]) setScore((s) => s + 1);
  };

  const q = QUESTIONS[i];
  const progress = ((i + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <Scene theme="theme-mono">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 pb-6 pt-10">
        <div className="w-full max-w-xl">
          <div className="mb-8 flex items-center justify-between text-xs tracking-widest text-white/50">
            <span>question {i + 1} / {QUESTIONS.length}</span>
            <span>score {score} / {QUESTIONS.length}</span>
          </div>
          <div className="mb-10 h-px w-full overflow-hidden bg-white/10">
            <div className="h-full bg-white/70 transition-[width] duration-700" style={{ width: `${progress}%` }} />
          </div>

          <h2 key={i} className="scene-enter text-3xl text-white md:text-4xl">{q.q}</h2>

          <div className="mt-8 grid gap-3">
            {q.opts.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => choose(idx)}
                className={`group flex items-center justify-between rounded-lg border px-5 py-4 text-left text-white/85 transition ${
                  picked !== null
                    ? idx === ANSWERS[i]
                      ? "border-emerald-200/80 bg-emerald-200/20 text-emerald-50"
                      : "border-rose-300/70 bg-rose-300/15 text-rose-50"
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
