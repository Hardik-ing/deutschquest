-- Supabase Database Schema for DeutschQuest

create schema if not exists deutschquest;

create table if not exists deutschquest.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  avatar text,
  native_language text,
  learning_goal text,
  created_at timestamptz default now()
);

create table if not exists deutschquest.levels (
  id text primary key,
  title text not null,
  description text,
  order_num int not null
);

create table if not exists deutschquest.quests (
  id text primary key,
  level_id text references deutschquest.levels(id) on delete cascade,
  title text not null,
  description text,
  lesson_id text,
  required_xp int default 0,
  reward_xp int default 0,
  reward_coins int default 0,
  unlocked boolean default false
);

create table if not exists deutschquest.lessons (
  id text primary key,
  level_id text references deutschquest.levels(id) on delete cascade,
  title text not null,
  description text,
  mastery_level int default 1,
  order_num int default 0
);

create table if not exists deutschquest.vocabulary (
  id uuid primary key default gen_random_uuid(),
  lesson_id text references deutschquest.lessons(id) on delete cascade,
  german_word text not null,
  english_translation text not null,
  example text,
  audio_key text,
  created_at timestamptz default now()
);

create table if not exists deutschquest.exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id text references deutschquest.lessons(id) on delete cascade,
  exercise_type text not null,
  prompt text not null,
  options text[] not null,
  answer text not null,
  audio_key text,
  image_url text
);

create table if not exists deutschquest.progress (
  user_id uuid references deutschquest.users(id) on delete cascade,
  xp int default 0,
  coins int default 0,
  streak int default 0,
  completed_lessons text[] default array[]::text[],
  completed_quests text[] default array[]::text[],
  achievements text[] default array[]::text[],
  mastery jsonb default '{}'::jsonb,
  last_lesson_id text,
  primary key(user_id)
);

create table if not exists deutschquest.achievements (
  id text primary key,
  title text not null,
  description text,
  icon text
);

create table if not exists deutschquest.leaderboards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references deutschquest.users(id),
  period text not null,
  xp int default 0,
  created_at timestamptz default now()
);

create table if not exists deutschquest.streaks (
  user_id uuid references deutschquest.users(id) on delete cascade,
  current_streak int default 0,
  longest_streak int default 0,
  updated_at timestamptz default now(),
  primary key(user_id)
);

create table if not exists deutschquest.audio_data (
  id uuid primary key default gen_random_uuid(),
  lesson_id text references deutschquest.lessons(id),
  key text,
  language text,
  url text,
  created_at timestamptz default now()
);
