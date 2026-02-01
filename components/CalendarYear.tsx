"use client";

import { useEffect, useState } from "react";
import { MoodEntry } from "@/types/mood";
import { MOODS } from "@/config/moods";

type Props = { year: number; allMoods: MoodEntry[] };

export default function CalendarYear({ year, allMoods }: Props) 
{
  const [monthAvg, setMonthAvg] = useState<(typeof MOODS[0] | null)[]>([]);

  useEffect(() => {
    const avg = Array.from({ length: 12 }, (_, m) => {
      const monthMoods = allMoods.filter(mo => {
        const d = new Date(mo.date);
        return d.getFullYear() === year && d.getMonth() === m;
      });
      if (!monthMoods.length) return null;
      const avgScore = monthMoods.reduce((sum, mo) => sum + mo.score, 0) / monthMoods.length;
      return MOODS.reduce((closest, mood) =>
        Math.abs(mood.score - avgScore) < Math.abs(closest.score - avgScore) ? mood : closest
      );
    });
    setMonthAvg(avg);
  }, [allMoods, year]); 

  return (
    <div className="grid grid-cols-3 gap-4">
      {monthAvg.map((mood, idx) => (
        <div key={idx} className="p-4 bg-white rounded shadow flex flex-col items-center">
          <span>{idx + 1}月</span>
          <span className="text-3xl">{mood?.emoji || "–"}</span>
          <span>{mood?.label || "No data"}</span>
        </div>
      ))}
    </div>
  );
}
