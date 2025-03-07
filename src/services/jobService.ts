
import { supabase } from "@/integrations/supabase/client";
import { JobType } from "@/types/job";

export const getJobs = async (): Promise<JobType[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('posted', { ascending: false });
  
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
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('featured', true)
    .order('posted', { ascending: false });
  
  if (error) {
    console.error('Error fetching featured jobs:', error);
    throw error;
  }
  
  // Cast data to JobType array with proper type casting
  return (data || []).map(job => ({
    ...job,
    type: job.type as "full-time" | "part-time" | "contract" | "freelance" | "remote",
    category: job.category as "writing" | "editing" | "marketing" | "design" | "development" | "community" | "content" | "other"
  }));
};

export const getJobById = async (id: string): Promise<JobType | null> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  
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
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('category', category)
    .neq('id', jobId)
    .limit(limit);
  
  if (error) {
    console.error('Error fetching related jobs:', error);
    throw error;
  }
  
  // Cast data to JobType array with proper type casting
  return (data || []).map(job => ({
    ...job,
    type: job.type as "full-time" | "part-time" | "contract" | "freelance" | "remote",
    category: job.category as "writing" | "editing" | "marketing" | "design" | "development" | "community" | "content" | "other"
  }));
};
