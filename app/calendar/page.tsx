"use client";

import { useState } from "react";
import { getMoods } from "@/lib/moodStorage";
import CalendarMonth from "@/components/CalendarMonth";
import CalendarYear from "@/components/CalendarYear";
import MonthNav from "@/components/MonthNav";
import YearNav from "@/components/YearNav";

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "year">("month");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const allMoods = getMoods();

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setView("month")} className={`px-3 py-1 rounded ${view==="month" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>月视图</button>
        <button onClick={() => setView("year")} className={`px-3 py-1 rounded ${view==="year" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>年视图</button>
      </div>

      {view === "month" && (
        <>
          <MonthNav year={year} month={month} setYear={setYear} setMonth={setMonth} />
          <CalendarMonth year={year} month={month} allMoods={allMoods} />
        </>
      )}


console.log("📅 CalendarPage render, view =", view);
 {view === "year" && (
  <>
    <YearNav year={year} setYear={setYear} />
    <CalendarYear year={year} allMoods={allMoods} />
  </>
)}

    </main>
  );
}
