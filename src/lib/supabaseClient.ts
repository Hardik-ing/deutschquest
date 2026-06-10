import { createClient } from '@supabase/supabase-js';

// Replace placeholders with real project keys when connecting backend environments
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
