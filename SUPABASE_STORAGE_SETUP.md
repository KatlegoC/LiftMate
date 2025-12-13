# Supabase Storage Setup for Selfies

## Error: "Bucket not found" (400 Bad Request)

This error occurs because the `selfies` storage bucket doesn't exist in your Supabase project. Here's how to create it:

## Step 1: Create the Storage Bucket

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Click **Storage** in the left sidebar
4. Click **New bucket**
5. Configure the bucket:
   - **Name**: `selfies`
   - **Public bucket**: ✅ **Enable** (check this box)
   - **File size limit**: Leave default or set to 5MB
   - **Allowed MIME types**: `image/jpeg, image/png, image/jpg` (optional)
6. Click **Create bucket**

## Step 2: Set Up Storage Policies (Row Level Security)

After creating the bucket, you need to allow public uploads:

1. In the Storage section, click on the `selfies` bucket
2. Go to **Policies** tab
3. Click **New policy**
4. Select **For full customization** → **Create policy from scratch**
5. Configure the policy:

**Policy Name**: `Allow public uploads`

**Policy Definition**:
```sql
-- Allow anyone to upload files
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'selfies');

-- Allow anyone to read files
CREATE POLICY "Allow public reads" ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'selfies');
```

Or use the visual policy editor:
- **Policy name**: `Allow public uploads`
- **Allowed operation**: `INSERT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = 'selfies'`
- **WITH CHECK expression**: `bucket_id = 'selfies'`

6. Create another policy for reads:
- **Policy name**: `Allow public reads`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = 'selfies'`

## Step 3: Verify Setup

1. The bucket should appear in Storage → Buckets
2. It should show as **Public**
3. Policies should be listed under the Policies tab

## Alternative: Use Database Storage (Current Fallback)

If you don't want to set up storage, the app will automatically store selfies as base64 strings in the database. This works but:
- ✅ No additional setup needed
- ❌ Larger database size
- ❌ Slower queries

## Testing

After setup:
1. Refresh your app
2. Try posting a ride with a selfie
3. Check Supabase Storage → `selfies` bucket to see uploaded files

## Troubleshooting

### "Bucket already exists"
- The bucket is already created, check Storage → Buckets

### "Permission denied"
- Make sure RLS policies are set up correctly
- Verify the bucket is marked as **Public**

### Still getting 400 errors
- Check browser console for specific error message
- Verify bucket name is exactly `selfies` (lowercase)
- Make sure policies allow INSERT and SELECT operations

