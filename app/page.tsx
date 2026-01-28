import MoodInput from "@/components/MoodInput";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl mb-4">Mood Tracker</h1>
      <MoodInput />

         <Link
        href="/calendar"
        className="mt-6 inline-block text-blue-600 underline"
      >
        View Calendar →
      </Link>
    </main>

    
  );
}


