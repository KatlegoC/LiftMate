# Vercel Deployment Guide for LiftMate

This guide will help you deploy LiftMate to Vercel and configure Facebook authentication for production.

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com/) and sign in (or create an account)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select **GitHub** and authorize Vercel to access your repositories
5. Find and select **KatlegoC/LiftMate**
6. Click **"Import"**

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy.

## Step 2: Configure Build Settings

Vercel should auto-detect Vite, but verify these settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Step 3: Set Environment Variables

### In Vercel Dashboard:

1. Go to your project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variable:

   **Name**: `VITE_FACEBOOK_APP_ID`
   **Value**: Your Facebook App ID (from Facebook Developer Console)
   **Environment**: Production, Preview, Development (select all)

4. Click **"Save"**

### Important Notes:

- After adding environment variables, you need to **redeploy** your project
- Go to **Deployments** → Click the three dots on latest deployment → **Redeploy**

## Step 4: Update Facebook App Settings

Before testing in production, update your Facebook App:

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Select your app
3. Go to **Settings** → **Basic**
4. Add your Vercel domain to **App Domains**:
   - Example: `your-project.vercel.app` or your custom domain
5. Go to **Products** → **Facebook Login** → **Settings**
6. Add **Valid OAuth Redirect URIs**:
   - `https://your-project.vercel.app`
   - `https://your-project.vercel.app/` (with trailing slash)
   - If you have a custom domain, add that too
7. Save changes

## Step 5: Test the Deployment

1. Visit your Vercel deployment URL
2. Click **"Post a Ride"**
3. You should see the Facebook login screen
4. Click **"Continue with Facebook"**
5. Complete the login flow

## Step 6: Enable Production Mode (Optional)

If you want to allow all users (not just testers):

1. Go to **App Review** in Facebook Developer Console
2. Request permissions for:
   - `email`
   - `public_profile`
3. Submit your app for review
4. Once approved, all users can log in

## Troubleshooting

### Facebook Login Not Working

- **Check environment variables**: Make sure `VITE_FACEBOOK_APP_ID` is set in Vercel
- **Verify redirect URIs**: Ensure your Vercel URL is added to Facebook App settings
- **Check browser console**: Look for any errors
- **Redeploy**: After changing environment variables, always redeploy

### Build Errors

- Check Vercel build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)

### Domain Issues

- Make sure your domain is added to Facebook App Domains
- Use HTTPS (Vercel provides this automatically)
- Check that redirect URIs match exactly (including https://)

## Custom Domain Setup

If you want to use a custom domain:

1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Facebook App settings with your custom domain
5. Update environment variables if needed

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Project deployed to Vercel
- [ ] Environment variable `VITE_FACEBOOK_APP_ID` set in Vercel
- [ ] Vercel domain added to Facebook App Domains
- [ ] Redirect URIs added to Facebook Login settings
- [ ] Project redeployed after setting environment variables
- [ ] Tested Facebook login on production URL

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Facebook Login Setup](https://developers.facebook.com/docs/facebook-login/web)
- Check the `FACEBOOK_SETUP.md` file for detailed Facebook configuration

