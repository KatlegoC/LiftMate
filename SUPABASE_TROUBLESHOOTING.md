# Supabase Connection Troubleshooting

## Error: ERR_NAME_NOT_RESOLVED / Failed to fetch

This error means your browser cannot connect to your Supabase project. Here's how to fix it:

## Step 1: Verify Your Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Sign in to your account
3. Check if your project `elsrprjtwofegfhfrycr` exists
4. **Important**: Check if the project is **paused**
   - Free tier projects pause after 7 days of inactivity
   - Click "Restore" if it's paused

## Step 2: Get Your Correct Supabase URL

1. In Supabase Dashboard, go to your project
2. Click **Settings** → **API**
3. Copy the **Project URL** (should look like `https://xxxxx.supabase.co`)
4. Verify it matches: `https://elsrprjtwofegfhfrycr.supabase.co`

## Step 3: Check Project Status

- **Active**: Project is running and accessible
- **Paused**: Project is paused (needs to be restored)
- **Deleted**: Project no longer exists

## Step 4: Update Configuration (if URL changed)

If your Supabase URL is different, update it:

1. Create/update `.env` file in project root:
```bash
VITE_SUPABASE_URL=https://your-actual-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Or update `src/lib/supabase.ts` directly with the correct URL

3. Restart your dev server:
```bash
npm run dev
```

## Step 5: Test Connection

After updating, test if you can reach Supabase:

1. Open browser console (F12)
2. Try posting a ride again
3. Check if the error is resolved

## Common Issues

### Project is Paused
- **Solution**: Go to Supabase Dashboard → Restore project
- Free tier projects auto-pause after inactivity

### Wrong Project URL
- **Solution**: Get the correct URL from Supabase Dashboard → Settings → API

### Network/Firewall Issues
- **Solution**: Check your internet connection
- Try accessing Supabase dashboard in browser
- Check if corporate firewall is blocking the connection

### Project Deleted
- **Solution**: Create a new Supabase project and update the URL

## Quick Fix Checklist

- [ ] Project exists in Supabase Dashboard
- [ ] Project is **Active** (not paused)
- [ ] URL matches: `https://elsrprjtwofegfhfrycr.supabase.co`
- [ ] Can access Supabase Dashboard
- [ ] Internet connection is working
- [ ] Restarted dev server after config changes

## Need Help?

1. Check Supabase Dashboard for project status
2. Verify the URL in Settings → API
3. Try restoring the project if it's paused
4. Create a new project if this one doesn't exist

