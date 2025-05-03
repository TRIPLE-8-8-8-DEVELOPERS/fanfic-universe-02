
import { supabase } from '../client';

// Profile helper functions
export async function getProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
}

export async function updateProfile(userId: string, updates: any) {
  return supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
}
