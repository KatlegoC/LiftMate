import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://elsrprjtwofegfhrfycr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc3Jwcmp0d29mZWdmaHJmeWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MTc5NDgsImV4cCI6MjA4MTE5Mzk0OH0.61ejcePgLIoqJlF3tmqZqZ8NLZ6IwB0-DCj3xkV24Xk';

// Validate Supabase configuration
if (!supabaseUrl || supabaseUrl.includes('your-project')) {
  console.warn('Supabase URL not configured. Please set VITE_SUPABASE_URL in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface RidePost {
  id?: string;
  driver_name: string;
  phone_number: string;
  is_whatsapp: boolean;
  selfie_url?: string;
  post_type: 'passengers' | 'parcel';
  pickup_location: string;
  dropoff_location: string;
  departure_date: string;
  departure_time: string;
  seats_available?: number;
  price_per_seat?: number;
  vehicle: string;
  vehicle_registration: string;
  comments?: string;
  created_at?: string;
  updated_at?: string;
}

