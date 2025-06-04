
import { supabase } from '../client';

// Auth helper functions
export async function signUp(email: string, password: string, userData: { username: string, name?: string }) {
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        name: userData.name || userData.username,
      }
    }
  });
  console.log('Sign up response:', response);
  return response;
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
  const user = await supabase.auth.getUser();
  console.log("getCurrentUser: user:", user);
  return user;
}

export async function getSession() {
  const session = await supabase.auth.getSession();
  console.log("getSession: session:", session);
  return session;
}
