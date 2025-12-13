# Supabase Database Setup for LiftMate

## Step 1: Create the Rides Table

In your Supabase dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Create rides table
CREATE TABLE IF NOT EXISTS rides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  is_whatsapp BOOLEAN DEFAULT FALSE,
  selfie_url TEXT,
  post_type TEXT NOT NULL CHECK (post_type IN ('passengers', 'parcel')),
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  seats_available INTEGER,
  price_per_seat DECIMAL(10, 2),
  vehicle TEXT NOT NULL,
  vehicle_registration TEXT NOT NULL,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_rides_post_type ON rides(post_type);
CREATE INDEX IF NOT EXISTS idx_rides_departure_date ON rides(departure_date);
CREATE INDEX IF NOT EXISTS idx_rides_created_at ON rides(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read rides
CREATE POLICY "Allow public read access" ON rides
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert rides
CREATE POLICY "Allow public insert access" ON rides
  FOR INSERT
  WITH CHECK (true);
```

## Step 2: Create Storage Bucket for Selfies

1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name: `selfies`
4. **Public bucket**: Yes (so images can be accessed)
5. Click **Create bucket**

## Step 3: Set Storage Policies

In **Storage** → **Policies** for the `selfies` bucket:

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'selfies');

-- Allow public upload
CREATE POLICY "Public Upload" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'selfies');
```

## Step 4: Environment Variables

Add to your `.env` file (or Vercel environment variables):

```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsc3Jwcmp0d29mZWdmaHJmeWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MTc5NDgsImV4cCI6MjA4MTE5Mzk0OH0.61ejcePgLIoqJlF3tmqZqZ8NLZ6IwB0-DCj3xkV24Xk
```

**Note:** For production, it's better to use environment variables instead of hardcoding the key.

## Database Schema

The `rides` table has the following columns:

- `id` - UUID (auto-generated)
- `driver_name` - TEXT (required)
- `phone_number` - TEXT (required)
- `is_whatsapp` - BOOLEAN (default: false, indicates if phone number is on WhatsApp)
- `selfie_url` - TEXT (optional, URL to selfie image)
- `post_type` - TEXT ('passengers' or 'parcel')
- `pickup_location` - TEXT (required)
- `dropoff_location` - TEXT (required)
- `departure_date` - DATE (required)
- `departure_time` - TIME (required)
- `seats_available` - INTEGER (optional, for passengers)
- `price_per_seat` - DECIMAL (optional, for passengers)
- `vehicle` - TEXT (required)
- `vehicle_registration` - TEXT (required)
- `comments` - TEXT (optional)
- `created_at` - TIMESTAMP (auto-generated)
- `updated_at` - TIMESTAMP (auto-generated)

## Testing

1. Post a ride through the form
2. Check Supabase dashboard → **Table Editor** → `rides` table
3. Verify the ride appears in "Find a Ride" section

