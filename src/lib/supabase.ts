import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// We use the anon key for client-side operations
// In Server Components, we can use the same since data is public or RLS handles it
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
