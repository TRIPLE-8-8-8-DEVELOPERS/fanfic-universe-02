
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
  // Calculate average rating directly from the ratings table
  const { data, error } = await supabase
    .from('ratings')
    .select('rating')
    .eq('story_id', storyId);
    
  if (error || !data || data.length === 0) {
    return { data: 0, error };
  }
  
  // Calculate the average
  const sum = data.reduce((acc, curr) => acc + curr.rating, 0);
  const average = sum / data.length;
  
  return { data: average, error: null };
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
