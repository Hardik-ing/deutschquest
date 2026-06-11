import { createClient } from '@supabase/supabase-js';

const supabaseUrl = typeof window !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL 
  ? import.meta.env.VITE_SUPABASE_URL 
  : 'https://placeholder-your-project.supabase.co';

const supabaseAnonKey = typeof window !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY 
  ? import.meta.env.VITE_SUPABASE_ANON_KEY 
  : 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
