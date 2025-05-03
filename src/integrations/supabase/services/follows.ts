
import { supabase } from '../client';

// Follow helper functions
export async function followStory(userId: string, storyId: string) {
  return supabase
    .from('follows')
    .insert({ user_id: userId, story_id: storyId });
}

export async function unfollowStory(userId: string, storyId: string) {
  return supabase
    .from('follows')
    .delete()
    .eq('user_id', userId)
    .eq('story_id', storyId);
}

export async function getUserFollowedStories(userId: string) {
  return supabase
    .from('follows')
    .select('stories(*, profiles(username, avatar_url))')
    .eq('user_id', userId);
}

export async function isStoryFollowed(userId: string, storyId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select('id')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
  
  return { isFollowed: !!data, error };
}
