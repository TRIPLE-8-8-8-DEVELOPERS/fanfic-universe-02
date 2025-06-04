
import { supabase } from '../client';

// Profile helper functions
export async function getProfile(userId: string) {
  console.log("Fetching profile data from database for userId:", userId);
  console.log("Request origin:", window.location.origin);
  
  // Log the userId being used in the query
  console.log("getProfile: userId:", userId);

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  console.log("Data fetched from database:", data);
  console.log("Error fetching from database:", error);
  
  return { data, error };
}

export async function updateProfile(userId: string, updates: any) {
  return supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
}
