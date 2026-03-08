"use client";
import {Dispatch, SetStateAction} from "react";

const monthNames = 
[
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Props = 
{
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
};

export default function MonthNav({ year, month, setYear, setMonth }: Props) 
{
  //go to previous month
  const prevMonth = () => {
    //if month is January
    if (month === 0) 
    {
      //go to December
      setMonth(11);
      //previous year
      setYear(year - 1);
    } 
    
    else 
    {
      //else go to previous month in same year
      setMonth(month - 1);
    }
  };

  //go to next month
  const nextMonth = () => {
    //if the month is December
    if (month === 11) 
    {
      //go to January
      setMonth(0);
      //next year
      setYear(year + 1);
    } 
    
    else 
    {
      //else go to next month in same year
      setMonth(month + 1);
    }
  };

  return (
    <div 
      className="flex justify-between items-center mb-4 bg-white p-4 rounded-2xl shadow border border-pink-100">
      <button
        onClick={prevMonth}
        className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200"
      >
        ◀
      </button>

  {/* Current month and year display */}
    <h2 
      className="text-xl font-bold text-pink-500">
          {monthNames[month]} {year}
    </h2>

      <button
        onClick={nextMonth}
        className="px-3 py-1 bg-pink-100 rounded-full hover:bg-pink-200"
      >
          ▶
      </button>
    </div>
  );
}