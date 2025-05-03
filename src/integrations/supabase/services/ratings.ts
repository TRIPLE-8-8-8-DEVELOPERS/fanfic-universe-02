
import { supabase } from '../client';

// Ratings helper functions
export async function getRating(userId: string, storyId: string) {
  return supabase
    .from('ratings')
    .select('*')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
}

export async function addRating(userId: string, storyId: string, rating: number) {
  return supabase
    .from('ratings')
    .insert({
      user_id: userId,
      story_id: storyId,
      rating
    });
}

export async function updateRating(ratingId: string, rating: number) {
  return supabase
    .from('ratings')
    .update({ rating })
    .eq('id', ratingId);
}

export async function deleteRating(ratingId: string) {
  return supabase
    .from('ratings')
    .delete()
    .eq('id', ratingId);
}

export async function getStoryAverageRating(storyId: string) {
  return supabase
    .rpc('get_story_average_rating', {
      story_id: storyId
    } as any); // Type assertion to bypass TypeScript error
}

export async function getStoryRatingsCount(storyId: string) {
  return supabase
    .from('ratings')
    .select('id', { count: 'exact', head: true })
    .eq('story_id', storyId);
}
