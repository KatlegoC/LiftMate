-- Add optional area/suburb fields for pickup and dropoff locations

ALTER TABLE rides
ADD COLUMN IF NOT EXISTS pickup_area TEXT;

ALTER TABLE rides
ADD COLUMN IF NOT EXISTS dropoff_area TEXT;

COMMENT ON COLUMN rides.pickup_area IS 'Optional area/suburb for pickup location, e.g. Pretoria Central';
COMMENT ON COLUMN rides.dropoff_area IS 'Optional area/suburb for dropoff location, e.g. Waterfront';


