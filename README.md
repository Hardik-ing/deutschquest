# DeutschQuest

A modern gamified German language learning platform built with React, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features

- Interactive lessons and quests
- Translation, listening, pronunciation, fill-in-the-blank, and speed exercises
- XP, coins, streaks, achievements, and mastery levels
- AI tutor and revision mode
- Quest map and replayable lessons
- Dashboard, leaderboard, profile, admin panel
- Audio support via Web Speech API
- Light / Dark mode
- Supabase-ready database schema

## Development

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Supabase Setup

Add environment variables in a `.env` file at the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

Use the Supabase schema in `supabase/schema.sql` to create the correct tables.

## Notes

- This app is scaffolded to run as a complete gamified learning experience.
- Use browser support for Web Speech API to enable pronunciation exercises.
- Customize levels, lessons, and quests by editing `src/data/mockData.ts`.
