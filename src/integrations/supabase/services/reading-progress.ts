
import { supabase } from '../client';

export async function getReadingProgress(userId: string, storyId: string) {
  // Using explicit type cast to any to bypass TypeScript restrictions for now
  return (supabase as any)
    .from('reading_progress')
    .select(`*`)
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
}

export async function getReadingHistory(userId: string, limit = 10) {
  // Using explicit type cast to any to bypass TypeScript restrictions for now
  return (supabase as any)
    .from('reading_progress')
    .select(`
      *,
      story:stories(
        id,
        title,
        cover_image,
        author:profiles(
          username,
          display_name,
          avatar_url
        )
      )
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit);
}

export async function updateReadingTime(userId: string, storyId: string, secondsToAdd: number) {
  // Using explicit type cast to any to bypass TypeScript restrictions
  const { data, error } = await (supabase as any)
    .from('reading_progress')
    .select('time_spent_seconds')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching reading time:', error);
    return { data: null, error };
  }
  
  const newTimeSpent = (data?.time_spent_seconds || 0) + secondsToAdd;
  
  // If record exists, update it
  if (data) {
    return (supabase as any)
      .from('reading_progress')
      .update({ 
        time_spent_seconds: newTimeSpent,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('story_id', storyId);
  }
  
  // If no record exists, create one
  return (supabase as any)
    .from('reading_progress')
    .insert({
      user_id: userId,
      story_id: storyId,
      time_spent_seconds: secondsToAdd,
      chapters_read: 0,
      progress_percentage: 0
    });
}

export async function updateReadingProgress(
  userId: string, 
  storyId: string, 
  progressData: {
    progress_percentage?: number,
    chapters_read?: number,
    last_read_chapter_id?: string,
    last_read_position?: number
  }
) {
  // Check if a record exists
  const { data, error } = await (supabase as any)
    .from('reading_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
    
  // If there's an error other than "no rows returned"
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching reading progress:', error);
    return { data: null, error };
  }
  
  // Update data with timestamp
  const updateData = {
    ...progressData,
    updated_at: new Date().toISOString()
  };
  
  // If record exists, update it
  if (data) {
    return (supabase as any)
      .from('reading_progress')
      .update(updateData)
      .eq('user_id', userId)
      .eq('story_id', storyId);
  }
  
  // If no record exists, create one with defaults + the provided data
  return (supabase as any)
    .from('reading_progress')
    .insert({
      user_id: userId,
      story_id: storyId,
      progress_percentage: progressData.progress_percentage || 0,
      chapters_read: progressData.chapters_read || 0,
      last_read_chapter_id: progressData.last_read_chapter_id || null,
      last_read_position: progressData.last_read_position || null,
      time_spent_seconds: 0
    });
}
