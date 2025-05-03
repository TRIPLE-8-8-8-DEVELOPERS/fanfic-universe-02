
import { getJobs as fetchJobs, getJobById as fetchJobById } from "@/integrations/supabase/services/jobs";
import { JobType } from "@/types/job";

export const getJobs = async (): Promise<JobType[]> => {
  const { data, error } = await fetchJobs();
  
  if (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
  
  // Cast data to JobType array with proper type casting
  return (data || []).map(job => ({
    ...job,
    type: job.type as "full-time" | "part-time" | "contract" | "freelance" | "remote",
    category: job.category as "writing" | "editing" | "marketing" | "design" | "development" | "community" | "content" | "other"
  }));
};

export const getFeaturedJobs = async (): Promise<JobType[]> => {
  const { data, error } = await fetchJobs();
  
  if (error) {
    console.error('Error fetching featured jobs:', error);
    throw error;
  }
  
  // Filter for featured jobs client-side
  const featuredJobs = (data || []).filter(job => job.featured);
  
  // Cast data to JobType array with proper type casting
  return featuredJobs.map(job => ({
    ...job,
    type: job.type as "full-time" | "part-time" | "contract" | "freelance" | "remote",
    category: job.category as "writing" | "editing" | "marketing" | "design" | "development" | "community" | "content" | "other"
  }));
};

export const getJobById = async (id: string): Promise<JobType | null> => {
  const { data, error } = await fetchJobById(id);
  
  if (error) {
    console.error('Error fetching job by id:', error);
    if (error.code === 'PGRST116') {
      // Record not found error
      return null;
    }
    throw error;
  }
  
  // Cast data to JobType with proper type casting
  return data ? {
    ...data,
    type: data.type as "full-time" | "part-time" | "contract" | "freelance" | "remote",
    category: data.category as "writing" | "editing" | "marketing" | "design" | "development" | "community" | "content" | "other"
  } : null;
};

export const getRelatedJobs = async (jobId: string, category: string, limit = 3): Promise<JobType[]> => {
  const { data, error } = await fetchJobs();
  
  if (error) {
    console.error('Error fetching related jobs:', error);
    throw error;
  }
  
  // Filter client-side for related jobs
  const relatedJobs = (data || [])
    .filter(job => job.category === category && job.id !== jobId)
    .slice(0, limit);
  
  // Cast data to JobType array with proper type casting
  return relatedJobs.map(job => ({
    ...job,
    type: job.type as "full-time" | "part-time" | "contract" | "freelance" | "remote",
    category: job.category as "writing" | "editing" | "marketing" | "design" | "development" | "community" | "content" | "other"
  }));
};
