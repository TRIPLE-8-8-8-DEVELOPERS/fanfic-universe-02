
import { supabase } from '../client';

// Reading list helper functions
export async function getUserReadingLists(userId: string) {
  return supabase
    .from('reading_lists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function getPublicReadingLists() {
  return supabase
    .from('reading_lists')
    .select('*, profiles(username, avatar_url)')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
}

export async function getReadingListById(listId: string) {
  return supabase
    .from('reading_lists')
    .select('*, profiles(username, avatar_url)')
    .eq('id', listId)
    .single();
}

export async function getReadingListItems(listId: string) {
  return supabase
    .from('reading_list_items')
    .select('*, stories(*, profiles(username, avatar_url))')
    .eq('reading_list_id', listId);
}

export async function createReadingList(listData: any) {
  return supabase
    .from('reading_lists')
    .insert(listData);
}

export async function updateReadingList(listId: string, updates: any) {
  return supabase
    .from('reading_lists')
    .update(updates)
    .eq('id', listId);
}

export async function deleteReadingList(listId: string) {
  return supabase
    .from('reading_lists')
    .delete()
    .eq('id', listId);
}

export async function addStoryToReadingList(listId: string, storyId: string) {
  return supabase
    .from('reading_list_items')
    .insert({ reading_list_id: listId, story_id: storyId });
}

export async function removeStoryFromReadingList(listId: string, storyId: string) {
  return supabase
    .from('reading_list_items')
    .delete()
    .eq('reading_list_id', listId)
    .eq('story_id', storyId);
}
