import {MoodEntry} from "@/types/mood";

//key to store moods in local storage
const KEY = "moodEntries";

//get all saved moods from local storage
export function getMoods(): MoodEntry[] 
{
  //check if code is running in browser
  if (typeof window === "undefined") return [];

  //get data from localStorage or return empty array
    try 
    {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } 
    
    catch (error) 
    {
      console.error("failed to load mood:", error);
      return []; 
    }
}

//add a new mood entry to local storage
export function addMood(entry: MoodEntry) 
{
  try 
  {
    //get existing moods
    const moods = getMoods();
    
    //add new mood to the list
    moods.push(entry);
    
    //save back to loca storage
    localStorage.setItem(KEY, JSON.stringify(moods));
  } 
  
  catch (error) 
  {
    console.error("Failed to save mood:", error);
    alert("Failed to save mood. Please try again.");
  }
}