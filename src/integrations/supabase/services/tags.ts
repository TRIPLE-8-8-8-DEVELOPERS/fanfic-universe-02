
import { supabase } from '../client';

// Tags helper functions
export async function getTags() {
  return supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true });
}

export async function getStoryTags(storyId: string) {
  return supabase
    .from('story_tags')
    .select('tags(*)')
    .eq('story_id', storyId);
}

export async function addTagToStory(storyId: string, tagId: string) {
  return supabase
    .from('story_tags')
    .insert({ story_id: storyId, tag_id: tagId });
}

export async function removeTagFromStory(storyId: string, tagId: string) {
  return supabase
    .from('story_tags')
    .delete()
    .eq('story_id', storyId)
    .eq('tag_id', tagId);
}
