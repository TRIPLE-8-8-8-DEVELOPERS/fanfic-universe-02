
import { supabase } from '../client';

// Get a user's rating for a story
export async function getRating(userId: string, storyId: string) {
  return supabase
    .from('ratings')
    .select('rating')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
}

// Add or update a rating
export async function upsertRating(userId: string, storyId: string, rating: number) {
  return supabase
    .from('ratings')
    .upsert({
      user_id: userId,
      story_id: storyId,
      rating,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,story_id'
    });
}

// Get the average rating for a story
export async function getAverageRating(storyId: string) {
  // Using raw SQL for this calculation - ensure the query is properly sanitized
  const { data, error } = await supabase
    .rpc('get_average_rating', { story_id_param: storyId });
  
  return { data, error };
}

// Get popular stories based on ratings
export async function getPopularStories(limit = 10) {
  return supabase
    .from('stories')
    .select(`
      id,
      title,
      summary,
      cover_image,
      author:profiles!author_id (username, display_name, avatar_url),
      average_rating:ratings(rating)
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(limit);
}
