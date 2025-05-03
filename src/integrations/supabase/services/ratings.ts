
import { supabase } from '../client';

// Rating helper functions
export async function rateStory(userId: string, storyId: string, rating: number) {
  // Check if user already rated this story
  const { data: existingRating } = await supabase
    .from('ratings')
    .select('*')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
  
  if (existingRating) {
    // Update existing rating
    return supabase
      .from('ratings')
      .update({ rating, updated_at: new Date().toISOString() })
      .eq('id', existingRating.id);
  } else {
    // Create new rating
    return supabase
      .from('ratings')
      .insert({ user_id: userId, story_id: storyId, rating });
  }
}

export async function getUserRating(userId: string, storyId: string) {
  return supabase
    .from('ratings')
    .select('rating')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
}

export async function getStoryAverageRating(storyId: string) {
  try {
    const { data, error } = await supabase.rpc(
      'get_story_average_rating',
      { story_id: storyId } as { story_id: string }
    );
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting story average rating:', error);
    throw error;
  }
}
