"use client";

import {Dispatch, SetStateAction} from "react";

type Props = 
{
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

export default function YearNav({ year, setYear }: Props)
{
  //go to previous/next year
  const prevYear = () => setYear(year - 1);
  const nextYear = () => setYear(year + 1);

  return (
    <div 
      className="flex justify-between items-center mb-4 bg-white p-4 rounded-2xl shadow border border-pink-100">
      
      {/* previous year button */}
      <button
        onClick={prevYear}
        className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200"
      >
        ◀
      </button>

      
      {/* current year display */}
      <h2 className="text-xl font-bold text-pink-500">{year} Year</h2>

      {/*  next year button */}
      <button
        onClick={nextYear}
        className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200"
      >
        ▶
      </button>
    </div>
  );
}