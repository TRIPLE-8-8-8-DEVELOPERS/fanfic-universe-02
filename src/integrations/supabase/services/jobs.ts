
import { supabase } from '../client';

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
