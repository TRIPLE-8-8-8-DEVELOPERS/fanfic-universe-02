
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bhgwipcwsndpyvrzcpma.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoZ3dpcGN3c25kcHl2cnpjcG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTI5NTMsImV4cCI6MjA1MTc2ODk1M30.zWVIQ0byaasTeVdNMRxwY47UczGS5O7pJxGmvu5u3ew";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth helper functions
export async function signUp(email: string, password: string, userData: { username: string, name?: string }) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        name: userData.name || userData.username,
      }
    }
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function updatePassword(password: string) {
  return supabase.auth.updateUser({
    password
  });
}

export async function getCurrentUser() {
  return supabase.auth.getUser();
}

export async function getSession() {
  return supabase.auth.getSession();
}
