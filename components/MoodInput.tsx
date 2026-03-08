"use client";

import {useState} from "react";
import {MOODS} from "@/config/moods";
import {addMood} from "@/lib/moodStorage";

export default function MoodInput() 
{
   //track selected mood and message
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [selectedMessage, setSelectedMessage] = useState("");

  //handle mood button click
  const handleSelectMood = (score: number) => {
    setSelectedScore(score);

    //find the selected mood
    let chosenMood = null;

    for (const mood of MOODS) 
    {
      if (mood.score === score) 
      {
        chosenMood = mood;
      }
    }

    if (!chosenMood) return;

    //pick random message for this mood
    const messages = chosenMood.messages;
    const randomNumber = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomNumber];

    setSelectedMessage(randomMessage);
  };

  //save mood to storage
  const handleSave = () => {
    if (selectedScore === null) return;

    //get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayString = `${year}-${month}-${day}`;

    //save to local storage
    addMood
    (
      {
        id: crypto.randomUUID(),
        date: todayString,
        score: selectedScore,
     }
    );

    //reset & confirm
    setSelectedScore(null);
    setSelectedMessage("");
    alert("Mood succesfully saved.");
  };

  //find current mood object
  let selectedMood = null;

  for (const mood of MOODS) 
  {
    if (mood.score === selectedScore) 
    {
      selectedMood = mood;
    }
  }

  return (
    <div 
      className="bg-white p-6 rounded-2xl shadow-md max-w-md w-full border border-pink-100">
      <h2 
        className="text-xl font-semibold mb-4 text-center text-pink-500">
        Select Your Mood
      </h2>

      {/* mood emoji buttons */}
      <div className="flex justify-between mb-5">
        {MOODS.map((mood) => (
          <button
            key={mood.score}
            onClick={() => handleSelectMood(mood.score)}
            className=
            {`text-3xl p-3 rounded-xl transition ${
              selectedScore === mood.score
                ? "bg-pink-100 scale-110 shadow-sm"
                : "hover:bg-pink-50"
            }`}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      {/* show selected mood & message */}
      {selectedMood && (
        <div 
          className="mb-4 p-4 rounded-xl bg-pink-50 border border-pink-100">
          <p className="text-lg font-semibold mb-1 text-pink-500">
            {selectedMood.emoji} {selectedMood.label}
          </p>
          <p 
            className="text-sm text-gray-600">{selectedMessage}</p>
        </div>
      )}

      {/* save button */}
      <button
        onClick={handleSave}
        disabled={selectedScore === null}
        className="w-full bg-pink-400 text-white py-2 rounded-xl font-medium hover:bg-pink-500 transition disabled:opacity-40"
      >
        Save Mood
      </button>
    </div>
  );
}