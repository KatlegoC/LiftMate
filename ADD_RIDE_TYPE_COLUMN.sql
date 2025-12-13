-- Add ride_type column to rides table
-- This column distinguishes between 'offer' (driver offering a ride) and 'request' (rider looking for a ride)

ALTER TABLE rides
ADD COLUMN IF NOT EXISTS ride_type TEXT DEFAULT 'offer' CHECK (ride_type IN ('offer', 'request'));

-- Update existing records to be 'offer' by default (since they were posted as ride offers)
UPDATE rides
SET ride_type = 'offer'
WHERE ride_type IS NULL;

-- Add comment to explain the column
COMMENT ON COLUMN rides.ride_type IS 'Type of ride post: offer (driver offering ride) or request (rider looking for ride)';

