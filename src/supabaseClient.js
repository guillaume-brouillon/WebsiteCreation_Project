import { createClient } from '@supabase/supabase-js'
import {url,anon} from "$lib/env"
const supabaseUrl = import.meta.env.VITE_SVELTE_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY;
console.log(anon)
export const supabase = createClient(url, anon)
import.meta.env.VITE_SVELTE_APP_SUPABASE_ANON_KEY