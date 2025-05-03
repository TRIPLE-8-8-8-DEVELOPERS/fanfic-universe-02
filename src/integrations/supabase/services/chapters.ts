
import { supabase } from '../client';

// Chapter helper functions
export async function getChaptersByStoryId(storyId: string) {
  return supabase
    .from('chapters')
    .select('*')
    .eq('story_id', storyId)
    .order('chapter_number', { ascending: true });
}

export async function getChapterById(chapterId: string) {
  return supabase
    .from('chapters')
    .select('*, stories(title, author_id, profiles(username, avatar_url))')
    .eq('id', chapterId)
    .single();
}

export async function createChapter(chapterData: any) {
  return supabase
    .from('chapters')
    .insert(chapterData);
}

export async function updateChapter(chapterId: string, updates: any) {
  return supabase
    .from('chapters')
    .update(updates)
    .eq('id', chapterId);
}

export async function deleteChapter(chapterId: string) {
  return supabase
    .from('chapters')
    .delete()
    .eq('id', chapterId);
}
