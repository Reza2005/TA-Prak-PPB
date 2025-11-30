// src/api/auth.js
import { supabase } from "../config/supabaseClient";

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data?.user || null;
}

export function onAuthChange(callback) {
  // callback receives (event, session)
  const { data: listener } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );

  return () => listener?.subscription?.unsubscribe?.();
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function signInWithEmail(email) {
  // Sends a magic link by default
  const { data, error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export default {
  getCurrentUser,
  onAuthChange,
  signOut,
  signInWithEmail,
  signUpWithEmail,
};
