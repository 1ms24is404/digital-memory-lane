import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Scene } from "@/components/Scene";

export const Route = createFileRoute("/intro")({ component: Intro });

function Intro() {
  const nav = useNavigate();
  return (
    <Scene theme="theme-purple">
      <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="font-hand text-2xl text-white/60">today is</p>
        <h1 className="mt-3 text-6xl leading-tight text-white md:text-8xl">
          your <em className="font-display italic text-white/90">day</em>
        </h1>
        <p className="mt-6 max-w-md text-base font-light text-white/65 md:text-lg">
          A small film stitched from quiet moments, loud laughs, and everything in between.
        </p>
        <button onClick={() => nav({ to: "/ready" })} className="cine-btn mt-12">
          begin
        </button>
      </div>
    </Scene>
  );
}
