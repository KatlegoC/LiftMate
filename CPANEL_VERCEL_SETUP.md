# Connecting cPanel Domain to Vercel - Step by Step Guide

This guide will help you connect your `liftmate.co.za` domain from cPanel to your Vercel deployment.

## Prerequisites

- Access to your cPanel account
- Domain `liftmate.co.za` registered and managed through cPanel
- Vercel project deployed and ready

## Step 1: Get DNS Records from Vercel

1. Go to your Vercel dashboard
2. Navigate to your project → **Settings** → **Domains**
3. Add your domain:
   - Click **"Add Domain"**
   - Enter `liftmate.co.za` (root domain)
   - Click **"Add"**
4. Vercel will show you the DNS records you need to add
5. Note down these records (you'll see something like):
   - **Type**: A
   - **Name**: @
   - **Value**: `216.198.79.1` (or similar IP address)

## Step 2: Add Root Domain (liftmate.co.za) in cPanel

### Option A: Using Zone Editor (Recommended)

1. **Log into cPanel**
2. **Find "Zone Editor"** in the Domains section
3. **Select your domain** `liftmate.co.za` from the dropdown
4. **Click "Manage"**
5. **Add A Record for Root Domain:**
   - Click **"Add Record"** or **"+ Add"**
   - **Type**: Select **A**
   - **Name**: Enter `@` (this represents the root domain)
   - **TTL**: Leave as default (usually 14400 or 3600)
   - **Address**: Enter the IP address from Vercel (e.g., `216.198.79.1`)
   - Click **"Add Record"** or **"Save"**

### Option B: Using Advanced DNS Zone Editor

1. **Log into cPanel**
2. **Find "Advanced DNS Zone Editor"** in the Domains section
3. **Select your domain** `liftmate.co.za`
4. **Add A Record:**
   - Click **"Add Record"**
   - **Name**: `@` or leave blank (represents root domain)
   - **Type**: `A`
   - **Address**: Enter Vercel's IP (e.g., `216.198.79.1`)
   - **TTL**: Default (14400)
   - Click **"Add Record"**

## Step 3: Add WWW Subdomain (www.liftmate.co.za)

### In Vercel:
1. Go to **Settings** → **Domains**
2. Add `www.liftmate.co.za` as a separate domain
3. Vercel will show you a CNAME record to add

### In cPanel:
1. **Go to Zone Editor** (same as Step 2)
2. **Add CNAME Record:**
   - Click **"Add Record"**
   - **Type**: Select **CNAME**
   - **Name**: Enter `www`
   - **TTL**: Leave as default
   - **CNAME**: Enter `cname.vercel-dns.com` (or the value Vercel provides)
   - Click **"Add Record"**

## Step 4: Remove Conflicting Records

**Important:** Before adding new records, check for existing A or CNAME records for:
- `@` (root domain)
- `www` subdomain

If they exist and point to different values:
1. **Delete the old records** first
2. Then add the new Vercel records

## Step 5: Verify DNS Propagation

1. **Wait 5-15 minutes** for DNS to propagate
2. **Check DNS propagation:**
   - Use [whatsmydns.net](https://www.whatsmydns.net/)
   - Enter `liftmate.co.za`
   - Check if A record shows Vercel's IP
3. **In Vercel:**
   - Go to **Settings** → **Domains**
   - Click **"Refresh"** next to your domain
   - Status should change from "Invalid Configuration" to "Valid Configuration"

## Step 6: Configure Domain in Vercel

1. **For Root Domain (liftmate.co.za):**
   - In Vercel, make sure it's set to **"Connect to Production"**
   - Or redirect to `www.liftmate.co.za` if preferred

2. **For WWW Domain (www.liftmate.co.za):**
   - Set to **"Connect to Production"**
   - This will serve your Vercel app

## Common Issues & Solutions

### Issue: "Invalid Configuration" Still Showing

**Solutions:**
1. **Wait longer** - DNS can take up to 48 hours (usually 5-30 minutes)
2. **Check DNS records match exactly:**
   - Name: `@` (not `liftmate.co.za`)
   - Value: Must match Vercel's IP exactly
3. **Clear DNS cache:**
   - Flush your local DNS: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
4. **Verify in cPanel:**
   - Go back to Zone Editor
   - Confirm the A record shows the correct IP

### Issue: Domain Not Resolving

**Solutions:**
1. **Check if domain is pointing to cPanel nameservers:**
   - Your domain registrar should have nameservers like:
     - `ns1.yourhost.com`
     - `ns2.yourhost.com`
2. **Verify nameservers at your domain registrar**
3. **Wait for full DNS propagation**

### Issue: WWW Not Working

**Solutions:**
1. **Verify CNAME record:**
   - Name: `www`
   - Value: `cname.vercel-dns.com` (or Vercel's provided value)
2. **Check for conflicting A records** for www
3. **Remove any A records** for www if CNAME exists (they conflict)

## Alternative: Using Vercel Nameservers (Advanced)

If you want Vercel to manage all DNS:

1. **In Vercel:** Get the nameservers (Settings → Domains)
2. **At your domain registrar:**
   - Change nameservers to Vercel's
   - This removes cPanel DNS management
   - Vercel will handle all DNS records

**Note:** This method means you won't use cPanel for DNS anymore.

## Quick Checklist

- [ ] Added A record for `@` pointing to Vercel IP in cPanel
- [ ] Added CNAME record for `www` pointing to Vercel in cPanel
- [ ] Removed any conflicting old DNS records
- [ ] Waited 5-15 minutes for DNS propagation
- [ ] Verified DNS records using whatsmydns.net
- [ ] Refreshed domain status in Vercel
- [ ] Domain shows "Valid Configuration" in Vercel
- [ ] Tested accessing `liftmate.co.za` and `www.liftmate.co.za`

## Testing Your Setup

After DNS propagates:

1. **Visit:** `https://liftmate.co.za`
2. **Visit:** `https://www.liftmate.co.za`
3. Both should show your Vercel deployment
4. **Test Facebook Login** to ensure it works with your custom domain

## Important Notes

- **SSL Certificate:** Vercel automatically provisions SSL certificates (HTTPS) for your domain
- **DNS Propagation:** Can take 5 minutes to 48 hours (usually 5-30 minutes)
- **TTL Values:** Lower TTL (300-600) makes changes propagate faster
- **Keep Records:** Don't delete the DNS records after setup - they need to stay active

## Need Help?

- **Vercel DNS Docs:** https://vercel.com/docs/concepts/projects/domains
- **cPanel Zone Editor Docs:** Check your hosting provider's documentation
- **DNS Checker:** https://www.whatsmydns.net/

