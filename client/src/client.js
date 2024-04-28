import { createClient } from '@supabase/supabase-js'

const URL = 'https://axoefjbywmpbcgwjqvma.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4b2VmamJ5d21wYmNnd2pxdm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3NjU2NjUsImV4cCI6MjAyODM0MTY2NX0.g8KDIAPZ77BW6Pj8lNtbAY6MLeEyTT453hD8Zab39Mw';
export const supabase = createClient(URL, API_KEY);