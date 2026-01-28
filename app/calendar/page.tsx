"use client";

import { getMoods } from "@/lib/moodStorage";
import { MOODS } from "@/config/moods";
import { MoodEntry } from "@/types/mood";

type DailyMood = {
  date: string;
  avgScore: number;
};

export default function CalendarPage() {
  const moods: MoodEntry[] = getMoods(); // ✅ 用 getMoods

  // 👉 按日期分组
  const moodByDate: Record<string, number[]> = {};

  moods.forEach((mood) => {
    if (!moodByDate[mood.date]) {
      moodByDate[mood.date] = [];
    }
    moodByDate[mood.date].push(mood.score);
  });

  // 👉 每天算平均 mood
  const dailyMoods: DailyMood[] = Object.entries(moodByDate).map(
    ([date, scores]) => ({
      date,
      avgScore: scores.reduce((sum, s) => sum + s, 0) / scores.length,
    })
  );

  // 👉 找最接近的 mood
  const getMoodByScore = (score: number) => {
    return MOODS.reduce((closest, mood) =>
      Math.abs(mood.score - score) < Math.abs(closest.score - score)
        ? mood
        : closest
    );
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">📅 Mood Calendar</h1>

      {dailyMoods.length === 0 && (
        <p className="text-gray-500">No mood records yet.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dailyMoods.map((day) => {
          const mood = getMoodByScore(day.avgScore);

          return (
            <div
              key={day.date}
              className="bg-white p-4 rounded shadow text-center"
            >
              <p className="text-sm text-gray-500">{day.date}</p>
              <div className="text-3xl">{mood.emoji}</div>
              <p className="text-sm">{mood.label}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
