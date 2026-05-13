import { type ReactNode } from "react";
import { CinematicBackground } from "./CinematicBackground";
import { MusicToggle } from "./MusicToggle";

export function Scene({
  theme = "theme-purple",
  children,
  showMusic = true,
}: {
  theme?: string;
  children: ReactNode;
  showMusic?: boolean;
}) {
  return (
    <>
      <CinematicBackground theme={theme} />
      <main className={`relative z-10 h-screen w-screen overflow-hidden scene-enter ${theme}`}>
        {children}
      </main>
      {showMusic && <MusicToggle />}
    </>
  );
}
