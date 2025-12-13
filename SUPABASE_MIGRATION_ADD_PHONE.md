# Database Migration: Add Phone Number and WhatsApp Fields

If you already have the `rides` table created, run this migration to add the new phone number and WhatsApp fields.

## Migration SQL

Go to Supabase Dashboard → **SQL Editor** and run:

```sql
-- Add phone_number column
ALTER TABLE rides 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Add is_whatsapp column
ALTER TABLE rides 
ADD COLUMN IF NOT EXISTS is_whatsapp BOOLEAN DEFAULT FALSE;

-- Make phone_number required for new entries (optional, but recommended)
-- Note: This will only affect new rows, existing rows can have NULL
ALTER TABLE rides 
ALTER COLUMN phone_number SET NOT NULL;
```

## If you get an error about existing NULL values

If you have existing rides without phone numbers, you'll need to either:

1. **Update existing rows first:**
```sql
-- Set a placeholder for existing rides
UPDATE rides 
SET phone_number = 'Not provided' 
WHERE phone_number IS NULL;
```

2. **Then make it required:**
```sql
ALTER TABLE rides 
ALTER COLUMN phone_number SET NOT NULL;
```

## Verify Migration

After running the migration, verify the columns exist:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'rides'
AND column_name IN ('phone_number', 'is_whatsapp');
```

You should see:
- `phone_number` - TEXT - NO (not nullable)
- `is_whatsapp` - BOOLEAN - YES (nullable, defaults to FALSE)

