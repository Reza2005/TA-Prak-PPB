// src/config/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Ambil variabel dari .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inisialisasi Klien Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);