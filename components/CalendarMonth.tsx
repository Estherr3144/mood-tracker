"use client";

import { useState } from "react";
import { MoodEntry } from "@/types/mood";
import { MOODS } from "@/config/moods";
import MoodModal from "./MoodModal";

type Props = 
{
  year: number;
  month: number;
  allMoods: MoodEntry[];
};

export default function CalendarMonth({ year, month, allMoods }: Props) 
{
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);

  const getAvgMood = (date: string) => {
    const moods = allMoods.filter(m => m.date === date);
    if (!moods.length) return null;
    const avgScore = moods.reduce((sum, m) => sum + m.score, 0) / moods.length;
    return MOODS.reduce((closest, m) =>
      Math.abs(m.score - avgScore) < Math.abs(closest.score - avgScore) ? m : closest
    );
  };

  return (
    <div className="grid grid-cols-7 gap-2 text-center">
      {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
        <div key={d} className="font-bold">{d}</div>
      ))}

      {days.map((d, idx) => {
        if (!d) return <div key={idx}></div>;
        const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
        const mood = getAvgMood(dateStr);

        return (
          <div
            key={idx}
            onClick={() => setSelectedDate(dateStr)}
            className="bg-white p-2 rounded shadow min-h-[60px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
          >
            <span className="text-sm">{d}</span>
            <span className="text-2xl">{mood?.emoji}</span>
          </div>
        );
      })}

      {selectedDate && (
        <MoodModal
          date={selectedDate}
          moods={allMoods.filter(m => m.date === selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
