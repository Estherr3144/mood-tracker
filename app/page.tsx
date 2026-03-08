"use client";

import MoodInput from "@/components/MoodInput";

export default function HomePage() 
{
  return (
    <main 
      className="p-6 min-h-screen">
      <div 
        className="max-w-3xl mx-auto">
        <div 
          className="mb-8 text-center">
          <h1 
            className="text-4xl font-bold mb-3 text-pink-500">
            How are you feeling today?
          </h1>
          <p 
            className="text-gray-600">
            Track your daily mood!
          </p>
        </div>

         {/* mood input form */} 
        <div 
          className="flex justify-center">
          <MoodInput />
        </div>
      </div>
    </main>
  );
}