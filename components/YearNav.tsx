"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

export default function YearNav({ year, setYear }: Props) {
  const prevYear = () => setYear(year - 1);
  const nextYear = () => setYear(year + 1);

  return (
    <div className="flex justify-between items-center mb-4 bg-red-200">
      <button onClick={prevYear} className="px-2 py-1 bg-gray-200 rounded">◀</button>
      <h2 className="text-xl font-bold">{year} 年</h2>
      <button onClick={nextYear} className="px-2 py-1 bg-gray-200 rounded">▶</button>
    </div>
  );
}
