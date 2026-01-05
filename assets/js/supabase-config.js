// Konfigurasi Supabase - Project: portofolio
const SUPABASE_URL = 'https://qceowmcspwhsthftrgde.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZW93bWNzcHdoc3RoZnRyZ2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNjEwODUsImV4cCI6MjA4MjkzNzA4NX0.n6P2_QKCaWYvemAxpqQu1gLZfloS6Wx8RgljPNsgoYs';

// Initialize Supabase Client (cek dulu biar ga duplicate)
if (!window.supabaseClient) {
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    window.supabaseClient = supabase;
}
