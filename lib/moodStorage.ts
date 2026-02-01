import { MoodEntry } from "@/types/mood";

const KEY = "moodEntries";

export function getMoods(): MoodEntry[] 
{
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function addMood(entry: MoodEntry) 
{
  const moods = getMoods();
  moods.push(entry);
  localStorage.setItem(KEY, JSON.stringify(moods));
}
