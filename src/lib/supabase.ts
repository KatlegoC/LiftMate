import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://elsrprjtwofegfhrfycr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc3Jwcmp0d29mZWdmaHJmeWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MTc5NDgsImV4cCI6MjA4MTE5Mzk0OH0.61ejcePgLIoqJlF3tmqZqZ8NLZ6IwB0-DCj3xkV24Xk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface RidePost {
  id?: string;
  ride_type: 'offer' | 'request'; // 'offer' = driver offering ride, 'request' = rider looking for ride
  post_type: 'passengers' | 'parcel';
  pickup_location: string;
  dropoff_location: string;
  departure_date: string;
  departure_time: string;
  seats_available?: number;
  price_per_seat?: number;
  vehicle?: string;
  vehicle_registration?: string;
  comments?: string;
  driver_name: string;
  phone_number: string;
  is_whatsapp: boolean;
  selfie_url?: string;
  created_at?: string;
}

