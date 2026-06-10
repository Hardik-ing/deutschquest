import type { AppState, Lesson, ProgressState, Quest, UserData } from '../types';

export const mockUser: UserData = {
  id: 'user-1234',
  name: 'Lukas',
  email: 'lukas@example.com',
  avatar: 'https://api.dicebear.com/6.x/identicon/svg?seed=DeutschQuest',
  learningGoal: 'Fluent conversation in travel and work',
  nativeLanguage: 'English',
};

export const defaultProgress: ProgressState = {
  xp: 120,
  coins: 82,
  streak: 4,
  completedLessons: ['level-1-lesson-1'],
  completedQuests: ['greeting-quest'],
  achievements: ['first-word'],
  lastLessonId: 'level-1-lesson-1',
  mastery: { 'level-1-lesson-1': 2 },
};

export const questList: Quest[] = [
  {
    id: 'greeting-quest',
    title: 'Begrüßungen meistern',
    description: 'Lerne hallo, guten morgen und tschüss.',
    lessonId: 'level-1-lesson-1',
    requiredXp: 0,
    rewardXp: 25,
    rewardCoins: 10,
    completed: true,
    unlocked: true,
  },
  {
    id: 'intro-quest',
    title: 'Vorstellungen üben',
    description: 'Sag deinen Namen und frag nach dem Befinden.',
    lessonId: 'level-1-lesson-2',
    requiredXp: 25,
    rewardXp: 35,
    rewardCoins: 12,
    completed: false,
    unlocked: true,
  },
  {
    id: 'numbers-quest',
    title: 'Zahlen festigen',
    description: 'Zähle auf Deutsch bis 20.',
    lessonId: 'level-1-lesson-3',
    requiredXp: 60,
    rewardXp: 30,
    rewardCoins: 8,
    completed: false,
    unlocked: false,
  },
  {
    id: 'colors-quest',
    title: 'Farben erkennen',
    description: 'Lerne die Farben im Alltag.',
    lessonId: 'level-1-lesson-4',
    requiredXp: 90,
    rewardXp: 30,
    rewardCoins: 8,
    completed: false,
    unlocked: false,
  },
  {
    id: 'weekday-quest',
    title: 'Wochentage üben',
    description: 'Sage Tage der Woche richtig.',
    lessonId: 'level-1-lesson-5',
    requiredXp: 110,
    rewardXp: 35,
    rewardCoins: 10,
    completed: false,
    unlocked: false,
  },
];

export const achievementsData = [
  { id: 'first-word', title: '🥉 Erstes Wort', description: 'Lerne dein erstes deutsches Wort.', icon: '🟢', completed: true },
  { id: 'first-lesson', title: '🥈 Erste Lektion', description: 'Schließe deine erste Lektion ab.', icon: '✨', completed: false },
  { id: 'first-level', title: '🥇 Erster Level', description: 'Schließe Level 1 ab.', icon: '🏆', completed: false },
  { id: 'seven-day-streak', title: '🔥 7 Tage Serie', description: 'Baue eine 7-Tage Serie auf.', icon: '🔥', completed: false },
  { id: 'thousand-xp', title: '⭐ 1000 XP', description: 'Sammle 1000 XP.', icon: '🌟', completed: false },
  { id: 'german-explorer', title: '🏆 Deutscher Entdecker', description: 'Erkunde mehrere Themenbereiche.', icon: '🧭', completed: false },
];

export const lessons: Lesson[] = [
  {
    id: 'level-1-lesson-1',
    title: 'Greetings',
    description: 'Learn basic German greetings and polite farewells.',
    mastery: 2,
    words: [
      { word: 'Hallo', translation: 'Hello', example: 'Hallo! Wie geht es dir?', pronunciation: 'HAL-loh', audioKey: 'hallo' },
      { word: 'Guten Morgen', translation: 'Good morning', example: 'Guten Morgen, wie hast du geschlafen?', pronunciation: 'GOO-ten MOR-gen', audioKey: 'guten-morgen' },
      { word: 'Guten Abend', translation: 'Good evening', example: 'Guten Abend! Schön dich zu sehen.', pronunciation: 'GOO-ten AH-bent', audioKey: 'guten-abend' },
      { word: 'Tschüss', translation: 'Bye', example: 'Tschüss, bis morgen!', pronunciation: 'CHOOS', audioKey: 'tschuss' },
    ],
    exercises: [
      {
        id: 'translation-1',
        type: 'translation',
        prompt: 'Translate: Good Morning',
        options: ['Guten Morgen', 'Guten Abend', 'Hallo', 'Tschüss'],
        answer: 'Guten Morgen',
        audio: 'guten-morgen',
      },
      {
        id: 'fill-1',
        type: 'fill',
        prompt: 'Ich _____ Lukas.',
        options: ['heiße', 'bin', 'ist', 'habe'],
        answer: 'heiße',
      },
      {
        id: 'listening-1',
        type: 'listening',
        prompt: 'Which greeting did you hear?',
        options: ['Hallo', 'Tschüss', 'Guten Abend', 'Guten Morgen'],
        answer: 'Hallo',
        audio: 'hallo',
      },
      {
        id: 'pronunciation-1',
        type: 'pronunciation',
        prompt: 'Say: Guten Abend',
        options: ['Guten Abend'],
        answer: 'Guten Abend',
      },
    ],
  },
  {
    id: 'level-1-lesson-2',
    title: 'Introductions',
    description: 'Introduce yourself and ask about others.',
    mastery: 1,
    words: [
      { word: 'Ich', translation: 'I', example: 'Ich heiße Lukas.', pronunciation: 'ikh', audioKey: 'ich' },
      { word: 'heiße', translation: 'am called', example: 'Ich heiße Anna.', pronunciation: 'HY-se', audioKey: 'heisse' },
      { word: 'Wie', translation: 'How', example: 'Wie heißt du?', pronunciation: 'vee', audioKey: 'wie' },
      { word: 'bist', translation: 'are', example: 'Wie alt bist du?', pronunciation: 'bist', audioKey: 'bist' },
    ],
    exercises: [
      {
        id: 'translation-2',
        type: 'translation',
        prompt: 'Translate: I am called Lukas',
        options: ['Ich heiße Lukas', 'Ich bin Lukas', 'Ich habe Lukas', 'Ich mag Lukas'],
        answer: 'Ich heiße Lukas',
      },
      {
        id: 'match-1',
        type: 'match',
        prompt: 'Match the German word to English',
        options: ['Ich - I', 'bist - are', 'Wie - How', 'heiße - am called'],
        answer: 'Ich - I',
      },
      {
        id: 'speed-1',
        type: 'speed',
        prompt: 'Choose the correct answer before time runs out.',
        options: ['Ich heiße Anna', 'Ich habe Anna', 'Ich bin Anna', 'Ich mag Anna'],
        answer: 'Ich heiße Anna',
      },
    ],
  },
];

export const timelessMotivation = [
  '🔥 Du bist auf dem Weg zum täglichen Lernen!',
  '🚀 Nur 20 XP bis zum nächsten Level!',
  '⭐ Du hast heute 10 neue Wörter gelernt!',
  '🏆 Dein Deutsch-Level wächst weiter.',
  '💪 Halte durch und sammle deine Belohnungen.',
];
