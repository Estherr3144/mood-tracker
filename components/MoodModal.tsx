"use client";

import { MoodEntry } from "@/types/mood";
import { MOODS } from "@/config/moods";

type Props = {
  date: string;
  moods: MoodEntry[];
  onClose: () => void;
};

export default function MoodModal({ date, moods, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h3 className="text-lg font-bold mb-2">{date}</h3>
        {moods.length === 0 ? (
          <p className="text-gray-500">No mood records</p>
        ) : (
          <ul>
            {moods.map((m, idx) => {
              const mood = MOODS.find(mo => mo.score === m.score);
              return (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-2xl">{mood?.emoji}</span>
                  <span>{mood?.label}</span>
                </li>
              );
            })}
          </ul>
        )}
        <button onClick={onClose} className="mt-4 px-3 py-1 bg-gray-200 rounded">Close</button>
      </div>
    </div>
  );
}
