-- Migration: Add Phone Number and WhatsApp Fields to Rides Table
-- Run this in Supabase SQL Editor

-- Step 1: Add phone_number column (nullable first)
ALTER TABLE rides 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Step 2: Add is_whatsapp column with default value
ALTER TABLE rides 
ADD COLUMN IF NOT EXISTS is_whatsapp BOOLEAN DEFAULT FALSE;

-- Step 3: Update existing rows (if any) to have a placeholder phone number
-- This prevents errors when making the column required
UPDATE rides 
SET phone_number = 'Not provided' 
WHERE phone_number IS NULL;

-- Step 4: Make phone_number required for new entries
ALTER TABLE rides 
ALTER COLUMN phone_number SET NOT NULL;

-- Step 5: Verify the migration
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'rides'
AND column_name IN ('phone_number', 'is_whatsapp')
ORDER BY column_name;

