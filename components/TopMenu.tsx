"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function TopMenu() 
{
  //get current page URL to highlight active tab
  const pathname = usePathname();

  //style for menu links
  const linkClass = (path: string) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      pathname === path
        ? "bg-pink-400 text-white shadow"
        : "text-gray-700 hover:bg-pink-100"
    }`;

  return (
    <nav 
      className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur border-b border-pink-100 shadow-sm">
      <div 
        className="text-xl font-bold text-pink-500">Mood Tracker</div>

      {/* navigation links */}
      <div 
        className="flex gap-2">
        <Link href="/" className={linkClass("/")}>
          Home
        </Link>

        <Link href="/calendar" className={linkClass("/calendar")}>
          Calendar
        </Link>

        <Link href="/stats" className={linkClass("/stats")}>
          Stats
        </Link>
      </div>
    </nav>
  );
}