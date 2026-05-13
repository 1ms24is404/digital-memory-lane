import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TRACKS = ["/audio/track-1.mp3", "/audio/track-2.mp3"];

let sharedAudio: HTMLAudioElement | null = null;
let sharedIndex = 0;
let sharedPlaying = false;

function ensureAudio(): HTMLAudioElement {
  if (sharedAudio) return sharedAudio;
  const a = new Audio(TRACKS[sharedIndex]);
  a.volume = 0.45;
  a.addEventListener("ended", () => {
    sharedIndex = (sharedIndex + 1) % TRACKS.length;
    a.src = TRACKS[sharedIndex];
    a.play().catch(() => {});
  });
  sharedAudio = a;
  return a;
}

export function MusicToggle() {
  const [playing, setPlaying] = useState(sharedPlaying);
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    ref.current = ensureAudio();
  }, []);

  const toggle = () => {
    const a = ensureAudio();
    if (sharedPlaying) {
      a.pause();
      sharedPlaying = false;
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      sharedPlaying = true;
      setPlaying(true);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
