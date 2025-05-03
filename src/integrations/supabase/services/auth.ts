
import { supabase } from '../client';

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
