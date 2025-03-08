import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bhgwipcwsndpyvrzcpma.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoZ3dpcGN3c25kcHl2cnpjcG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTI5NTMsImV4cCI6MjA1MTc2ODk1M30.zWVIQ0byaasTeVdNMRxwY47UczGS5O7pJxGmvu5u3ew";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth helper functions
export async function signUp(email: string, password: string, userData: { username: string, name?: string }) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: userData.username,
        name: userData.name || userData.username,
      }
    }
  });
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
}

export async function updatePassword(password: string) {
  return supabase.auth.updateUser({
    password
  });
}

export async function getCurrentUser() {
  return supabase.auth.getUser();
}

export async function getSession() {
  return supabase.auth.getSession();
}

// Profile helper functions
export async function getProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
}

export async function updateProfile(userId: string, updates: any) {
  return supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
}

// Story helper functions
export async function getStories(limit = 10, page = 0) {
  return supabase
    .from('stories')
    .select('*, profiles(username, avatar_url)')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
}

export async function getStoryById(storyId: string) {
  return supabase
    .from('stories')
    .select('*, profiles(username, avatar_url)')
    .eq('id', storyId)
    .single();
}

export async function getUserStories(userId: string) {
  return supabase
    .from('stories')
    .select('*')
    .eq('author_id', userId)
    .order('created_at', { ascending: false });
}

export async function createStory(storyData: any) {
  return supabase
    .from('stories')
    .insert(storyData);
}

export async function updateStory(storyId: string, updates: any) {
  return supabase
    .from('stories')
    .update(updates)
    .eq('id', storyId);
}

export async function deleteStory(storyId: string) {
  return supabase
    .from('stories')
    .delete()
    .eq('id', storyId);
}

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

// Reading list helper functions
export async function getUserReadingLists(userId: string) {
  return supabase
    .from('reading_lists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function getPublicReadingLists() {
  return supabase
    .from('reading_lists')
    .select('*, profiles(username, avatar_url)')
    .eq('is_public', true)
    .order('created_at', { ascending: false });
}

export async function getReadingListById(listId: string) {
  return supabase
    .from('reading_lists')
    .select('*, profiles(username, avatar_url)')
    .eq('id', listId)
    .single();
}

export async function getReadingListItems(listId: string) {
  return supabase
    .from('reading_list_items')
    .select('*, stories(*, profiles(username, avatar_url))')
    .eq('reading_list_id', listId);
}

export async function createReadingList(listData: any) {
  return supabase
    .from('reading_lists')
    .insert(listData);
}

export async function updateReadingList(listId: string, updates: any) {
  return supabase
    .from('reading_lists')
    .update(updates)
    .eq('id', listId);
}

export async function deleteReadingList(listId: string) {
  return supabase
    .from('reading_lists')
    .delete()
    .eq('id', listId);
}

export async function addStoryToReadingList(listId: string, storyId: string) {
  return supabase
    .from('reading_list_items')
    .insert({ reading_list_id: listId, story_id: storyId });
}

export async function removeStoryFromReadingList(listId: string, storyId: string) {
  return supabase
    .from('reading_list_items')
    .delete()
    .eq('reading_list_id', listId)
    .eq('story_id', storyId);
}

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

// Jobs helper functions
export async function getJobs(limit = 10, page = 0) {
  return supabase
    .from('jobs')
    .select('*')
    .order('posted', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
}

export async function getJobById(jobId: string) {
  return supabase
    .from('jobs')
    .select('*')
    .eq('id', jobId)
    .single();
}

export async function getJobsByCategory(category: string, limit = 10, page = 0) {
  return supabase
    .from('jobs')
    .select('*')
    .eq('category', category)
    .order('posted', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
}

export async function getJobsByType(type: string, limit = 10, page = 0) {
  return supabase
    .from('jobs')
    .select('*')
    .eq('type', type)
    .order('posted', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
}

export async function searchJobs(query: string, limit = 10, page = 0) {
  return supabase
    .from('jobs')
    .select('*')
    .or(`title.ilike.%${query}%, description.ilike.%${query}%`)
    .order('posted', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);
}

export async function createJob(jobData: any) {
  return supabase
    .from('jobs')
    .insert(jobData);
}

export async function updateJob(jobId: string, updates: any) {
  return supabase
    .from('jobs')
    .update(updates)
    .eq('id', jobId);
}

export async function deleteJob(jobId: string) {
  return supabase
    .from('jobs')
    .delete()
    .eq('id', jobId);
}

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
    const { data, error } = await supabase
      .rpc('get_story_average_rating', { story_id: storyId } as any);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting story average rating:', error);
    throw error;
  }
}
