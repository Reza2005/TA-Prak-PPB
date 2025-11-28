import { createClient } from '@supabase/supabase-js';

// Pastikan variabel ini sudah didefinisikan di file .env Anda
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 1. Deklarasikan variabel Supabase di tingkat global (tanpa export)
let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  // Jika kunci tidak ada, beri peringatan keras
  console.error("⚠️ Peringatan Kritis: Supabase URL atau Anon Key (VITE_SUPABASE_...) tidak ditemukan di file .env Anda. Aplikasi mungkin tidak berfungsi.");
  
  const tempUrl = "http://localhost:54321";
  const tempKey = "anon_key_placeholder";
  
  if (typeof window !== 'undefined') {
    // Kami sarankan menggunakan alert hanya untuk memberitahu pengguna di Canvas.
    alert("KONFIGURASI HILANG: Harap isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env Anda.");
  }
  
  // 2. Tetapkan nilai placeholder (di dalam blok if)
  supabase = createClient(tempUrl, tempKey); 
  
} else {
  // 2. Tetapkan nilai dengan kunci yang benar (di dalam blok else)
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// 3. Export variabel di tingkat top-level (setelah if/else selesai)
export { supabase };