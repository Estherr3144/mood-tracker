"use client";

import {useState} from "react";
import {MoodEntry} from "@/types/mood";
import {MOODS} from "@/config/moods";
import MoodModal from "./MoodModal";

type Props = 
{
  year: number;
  month: number;
  allMoods: MoodEntry[];
};

export default function CalendarMonth({ year, month, allMoods }: Props) 
{
  //track which date clicked for modal
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  //calculate calendar days
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  //create array w/ empty slots for days before month starts
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);

  //find mood for a specific date
  const getMoodForDate = (date: string) => {
    const moods = allMoods.filter((m) => m.date === date);
    if (moods.length === 0) return null;

    const latestMood = moods[moods.length - 1];
    return MOODS.find((m) => m.score === latestMood.score) || null;
  };

  return (
    <>
       {/* calendar grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-bold text-gray-500 py-2">
            {d}
          </div>
        ))}

        {/* calendar days */}
        {days.map((d, idx) => {
          if (!d) return <div key={idx}></div>;

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            d
          ).padStart(2, "0")}`;

          const mood = getMoodForDate(dateStr);

          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(dateStr)}
              className="bg-white p-2 rounded-xl shadow border border-pink-100 min-h-[72px] flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition"
            >
              <span className="text-sm text-gray-500">{d}</span>
              <span className="text-2xl mt-1">{mood?.emoji || ""}</span>
            </div>
          );
        })}
      </div>

       {/* popup modal when date is clicked */}
      {selectedDate && (
        <MoodModal
          date={selectedDate}
          moods={allMoods.filter((m) => m.date === selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </>
  );
}