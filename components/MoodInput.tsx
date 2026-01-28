"use client";

import { MOODS } from "@/config/moods";
import { addMood } from "@/lib/moodStorage";
import { v4 as uuidv4 } from "uuid";

export default function MoodInput() {
  const today = new Date().toISOString().slice(0, 10);

  function handleSelect(mood: any) {
    addMood({
      id: uuidv4(),
      mood: mood.type,
      score: mood.score,
      date: today,
      createdAt: Date.now(),
    });
  }

  return (
    <div className="flex gap-4">
      {MOODS.map((m) => (
        <button
          key={m.type}
          onClick={() => handleSelect(m)}
          className="text-2xl"
        >
          {m.emoji}
        </button>
      ))}
    </div>
  );
}
