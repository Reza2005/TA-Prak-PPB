// src/config/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  
  console.error("⚠️ Peringatan Kritis: Supabase URL atau Anon Key (VITE_SUPABASE_...) tidak ditemukan di file .env Anda. Aplikasi mungkin tidak berfungsi.");
  
  const tempUrl = "https://oyawuswcalhsfdiqenqc.supabase.co";
  const tempKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YXd1c3djYWxoc2ZkaXFlbnFjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM0MDQzOSwiZXhwIjoyMDc5OTE2NDM5fQ._P94ftmPGGs5R2zuBed9BEf_0wCmh89NeK7EKkF-8sE";
  
  // *** PERBAIKAN: HAPUS BLOK alert() INI ***
  /*
  if (typeof window !== 'undefined') {
    alert("KONFIGURASI HILANG: Harap isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env Anda.");
  }
  */
  // *****************************************

  supabase = createClient(tempUrl, tempKey); 
  
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };