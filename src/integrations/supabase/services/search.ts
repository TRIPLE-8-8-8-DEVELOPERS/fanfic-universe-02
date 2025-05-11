
import { supabase } from '../client';

export type SearchResultType = 'story' | 'author' | 'community' | 'tag';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  imageUrl?: string;
  author?: string;
  authorId?: string;
  url: string;
}

export interface SearchParams {
  query: string;
  types?: SearchResultType[];
  limit?: number;
  page?: number;
}

export const searchAll = async ({ query, types = ['story', 'author', 'community', 'tag'], limit = 20, page = 0 }: SearchParams): Promise<{
  results: SearchResult[];
  total: number;
}> => {
  if (!query || query.length < 2) {
    return { results: [], total: 0 };
  }

  const searchPromises = [];
  const trimmedQuery = query.trim();

  if (types.includes('story')) {
    searchPromises.push(searchStories(trimmedQuery, limit, page));
  }

  if (types.includes('author')) {
    searchPromises.push(searchAuthors(trimmedQuery, limit, page));
  }

  if (types.includes('community')) {
    searchPromises.push(searchCommunities(trimmedQuery, limit, page));
  }

  if (types.includes('tag')) {
    searchPromises.push(searchTags(trimmedQuery, limit, page));
  }

  const results = await Promise.all(searchPromises);
  
  // Combine and sort results by relevance
  const combinedResults = results.flatMap(r => r.results);
  const totalCount = results.reduce((acc, result) => acc + result.total, 0);
  
  return {
    results: combinedResults,
    total: totalCount
  };
};

export const searchStories = async (query: string, limit = 10, page = 0): Promise<{
  results: SearchResult[];
  total: number;
}> => {
  const { data, error, count } = await supabase
    .from('stories')
    .select('*, profiles!inner(username, display_name, avatar_url)', { count: 'exact' })
    .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    console.error('Error searching stories:', error);
    return { results: [], total: 0 };
  }

  const results = data?.map(story => ({
    id: story.id,
    type: 'story' as SearchResultType,
    title: story.title,
    description: story.summary,
    imageUrl: story.cover_image,
    author: story.profiles.display_name || story.profiles.username,
    authorId: story.author_id,
    url: `/story/${story.id}`
  })) || [];

  return { results, total: count || 0 };
};

export const searchAuthors = async (query: string, limit = 10, page = 0): Promise<{
  results: SearchResult[];
  total: number;
}> => {
  const { data, error, count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .or(`username.ilike.%${query}%,display_name.ilike.%${query}%,bio.ilike.%${query}%`)
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    console.error('Error searching authors:', error);
    return { results: [], total: 0 };
  }

  const results = data?.map(profile => ({
    id: profile.id,
    type: 'author' as SearchResultType,
    title: profile.display_name || profile.username,
    description: profile.bio,
    imageUrl: profile.avatar_url,
    url: `/profile/${profile.username}`
  })) || [];

  return { results, total: count || 0 };
};

export const searchCommunities = async (query: string, limit = 10, page = 0): Promise<{
  results: SearchResult[];
  total: number;
}> => {
  // This would be implemented when we have a communities table
  // For now, returning empty results
  return { results: [], total: 0 };
};

export const searchTags = async (query: string, limit = 10, page = 0): Promise<{
  results: SearchResult[];
  total: number;
}> => {
  const { data, error, count } = await supabase
    .from('tags')
    .select('*', { count: 'exact' })
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    console.error('Error searching tags:', error);
    return { results: [], total: 0 };
  }

  const results = data?.map(tag => ({
    id: tag.id,
    type: 'tag' as SearchResultType,
    title: tag.name,
    description: tag.description,
    url: `/browse?tag=${tag.name}`
  })) || [];

  return { results, total: count || 0 };
};
