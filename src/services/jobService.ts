
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
  
  return data || [];
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
  
  return data || [];
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
  
  return data;
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
  
  return data || [];
};
