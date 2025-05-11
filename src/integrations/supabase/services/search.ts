
import { supabase } from '../client';

export type SearchResultType = 'story' | 'author' | 'community' | 'tag' | 'all';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  imageUrl?: string;
  author?: string;
  authorId?: string;
  url: string;
  popularity?: number;
  createdAt?: string;
  tags?: string[];
}

export interface SearchParams {
  query: string;
  types?: SearchResultType[];
  limit?: number;
  page?: number;
  sortBy?: 'relevance' | 'date' | 'popularity';
}

export const searchAll = async ({ 
  query, 
  types = ['story', 'author', 'community', 'tag'], 
  limit = 20, 
  page = 0,
  sortBy = 'relevance' 
}: SearchParams): Promise<{
  results: SearchResult[];
  total: number;
}> => {
  if (!query || query.length < 2) {
    return { results: [], total: 0 };
  }

  const searchPromises = [];
  const trimmedQuery = query.trim();

  if (types.includes('story') || types.includes('all')) {
    searchPromises.push(searchStories(trimmedQuery, limit, page));
  }

  if (types.includes('author') || types.includes('all')) {
    searchPromises.push(searchAuthors(trimmedQuery, limit, page));
  }

  if (types.includes('community') || types.includes('all')) {
    searchPromises.push(searchCommunities(trimmedQuery, limit, page));
  }

  if (types.includes('tag') || types.includes('all')) {
    searchPromises.push(searchTags(trimmedQuery, limit, page));
  }

  const results = await Promise.all(searchPromises);
  
  // Combine and sort results
  let combinedResults = results.flatMap(r => r.results);
  const totalCount = results.reduce((acc, result) => acc + result.total, 0);
  
  // Apply sorting based on the sortBy parameter
  switch (sortBy) {
    case 'date':
      combinedResults = combinedResults.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      break;
    case 'popularity':
      combinedResults = combinedResults.sort((a, b) => {
        if (typeof b.popularity !== 'number' || typeof a.popularity !== 'number') return 0;
        return b.popularity - a.popularity;
      });
      break;
    case 'relevance':
    default:
      // Already sorted by relevance from the database
      break;
  }
  
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
    .select('*, profiles!inner(username, display_name, avatar_url), story_tags!left(tag_id, tags(name))', { count: 'exact' })
    .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) {
    console.error('Error searching stories:', error);
    return { results: [], total: 0 };
  }

  const results = data?.map(story => {
    // Extract tags from the story_tags join
    const tags = story.story_tags 
      ? story.story_tags
          .filter(tag => tag.tags)
          .map(tag => tag.tags.name)
      : [];
          
    return {
      id: story.id,
      type: 'story' as SearchResultType,
      title: story.title,
      description: story.summary,
      imageUrl: story.cover_image,
      author: story.profiles.display_name || story.profiles.username,
      authorId: story.author_id,
      url: `/story/${story.id}`,
      popularity: story.views_count || story.likes_count || 0,
      createdAt: story.created_at,
      tags
    };
  }) || [];

  return { results, total: count || 0 };
};

export const searchAuthors = async (query: string, limit = 10, page = 0): Promise<{
  results: SearchResult[];
  total: number;
}> => {
  const { data, error, count } = await supabase
    .from('profiles')
    .select('*, stories(count)', { count: 'exact' })
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
    url: `/profile/${profile.username}`,
    popularity: profile.stories?.[0]?.count || 0,
    createdAt: profile.created_at
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
    .select('*, story_tags!left(story_id)', { count: 'exact' })
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
    url: `/browse?tag=${tag.name}`,
    popularity: tag.story_tags?.length || 0,
    createdAt: tag.created_at
  })) || [];

  return { results, total: count || 0 };
};

// New function to get trending search terms
export const getTrendingSearchTerms = async (limit = 5): Promise<string[]> => {
  // This would typically be implemented with a search_history table
  // For now, return mock popular search terms
  return [
    "fantasy adventure",
    "science fiction",
    "romance",
    "mystery",
    "fan fiction"
  ];
};
