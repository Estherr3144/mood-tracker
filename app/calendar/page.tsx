"use client";

import { useState, useEffect } from "react";
import { getMoods } from "@/lib/moodStorage";
import { MOODS } from "@/config/moods";
import { MoodEntry } from "@/types/mood";

export default function CalendarPage() {
  const [dailyMoods, setDailyMoods] = useState<Record<string, number>>({});

  // ✅ 获取 mood 数据
  useEffect(() => {
    const moods: MoodEntry[] = getMoods();
    const grouped: Record<string, number[]> = {};
    moods.forEach((m) => {
      if (!grouped[m.date]) grouped[m.date] = [];
      grouped[m.date].push(m.score);
    });

    const avg: Record<string, number> = {};
    for (const date in grouped) {
      const scores = grouped[date];
      avg[date] = scores.reduce((a, b) => a + b, 0) / scores.length;
    }
    setDailyMoods(avg);
  }, []);

  // ✅ 生成当前月份
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0~11
  const firstDay = new Date(year, month, 1).getDay(); // 星期几 0~6
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);

  // ✅ helper: 找最接近的 mood
  const getMoodByScore = (score: number) =>
    MOODS.reduce((closest, m) =>
      Math.abs(m.score - score) < Math.abs(closest.score - score) ? m : closest
    );

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">📅 Mood Calendar</h1>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} className="font-bold">{d}</div>
        ))}

        {days.map((d, idx) => {
          if (!d) return <div key={idx}></div>;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2,"0")}`;
          const score = dailyMoods[dateStr];
          const mood = score ? getMoodByScore(score) : null;

          return (
            <div
              key={idx}
              className="bg-white p-2 rounded shadow min-h-[60px] flex flex-col items-center justify-center"
            >
              <span className="text-sm">{d}</span>
              <span className="text-2xl">{mood?.emoji}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
