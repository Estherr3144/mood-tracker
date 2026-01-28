import { MoodType } from "@/types/mood";

export const MOODS: {
  type: MoodType;
  label: string;
  emoji: string;
  score: number;
}[] = [
  { type: "great", label: "Great", emoji: "😄", score: 5 },
  { type: "good",  label: "Good",  emoji: "🙂", score: 4 },
  { type: "okay",  label: "Okay",  emoji: "😐", score: 3 },
  { type: "bad",   label: "Bad",   emoji: "😕", score: 2 },
  { type: "awful", label: "Awful", emoji: "😢", score: 1 },
];
