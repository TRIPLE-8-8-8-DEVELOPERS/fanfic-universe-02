import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bhgwipcwsndpyvrzcpma.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoZ3dpcGN3c25kcHl2cnpjcG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxOTI5NTMsImV4cCI6MjA1MTc2ODk1M30.zWVIQ0byaasTeVdNMRxwY47UczGS5O7pJxGmvu5u3ew';

export const supabase = createClient(supabaseUrl, supabaseKey);
