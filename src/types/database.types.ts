export type ExerciseType = 'translation' | 'matching' | 'listening' | 'speaking' | 'fill_blank' | 'image_quiz';
export type MasteryLevel = 'Beginner' | 'Good' | 'Strong' | 'Expert' | 'Mastered';

export interface Profile {
  id: string;
  username: string;
  native_lang: string;
  learning_goal: string;
  xp: number;
  coins: number;
  streak: number;
  current_level_id: number;
  avatar_url: string | null;
  sound_enabled: boolean; // 👈 New sound control variable tracking user preference
  is_premium: boolean; // 👈 Tracks if levels 20-100 are unlocked
}

export interface Level {
  id: number;
  title: string;
  description: string;
  sequence_order: number;
}

export interface Quest {
  id: number;
  level_id: number;
  title: string;
  sequence_order: number;
  xp_reward: number;
  coins_reward: number;
  completed?: boolean;
}

export interface Lesson {
  id: number;
  quest_id: number;
  title: string;
  sequence_order: number;
}

export interface Exercise {
  id: number;
  lesson_id: number;
  type: ExerciseType;
  question_text: string;
  german_audio_text?: string;
  correct_answer: string;
  options: string[];
  image_url?: string;
}

export interface UserProgress {
  id: number;
  user_id: string;
  lesson_id: number;
  mastery: MasteryLevel;
  completed_at: string;
}

export interface Achievement {
  id: number;
  code: string;
  title: string;
  description: string;
  icon: string;
}
