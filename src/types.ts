export type ThemeMode = 'light' | 'dark';

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
};

export type LevelTopic = {
  title: string;
  description: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  mastery: number;
  exercises: Exercise[];
  words: VocabularyWord[];
};

export type Exercise = {
  id: string;
  type: 'translation' | 'listening' | 'pronunciation' | 'fill' | 'match' | 'image' | 'speed';
  prompt: string;
  options: string[];
  answer: string;
  audio?: string;
  image?: string;
};

export type VocabularyWord = {
  word: string;
  translation: string;
  example: string;
  pronunciation: string;
  audioKey: string;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  requiredXp: number;
  rewardXp: number;
  rewardCoins: number;
  completed: boolean;
  unlocked: boolean;
};

export type ProgressState = {
  xp: number;
  coins: number;
  streak: number;
  completedLessons: string[];
  completedQuests: string[];
  achievements: string[];
  lastLessonId: string | null;
  mastery: Record<string, number>;
};

export type UserData = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  learningGoal: string;
  nativeLanguage: string;
};

export type AppState = {
  user: UserData | null;
  progress: ProgressState;
  theme: ThemeMode;
  toast: string | null;
};
