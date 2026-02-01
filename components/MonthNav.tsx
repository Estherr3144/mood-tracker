"use client";
import { Dispatch, SetStateAction } from "react";

type Props = 
{
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
};

export default function MonthNav({ year, month, setYear, setMonth }: Props) 
{
  const prevMonth = () => 
 {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const nextMonth = () => 
 {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={prevMonth} className="px-2 py-1 bg-gray-200 rounded">◀</button>
      <h2 className="text-xl font-bold">{year}年 {month + 1}月</h2>
      <button onClick={nextMonth} className="px-2 py-1 bg-gray-200 rounded">▶</button>
    </div>
  );
}
