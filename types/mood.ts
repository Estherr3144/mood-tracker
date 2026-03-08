export type MoodType =
  | "great"
  | "good"
  | "okay"
  | "bad"
  | "awful";

export type MoodEntry = 
{
  id: string;
  date: string;
  //mood: number;
  score: number;
  //createdAt: string;
};