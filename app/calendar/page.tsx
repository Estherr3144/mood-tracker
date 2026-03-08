"use client";

import {useState, useEffect} from "react";
import {getMoods} from "@/lib/moodStorage";
import CalendarMonth from "@/components/CalendarMonth";
import CalendarYear from "@/components/CalendarYear";
import MonthNav from "@/components/MonthNav";
import YearNav from "@/components/YearNav";
import {MoodEntry} from "@/types/mood";

export default function CalendarPage() 
{
  //view calendar montly or yearly
  const [view, setView] = useState<"month" | "year">("month");

  //current year displayed
  const [year, setYear] = useState(new Date().getFullYear());

  //current month displayed
  const [month, setMonth] = useState(new Date().getMonth());

  //stores all mood entries
  const [allMoods, setAllMoods] = useState<MoodEntry[]>([]);

  //show moods when page opens and when user returns to tab
  useEffect(() => {
    const loadMoods = () => {
      const moods = getMoods();
      setAllMoods(moods);
    };

    //initial load
    loadMoods();

    //reload moods when return to this page
    window.addEventListener("focus", loadMoods);

    //remove event listener when component is removed
    return () => {
      window.removeEventListener("focus", loadMoods);
    };
  }, 
  
  []);

  return (
    <main 
      className="p-6 min-h-screen">

      <div 
        className="max-w-5xl mx-auto">

        <h1 
          className="text-3xl font-bold mb-4 text-pink-500">
            Mood Calendar
        </h1>

        {/* buttons to switch between monthly & yearly view */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-full font-medium ${
              view === "month"
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-700 hover:bg-pink-100"
            }`}
          >
            Monthly Mood
          </button>

          <button
            onClick={() => setView("year")}
            className={`px-4 py-2 rounded-full font-medium ${
              view === "year"
                ? "bg-pink-400 text-white"
                : "bg-white text-gray-700 hover:bg-pink-100"
            }`}
          >
            Yearly Mood
          </button>
        </div>

        {/* monthly calendar view */}
        {view === "month" && (
          <>
            <MonthNav
              year={year}
              month={month}
              setYear={setYear}
              setMonth={setMonth}
            />

            <CalendarMonth
              year={year}
              month={month}
              allMoods={allMoods}
            />
          </>
        )}

        {/* Yearly calendar view */}
        {view === "year" && (
          <>
            <YearNav 
              year={year} setYear={setYear} 
            />

            <CalendarYear 
              year={year} allMoods={allMoods} 
            />
          </>
        )}
      </div>
    </main>
  );
}