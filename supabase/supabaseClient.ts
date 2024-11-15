import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabaseKey);
