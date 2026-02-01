"use client";

import { useState, useEffect } from "react";
import { getMoods } from "@/lib/moodStorage";
import CalendarMonth from "@/components/CalendarMonth";
import CalendarYear from "@/components/CalendarYear";
import MonthNav from "@/components/MonthNav";
import YearNav from "@/components/YearNav";
import { MoodEntry } from "@/types/mood";

export default function CalendarPage() 
{
  const [view, setView] = useState<"month" | "year">("month");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [allMoods, setAllMoods] = useState<MoodEntry[]>([]); 

  useEffect(() => {
    const moods = getMoods();
    setAllMoods(moods);
  }, []);

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView("month")}
          className={`px-3 py-1 rounded ${
            view === "month" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Monthly Mood
        </button>

        <button
          onClick={() => setView("year")}
          className={`px-3 py-1 rounded ${
            view === "year" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Yearly Mood
        </button>
      </div>

      {view === "month" && (
        <>
          <MonthNav year={year} month={month} setYear={setYear} setMonth={setMonth} />
          <CalendarMonth year={year} month={month} allMoods={allMoods} />
        </>
      )}

  {view === "year" && (
  <>
    <YearNav year={year} setYear={setYear} />
    <CalendarYear year={year} allMoods={allMoods} />
  </>
)}
    </main>
  );
}
