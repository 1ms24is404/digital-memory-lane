import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/letter")({ component: Letter });

const LETTER = `I still remember when we first met in second year. Honestly, I never thought we would become this close. I never imagined that one day you would become such an important part of my life.

I remember our first group hangout, all our random conversations, the fights, the laughs, the bonding, everything. We’ve literally experienced every emotion together. We cried together, laughed until we couldn’t breathe, had stupid arguments, and somehow still ended up being even closer after every fight. That’s honestly my favorite thing about us — no matter what happens, our bond somehow stays the same.

I also love how we think so similarly sometimes, like we’re secretly connected or something 😭. Every month, every year, I genuinely pray that you always stay my best friend because you mean so much to me.

And please stop comparing yourself to anyone. You are genuinely one of the prettiest and sweetest people I know. Your eyes, your smile, your hair, your whole personality — everything about you is beautiful. And yes, you are a cutesy chubby girl and that is adorable, so stop overthinking it. If I were a boy, I would 100% try to flirt with you 😭.

I’m also sorry if I’ve ever hurt you or done anything wrong knowingly or unknowingly. But one thing I hope you always remember is that I love you a lot and I genuinely care about you.

I’m sorry I couldn’t afford some huge expensive gift, but this website is something I truly wanted to make for you because you deserve something personal, something filled with memories, because that’s what you are to me — a collection of some of my happiest memories.

From the day we met till now, I honestly can’t imagine surviving engineering without you. Thank you for being there during the worst days, the funniest days, and the most random moments of life.

I’m really grateful for you. And no matter where life takes us in the future, I hope our bond only becomes stronger and stronger.

Happy Birthday, always 💌

— Chinmayi`;

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
