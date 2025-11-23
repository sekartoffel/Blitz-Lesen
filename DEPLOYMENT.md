# Deployment Guide

## Quick Start Checklist

- [ ] Create Supabase project
- [ ] Run SQL schema in Supabase SQL Editor
- [ ] Get API credentials from Supabase
- [ ] Update `index.html` with your credentials
- [ ] Test locally
- [ ] Deploy to hosting platform
- [ ] Verify production works

## Deployment Options

### Option 1: GitHub Pages (Easiest, Free)

**Best for**: Static hosting, simple deployment

1. **Prepare Repository**
   ```bash
   git add .
   git commit -m "Add Supabase integration"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` or `master`, folder: `/ (root)`
   - Click Save

3. **Access Your App**
   - URL: `https://your-username.github.io/blitz-lesen`
   - Usually live in 1-2 minutes

**Pros**: Free, simple, automatic updates on push
**Cons**: Public repos only (unless you have GitHub Pro)

---

### Option 2: Vercel (Recommended for Production)

**Best for**: Fast, professional deployments with preview URLs

1. **Sign up at vercel.com**

2. **Deploy via CLI**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Or Deploy via Dashboard**
   - Click "New Project"
   - Import your GitHub repo
   - Click Deploy

4. **Environment Variables** (if you move config to env vars later)
   - Settings → Environment Variables
   - Add `SUPABASE_URL` and `SUPABASE_ANON_KEY`

**Pros**: Fast CDN, preview deployments, free SSL, analytics
**Cons**: Requires account

---

### Option 3: Netlify

**Best for**: Simple drag-and-drop deployment

1. **Sign up at netlify.com**

2. **Drag & Drop**
   - Go to Netlify dashboard
   - Drag your project folder onto the deploy area
   - Done!

3. **Or Connect Git**
   - New site from Git
   - Choose your repo
   - Deploy

**Pros**: Very simple, free SSL, form handling
**Cons**: Build minutes limited on free tier

---

### Option 4: Cloudflare Pages

**Best for**: Global CDN, unlimited bandwidth

1. **Sign up at cloudflare.com**

2. **Create Pages Project**
   - Pages → Create a project
   - Connect GitHub repo
   - Deploy

**Pros**: Unlimited bandwidth, fast global CDN
**Cons**: Slightly more complex setup

---

## Testing Before Deployment

### Local Testing

1. **Simple HTTP Server**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js
   npx serve
   ```

2. **Open in Browser**
   ```
   http://localhost:8000
   ```

3. **Test Checklist**
   - [ ] Game starts correctly
   - [ ] Score saves to Supabase
   - [ ] Leaderboard displays from Supabase
   - [ ] Check browser console for errors (F12)
   - [ ] Test on mobile view

### Verify Supabase Connection

Open browser console (F12) and check for:
```
✅ Supabase client initialized
✅ Score saved to Supabase
✅ Leaderboard loaded from Supabase
```

If you see errors:
- Verify SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Check Supabase dashboard → API settings
- Verify RLS policies are enabled (schema.sql)

---

## Post-Deployment

### Monitor Usage

1. **Supabase Dashboard**
   - Database → Usage
   - Check storage, bandwidth, API requests

2. **Check Data**
   - Table Editor → leaderboard
   - View recent scores

### Maintenance

**Clear old scores** (run in Supabase SQL Editor):
```sql
-- Delete scores older than 90 days
DELETE FROM leaderboard
WHERE created_at < NOW() - INTERVAL '90 days';
```

**Backup data**:
- Supabase → Database → Backups (automatic daily backups on free tier)
- Manual export: Table Editor → Export as CSV

---

## Troubleshooting

### CORS Errors
- Not an issue for static hosting
- Supabase allows all origins by default
- If needed: Supabase → Settings → API → CORS

### Database Connection Fails
1. Check API keys match exactly
2. Verify RLS policies in Supabase
3. Check browser console for detailed error

### Leaderboard Not Updating
1. Open browser console (F12)
2. Check for Supabase errors
3. Verify schema.sql was run completely
4. Check Table Editor to see if data exists

### Performance Issues
- Supabase free tier is very fast
- If slow, check Network tab (F12) for bottlenecks
- Consider adding database indexes (already in schema.sql)

---

## Security Best Practices

### ✅ Current Setup is Secure
- Using `anon` key (safe to expose in frontend)
- Row Level Security (RLS) enabled
- Public can only INSERT and SELECT, not UPDATE or DELETE

### For Future Enhancements

If you add user authentication:
```sql
-- Only allow users to update their own scores
CREATE POLICY "Users update own scores"
  ON leaderboard FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
```

---

## Scaling Considerations

### Free Tier Limits (Supabase)
- ✅ 500 MB database
- ✅ 2 GB bandwidth/month
- ✅ 50,000 monthly active users

**Estimate**:
- Each score: ~100 bytes
- 500 MB = ~5 million scores
- **You're covered for years!**

### If You Outgrow Free Tier
- Supabase Pro: $25/month (8 GB database, 50 GB bandwidth)
- Or migrate to self-hosted PostgreSQL

---

## Domain Setup (Optional)

### Custom Domain with GitHub Pages
1. Add `CNAME` file with your domain
2. DNS settings: Add CNAME record pointing to `username.github.io`

### Custom Domain with Vercel/Netlify
1. Go to project settings
2. Domains → Add domain
3. Follow DNS instructions

---

## Questions?

- Supabase Docs: https://supabase.com/docs
- GitHub Pages Docs: https://docs.github.com/pages
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
