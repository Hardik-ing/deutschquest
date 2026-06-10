-- Extended schema and seed data for German Language learner

-- ENUMS
CREATE TYPE IF NOT EXISTS exercise_type AS ENUM ('translation', 'matching', 'listening', 'speaking', 'fill_blank', 'image_quiz');
CREATE TYPE IF NOT EXISTS mastery_level AS ENUM ('Beginner', 'Good', 'Strong', 'Expert', 'Mastered');

-- USERS PROFILE EXTENSION
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    username TEXT NOT NULL,
    native_lang TEXT DEFAULT 'English',
    learning_goal TEXT DEFAULT 'Casual',
    xp INT DEFAULT 0 CHECK (xp >= 0),
    coins INT DEFAULT 0 CHECK (coins >= 0),
    streak INT DEFAULT 0 CHECK (streak >= 0),
    current_level_id INT DEFAULT 1,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- LEVELS
CREATE TABLE IF NOT EXISTS public.levels (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    sequence_order INT NOT NULL UNIQUE
);

-- QUESTS
CREATE TABLE IF NOT EXISTS public.quests (
    id SERIAL PRIMARY KEY,
    level_id INT REFERENCES public.levels(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sequence_order INT NOT NULL,
    xp_reward INT DEFAULT 50,
    coins_reward INT DEFAULT 10
);

-- LESSONS
CREATE TABLE IF NOT EXISTS public.lessons (
    id SERIAL PRIMARY KEY,
    quest_id INT REFERENCES public.quests(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    sequence_order INT NOT NULL
);

-- EXERCISES
CREATE TABLE IF NOT EXISTS public.exercises (
    id SERIAL PRIMARY KEY,
    lesson_id INT REFERENCES public.lessons(id) ON DELETE CASCADE,
    type exercise_type NOT NULL,
    question_text TEXT NOT NULL,
    german_audio_text TEXT,
    correct_answer TEXT NOT NULL,
    options TEXT[] NOT NULL,
    image_url TEXT
);

-- USER PROGRESS TRACKING
CREATE TABLE IF NOT EXISTS public.user_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id INT REFERENCES public.lessons(id) ON DELETE CASCADE,
    mastery mastery_level DEFAULT 'Beginner',
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unique_user_lesson UNIQUE(user_id, lesson_id)
);

-- ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
    id SERIAL PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL
);

-- USER ACHIEVEMENTS LINK TABLE
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id INT REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT unique_user_achievement UNIQUE(user_id, achievement_id)
);

-- SEED DATA INITIALIZATION
INSERT INTO public.levels (id, title, description, sequence_order) VALUES
(1, 'Level 1: German Basics', 'Learn core greetings, introductions, and essential structures.', 1),
(2, 'Level 2: Daily Life', 'Family, food, shopping, and everyday environments.', 2),
(3, 'Level 3: Grammar Foundations', 'Master articles, pronouns, and verb conjugations.', 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.quests (id, level_id, title, sequence_order, xp_reward, coins_reward) VALUES
(1, 1, 'Greetings & Core Basics', 1, 50, 10),
(2, 1, 'Numbers & Colors', 2, 60, 15)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.lessons (id, quest_id, title, sequence_order) VALUES
(1, 1, 'Hello & Good Morning', 1),
(2, 1, 'Saying Goodbye', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.exercises (lesson_id, type, question_text, german_audio_text, correct_answer, options) VALUES
(1, 'translation', 'Translate: Good Morning', 'Guten Morgen', 'Guten Morgen', ARRAY['Guten Morgen', 'Guten Abend', 'Hallo', 'Tschüss']),
(1, 'fill_blank', 'Ich _____ Hardik.', 'Ich heiße Hardik.', 'heiße', ARRAY['heiße', 'bin', 'ist', 'und']),
(1, 'speaking', 'Speak this phrase clearly:', 'Hallo, wie geht es dir?', 'Hallo, wie geht es dir?', ARRAY['Hallo, wie geht es dir?'])
ON CONFLICT DO NOTHING;

INSERT INTO public.achievements (code, title, description, icon) VALUES
('first_word', '🥉 First Word', 'Completed your very first translation exercise successfully!', 'Award'),
('first_lesson', '🥈 First Lesson', 'Finished a complete language study lesson module.', 'BookOpen'),
('level_one', '🥇 German Beginner', 'Successfully conquered all elements of Level 1 Basics.', 'Trophy')
ON CONFLICT (code) DO NOTHING;
