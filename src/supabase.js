import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whkmuaqimbahtzfnxtia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoa211YXFpbWJhaHR6Zm54dGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4OTE2NDEsImV4cCI6MjA0ODQ2NzY0MX0.XxNdkzVJfS4FWP8ssQaIBU-V-_ayMoDVPBn0cumkB5Y';

export const supabase = createClient(supabaseUrl, supabaseKey);
