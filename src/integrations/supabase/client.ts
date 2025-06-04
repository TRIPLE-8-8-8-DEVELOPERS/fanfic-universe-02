
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://bhgwipcwsndpyvrzcpma.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoZ3dpcGN3c25kcHl2cnpjcG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTI5NTMsImV4cCI6MjA1MTc2ODk1M30.zWVIQ0byaasTeVdNMRxwY47UczGS5O7pJxGmvu5u3ew";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('Supabase client initialized:', supabase);

// Re-export all domain-specific modules
export * from './services/auth';
export * from './services/profiles';
export * from './services/stories';
export * from './services/chapters';
export * from './services/comments';
export * from './services/tags';
export * from './services/reading-lists';
export * from './services/follows';
export * from './services/ratings';
export * from './services/jobs';
