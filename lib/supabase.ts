import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client anonyme pour les étudiants
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour le feedback
export interface CourseFeedback {
  id?: string;
  created_at?: string;
  learning_rating: number;
  enjoyment_rating: number;
  what_learned: string;
  improvements: string;
  would_recommend: 'yes' | 'no' | 'maybe';
  additional_comments?: string;
  session_date?: string;
}
