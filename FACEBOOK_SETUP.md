# Facebook Authentication Setup Guide

This guide will help you set up Facebook authentication for the "Post a Ride" feature.

## Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Consumer" or "Business" as the app type
4. Fill in your app details:
   - **App Name**: LiftMate (or your preferred name)
   - **App Contact Email**: Your email address
5. Click "Create App"

## Step 2: Add Facebook Login Product

1. In your app dashboard, find "Add Product" or go to "Products" in the left sidebar
2. Find "Facebook Login" and click "Set Up"
3. Choose "Web" as your platform

## Step 3: Configure Settings

1. Go to **Settings** → **Basic** in the left sidebar
2. Note your **App ID** (you'll need this)
3. Add **App Domains**:
   - For local development: `localhost`
   - For production: Your domain (e.g., `liftmate.co.za`)
4. Click "Add Platform" → "Website"
5. Add your **Site URL**:
   - For local development: `http://localhost:5173`
   - For production: `https://yourdomain.com`

## Step 4: Configure Facebook Login Settings

1. Go to **Products** → **Facebook Login** → **Settings**
2. Add **Valid OAuth Redirect URIs**:
   - `http://localhost:5173` (for development)
   - `https://yourdomain.com` (for production)
3. Save changes

## Step 5: Add App ID to Your Project

### Option 1: Environment Variable (Recommended)

1. Create a `.env` file in the root of your project:
```bash
VITE_FACEBOOK_APP_ID=your_app_id_here
```

2. Replace `your_app_id_here` with your actual Facebook App ID

3. Restart your development server:
```bash
npm run dev
```

### Option 2: Direct Configuration

Edit `src/components/PostRideForm.tsx` and replace:
```typescript
const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID';
```

With:
```typescript
const FACEBOOK_APP_ID = 'your_actual_app_id_here';
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Click "Post a Ride" button
3. You should see a Facebook login screen
4. Click "Continue with Facebook"
5. Authorize the app
6. You should now be able to fill out the ride posting form

## Important Notes

### Development Mode
- Facebook apps start in **Development Mode** by default
- Only you (and users you add as testers) can log in during development
- To add testers: **Roles** → **Roles** → Add people

### Production Mode
- Before going live, submit your app for review
- Go to **App Review** → **Permissions and Features**
- Request access to `email` and `public_profile` permissions
- Once approved, your app will work for all users

### Privacy Policy & Terms
- Facebook requires a Privacy Policy URL for production apps
- Add this in **Settings** → **Basic** → **Privacy Policy URL**

## Troubleshooting

### "App Not Setup" Error
- Make sure you've added Facebook Login product
- Verify your App ID is correct
- Check that your domain is added in App Domains

### Login Not Working
- Clear browser cache and cookies
- Check browser console for errors
- Verify your redirect URIs are correct
- Make sure you're using the correct App ID

### SDK Not Loading
- Check your internet connection
- Verify the Facebook SDK script is loading (check Network tab in browser dev tools)
- Make sure you're not blocking Facebook domains with ad blockers

## Security Best Practices

1. **Never commit your App ID to version control** - Use environment variables
2. **Use HTTPS in production** - Facebook requires HTTPS for production apps
3. **Validate tokens server-side** - For production, validate Facebook tokens on your backend
4. **Keep App Secret secure** - Never expose your App Secret in client-side code

## Need Help?

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/web)
- [Facebook Developers Support](https://developers.facebook.com/support/)

