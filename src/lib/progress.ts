const KEY = "bday_progress_v1";

export type MemoryId = "laughs" | "dance" | "class" | "hangouts" | "nonsense";
export const MEMORY_IDS: MemoryId[] = ["laughs", "dance", "class", "hangouts", "nonsense"];

export function getCompleted(): MemoryId[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function markCompleted(id: MemoryId) {
  const list = new Set(getCompleted());
  list.add(id);
  localStorage.setItem(KEY, JSON.stringify([...list]));
}

export function resetProgress() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function allDone() {
  return MEMORY_IDS.every((id) => getCompleted().includes(id));
}
