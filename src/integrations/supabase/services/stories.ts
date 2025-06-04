
import { supabase } from '../client';

// Story helper functions
export async function getStories(limit = 10, page = 0) {
  return supabase
    .from('stories')
    .select('*, profiles(username, avatar_url)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
}

export async function getStoryById(storyId: string) {
  return supabase
    .from('stories')
    .select('*, profiles(username, avatar_url)')
    .eq('id', storyId)
    .single();
}

export async function getUserStories(userId: string) {
  console.log("getUserStories: userId:", userId);
  const result = supabase
    .from('stories')
    .select('*')
    .eq('author_id', userId)
    .order('created_at', { ascending: false });
  console.log("getUserStories: result:", result);
  return result;
}

export async function createStory(storyData: any) {
  const result = supabase
    .from('stories')
    .insert(storyData);
  console.log("createStory result:", result);
  return result;
}

export async function updateStory(storyId: string, updates: any) {
  return supabase
    .from('stories')
    .update(updates)
    .eq('id', storyId);
}

export async function deleteStory(storyId: string) {
  return supabase
    .from('stories')
    .delete()
    .eq('id', storyId);
}
