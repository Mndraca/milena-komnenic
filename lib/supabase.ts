// lib/supabase.ts

import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://toilxutmacirdcmlfned.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaWx4dXRtYWNpcmRjbWxmbmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczNTk0OTQsImV4cCI6MjA0MjkzNTQ5NH0.41mZ1jL9JIRMd6iA-TuK6kv5uYo8FlHGHqmTtlZUzcQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


