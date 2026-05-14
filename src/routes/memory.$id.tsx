import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { Scene } from "@/components/Scene";
import { markCompleted, type MemoryId } from "@/lib/progress";

export const Route = createFileRoute("/memory/$id")({ component: Memory });

const DATA: Record<MemoryId, { title: string; theme: string; caption: string; tag: string }> = {
  laughs:   { title: "Our Laughs Together",   theme: "theme-gold",    caption: "we couldn't breathe.",       tag: "chapter one" },
  dance:    { title: "Dance Disasters",       theme: "theme-red",     caption: "rhythm? never met her.",     tag: "chapter two" },
  class:    { title: "Class & Lab Chitchats", theme: "theme-emerald", caption: "whispered through every lecture.", tag: "chapter three" },
  hangouts: { title: "Hangouts",              theme: "theme-blue",    caption: "the long, slow afternoons.", tag: "chapter four" },
  nonsense: { title: "Pure Nonsense",         theme: "theme-magenta", caption: "we made no sense. perfect.", tag: "chapter five" },
};

const ROT = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

function Memory() {
  const { id } = useParams({ from: "/memory/$id" }) as { id: MemoryId };
  const nav = useNavigate();
  const data = DATA[id];

  useEffect(() => { if (data) markCompleted(id); }, [id, data]);

  if (!data) {
    return (
      <Scene theme="theme-purple">
        <div className="flex h-full items-center justify-center text-white/70">Memory not found.</div>
      </Scene>
    );
  }

  return (
    <Scene theme={data.theme} vignette>
      <div className="flex h-full w-full flex-col px-6 pt-8 pb-6">
        <div className="text-center">
          <p className="font-hand text-lg text-white/55">{data.tag}</p>
          <h1 className="mt-1 text-3xl text-white md:text-5xl">{data.title}</h1>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-2 gap-4 overflow-auto md:grid-cols-4 md:gap-6">
          <div className={`polaroid ${ROT[0]}`}>
            <div className="frame memory-frame overflow-hidden">
              <img
                src={`/images/${id}/${id}-1.jpeg`}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 px-1 font-hand text-base text-neutral-800">— a moment.</p>
          </div>

          <div className={`polaroid ${ROT[1]}`}>
            <div className="frame memory-frame overflow-hidden">
              <img
                src={`/images/${id}/${id}-2.jpeg`}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 px-1 font-hand text-base text-neutral-800">— chaos.</p>
          </div>

          <div className={`polaroid ${ROT[2]}`}>
            <div className="frame memory-frame overflow-hidden">
              <img
                src={`/images/${id}/${id}-3.jpeg`}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-2 px-1 font-hand text-base text-neutral-800">— unforgettable.</p>
          </div>

          <div className={`polaroid ${ROT[3]}`}>
            <div className="frame memory-frame relative overflow-hidden">
              <video controls className="h-full w-full object-contain">
                <source src={`/videos/${id}/${id}-video.mp4`} type="video/mp4" />
              </video>
            </div>
            <p className="mt-2 px-1 font-hand text-base text-neutral-800">{data.caption}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button onClick={() => nav({ to: "/hub" })} className="cine-btn">
            next →
          </button>
        </div>
      </div>
    </Scene>
  );
}
