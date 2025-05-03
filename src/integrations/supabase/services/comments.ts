
import { supabase } from '../client';

// Comment helper functions
export async function getStoryComments(storyId: string) {
  return supabase
    .from('comments')
    .select('*, profiles(username, avatar_url)')
    .eq('story_id', storyId)
    .is('chapter_id', null)
    .order('created_at', { ascending: true });
}

export async function getChapterComments(chapterId: string) {
  return supabase
    .from('comments')
    .select('*, profiles(username, avatar_url)')
    .eq('chapter_id', chapterId)
    .order('created_at', { ascending: true });
}

export async function addComment(commentData: any) {
  return supabase
    .from('comments')
    .insert(commentData);
}

export async function updateComment(commentId: string, content: string) {
  return supabase
    .from('comments')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', commentId);
}

export async function deleteComment(commentId: string) {
  return supabase
    .from('comments')
    .delete()
    .eq('id', commentId);
}
