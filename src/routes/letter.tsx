import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/letter")({ component: Letter });

const LETTER = `Dear you,

Some friendships feel like home — yours feels like sunlight through an open window. Thank you for the laughs that hurt my ribs, the silences that didn't need filling, and every small ordinary day you turned into something I want to remember.

Happy birthday. I hope this year is gentle to you, the way you've been gentle to me.

— always`;

function Letter() {
  const nav = useNavigate();
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(LETTER.slice(0, i));
      if (i >= LETTER.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  return (
    <Scene theme="theme-beige">
      <div className="flex h-full w-full items-center justify-center px-6 py-10">
        <div className="relative flex h-full w-full max-w-2xl flex-col">
          <div className="flex-1 overflow-auto rounded-sm bg-[#f6efe1] p-8 text-neutral-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] md:p-12">
            <p className="mb-6 font-hand text-2xl text-neutral-700">a letter,</p>
            <pre className="whitespace-pre-wrap font-display text-lg leading-relaxed md:text-xl caret">
              {shown}
            </pre>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={() => nav({ to: "/final" })} className="cine-btn">
              one last thing →
            </button>
          </div>
        </div>
      </div>
    </Scene>
  );
}
