"use client";

import {useEffect, useState} from "react";
import {getMoods} from "@/lib/moodStorage";
import {MOODS} from "@/config/moods";
import {MoodEntry} from "@/types/mood";

const monthNames = 
[
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function StatsPage() 
{
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [allMoods, setAllMoods] = useState<MoodEntry[]>([]);

  // load moods on page start and when tab gets focus
  useEffect(() => {
    const loadMoods = () => {
      setAllMoods(getMoods());
    };

    loadMoods();
    window.addEventListener("focus", loadMoods);

    //clean up listener when done
    return () => {
      window.removeEventListener("focus", loadMoods);
    };
  }, 
  
  []);

  // filter moods for selected year
  const yearMoods = allMoods.filter((m) => {
    const d = new Date(m.date);
    return d.getFullYear() === selectedYear;
  });

  const totalEntries = yearMoods.length;

  // calculate average score for the year
  const averageScore =
    totalEntries > 0
      ? yearMoods.reduce((sum, mood) => sum + mood.score, 0) / totalEntries
      : null;

  let overallMood = null;

  // find mood closest to average score
  if (averageScore !== null) 
  {
    let closestMood = MOODS[0];

    for (const mood of MOODS) 
    {
      const currentDiff = Math.abs(mood.score - averageScore);
      const closestDiff = Math.abs(closestMood.score - averageScore);

      if (currentDiff < closestDiff) 
      {
        closestMood = mood;
      }
    }

    overallMood = closestMood;
  }

  let mostFrequentMood = null;

  // find mood that appears more often
  if (totalEntries > 0) 
  {
    let highestCount = 0;

    for (const mood of MOODS) 
    {
      let count = 0;

      for (const entry of yearMoods) 
      {
        if (entry.score === mood.score) 
        {
          count++;
        }
      }

      if (count > highestCount) 
      {
        highestCount = count;
        mostFrequentMood = mood;
      }
    }
  }

  // calculate average mood for each month
  const monthAvg = [];

  for (let m = 0; m < 12; m++) 
  {
    const monthMoods = yearMoods.filter((entry) => {
      const d = new Date(entry.date);
      return d.getMonth() === m;
    });

    if (monthMoods.length === 0) 
    {
      monthAvg.push(null);
      continue;
    }

    let total = 0;

    for (const entry of monthMoods) 
    {
      total += entry.score;
    }

    const avg = total / monthMoods.length;

    // find closest mood for this month average
    let closestMood = MOODS[0];

    for (const mood of MOODS) 
    {
      const currentDiff = Math.abs(mood.score - avg);
      const closestDiff = Math.abs(closestMood.score - avg);

      if (currentDiff < closestDiff) 
      {
        closestMood = mood;
      }
    }

    monthAvg.push
    (
      {
        avg: avg,
        mood: closestMood,
        count: monthMoods.length,
      }
    );
  }

  return (
    <main 
      className="p-6 min-h-screen">

      <div 
        className="max-w-5xl mx-auto">

        <h1 
          className="text-3xl font-bold mb-4 text-pink-500">
          Mood Statistics
        </h1>

        {/* year selection */}
        <div 
          className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow border border-pink-100">
          <button
            onClick={() => setSelectedYear((prev) => prev - 1)}
            className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200"
          >
            ◀
          </button>

          <h2 
            className="text-xl font-semibold text-pink-500">
            {selectedYear}
          </h2>

          <button
            onClick={() => setSelectedYear((prev) => prev + 1)}
            className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200"
          >
            ▶
          </button>
        </div>

         {/* stats cards */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div 
            className="bg-white p-4 rounded-2xl shadow border border-pink-100">
            <p className="text-sm text-gray-500 mb-1">Total Entries</p>
            <p className="text-2xl font-bold">{totalEntries}</p>
          </div>

          <div 
            className="bg-white p-4 rounded-2xl shadow border border-pink-100">
            <p className="text-sm text-gray-500 mb-1">Overall Mood</p>
            <p className="text-2xl font-bold">
              {overallMood ? `${overallMood.emoji} ${overallMood.label}` : "–"}
            </p>
          </div>

         
          <div 
            className="bg-white p-4 rounded-2xl shadow border border-pink-100">
            <p className="text-sm text-gray-500 mb-1">Most Frequent Mood</p>
            <p className="text-2xl font-bold">
              {mostFrequentMood
                ? `${mostFrequentMood.emoji} ${mostFrequentMood.label}`
                : "–"}
            </p>
          </div>
        </div>
        
        {/* monthly trend chart */}
        <div 
          className="bg-white p-4 rounded-2xl shadow border border-pink-100">
          <h3 className="text-lg font-semibold mb-4 text-pink-500">
            Monthly Mood Trend
          </h3>

          <div 
            className="space-y-3">
            {monthAvg.map((item, idx) => (
              <div key={idx} 
                className="flex items-center gap-3">
                <span 
                  className="w-14 text-sm text-gray-600">
                  {monthNames[idx]}
                </span>

                <div 
                  className="flex-1 bg-pink-100 h-4 rounded">
                  {item && (
                    <div
                      className="h-4 rounded bg-pink-400"
                      style={{ width: `${(item.avg / 5) * 100}%` }}
                    />
                  )}
                </div>

                <span 
                  className="w-16 text-center text-xl">
                  {item?.mood.emoji || "–"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}