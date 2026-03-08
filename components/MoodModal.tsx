"use client";

import {MoodEntry} from "@/types/mood";
import {MOODS} from "@/config/moods";

type Props = 
{
  date: string;
  moods: MoodEntry[];
  onClose: () => void;
};

export default function MoodModal({date, moods, onClose}: Props) 
{
  return (
    <div 
      className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div 
        className="bg-white p-6 rounded-2xl shadow-lg w-80 border border-pink-100">
        <h3 
          className="text-lg font-bold mb-2 text-pink-500">{date}</h3>

        {moods.length === 0 ? (
          <p className="text-gray-500">No mood records for this day.</p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-3">
              Total records: {moods.length}
            </p>

            {/* list of moods for this date */}
            <ul className="space-y-2">
              {moods.map((m) => {
                const mood = MOODS.find((mo) => mo.score === m.score);

                return (
                  <li
                    key={m.id}
                    className="flex items-center gap-2 border border-pink-100 rounded-xl p-2 bg-pink-50"
                  >
                    <span className="text-2xl">{mood?.emoji}</span>
                    <span>{mood?.label}</span>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}