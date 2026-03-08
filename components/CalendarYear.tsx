"use client";

import {MoodEntry} from "@/types/mood";
import {MOODS} from "@/config/moods";

type Props = 
{
  year: number;
  allMoods: MoodEntry[];
};

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

export default function CalendarYear({year, allMoods}: Props) 
{
  //calculate average mood for each month
  const monthAvg = [];

  for (let m = 0; m < 12; m++) {
    //get all moods for this month
    const monthMoods = allMoods.filter((entry) => {
      const d = new Date(entry.date);
      return d.getFullYear() === year && d.getMonth() === m;
    });

    //skip if no entries for this month
    if (monthMoods.length === 0) 
    {
      monthAvg.push(null);
      continue;
    }

    //calculate average score
    let total = 0;

    for (const entry of monthMoods) 
    {
      total += entry.score;
    }

    const avg = total / monthMoods.length;

    //find mood that's closest to the average
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

    monthAvg.push(closestMood);
  }

  return (
    //grid of month cards
    <div 
      className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {monthAvg.map((mood, idx) => (
        <div
          key={idx}
          className="p-4 bg-white rounded-2xl shadow border border-pink-100 flex flex-col items-center"
        >
          {/* month name */}
          <span 
            className="text-sm text-gray-500 mb-1">{monthNames[idx]}</span>
          
          {/* mood emoji */}
          <span  
            className="text-3xl mb-1">{mood?.emoji || "–"}</span>
          
            {/* mood label */}
          <span 
            className="text-sm font-medium">
            {mood?.label || "No data"}
          </span>
        </div>
      ))}
    </div>
  );
}