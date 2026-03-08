import {MoodType} from "@/types/mood";

export const MOODS: 
{
  type: MoodType;
  label: string;
  emoji: string;
  score: number;
  messages: string[];
}[] = 
[
  {
    type: "great",
    label: "Great",
    emoji: "😄",
    score: 5,
    messages: [
      "You’re doing great today! Keep it up!",
      "Love this vibe today!",
      "Looks like a pretty good day for you.",
    ],
  },

  {
    type: "good",
    label: "Good",
    emoji: "😊",
    score: 4,
    messages: 
    [
      "Glad to see you’re doing quite well today.",
      "Nice! A good day is always worth enjoying.",
      "Keep this gentle positive energy going.",
    ],
  },

  {
    type: "okay",
    label: "Okay",
    emoji: "😐",
    score: 3,
    messages: 
    [
      "An okay day is perfectly fine.",
      "Go at your own pace today. You’re doing fine.",
      "It’s okay if today is just a normal day.",
    ],
  },

  {
    type: "bad",
    label: "Bad",
    emoji: "😕",
    score: 2,
    messages: 
    [
      "Oh no, maybe grab some good food or take a walk.",
      "It’s okay to have a rough day. Be kind to yourself.",
      "Take a deep breath. Tomorrow can feel different.",
    ],
  },

  {
    type: "awful",
    label: "Awful",
    emoji: "😢",
    score: 1,
    messages: 
    [
      "I’m sorry today feels so heavy. Please rest a little.",
      "Today is just one day, it won’t last forever.",
      "Take today one small step at a time.",
    ],
  },
];