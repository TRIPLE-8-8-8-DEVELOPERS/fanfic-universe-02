
import { supabase } from '../client';

// Get reading progress for a specific story and user
export async function getReadingProgress(userId: string, storyId: string) {
  return supabase
    .from('reading_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('story_id', storyId)
    .single();
}

// Update reading progress
export async function updateReadingProgress(
  userId: string, 
  storyId: string, 
  progressData: {
    progress_percentage?: number;
    last_read_chapter_id?: string;
    chapters_read?: number;
    time_spent_seconds?: number;
    last_read_position?: number;
  }
) {
  return supabase
    .from('reading_progress')
    .upsert({
      user_id: userId,
      story_id: storyId,
      updated_at: new Date().toISOString(),
      ...progressData
    }, {
      onConflict: 'user_id,story_id'
    });
}

// Track reading time
export async function trackReadingTime(userId: string, storyId: string, seconds: number) {
  const { data } = await getReadingProgress(userId, storyId);
  
  const currentTimeSpent = data?.time_spent_seconds || 0;
  const newTimeSpent = currentTimeSpent + seconds;
  
  return updateReadingProgress(userId, storyId, {
    time_spent_seconds: newTimeSpent
  });
}

// Mark chapter as read
export async function markChapterAsRead(userId: string, storyId: string, chapterId: string) {
  const { data } = await getReadingProgress(userId, storyId);
  
  const chaptersRead = data?.chapters_read || 0;
  
  return updateReadingProgress(userId, storyId, {
    last_read_chapter_id: chapterId,
    chapters_read: chaptersRead + 1
  });
}

// Get reading history for a user
export async function getReadingHistory(userId: string, limit = 10) {
  return supabase
    .from('reading_progress')
    .select(`
      *,
      story:stories (
        id,
        title,
        cover_image,
        author:profiles!author_id (username, display_name, avatar_url)
      )
    `)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .limit(limit);
}
