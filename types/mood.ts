export type MoodType =
  | "great"
  | "good"
  | "okay"
  | "bad"
  | "awful";

export interface MoodEntry {
  id: string;
  mood: MoodType;
  score: number;
  date: string;      
  createdAt: number; 
}
