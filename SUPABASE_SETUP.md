# Supabase Setup Guide for Blitz Lesen

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Fill in:
   - **Project Name**: `blitz-lesen`
   - **Database Password**: (generate a strong password and save it)
   - **Region**: Choose closest to your users (e.g., Europe-Central)
5. Click "Create new project" (takes ~2 minutes)

## Step 2: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL Editor
5. Click "Run" or press `Ctrl+Enter`
6. You should see: "Success. No rows returned"

## Step 3: Get API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. Copy these two values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long JWT token)

## Step 4: Update Your App

1. Open `index.html`
2. Find the configuration section (around line 30)
3. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://YOUR-PROJECT-ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY-HERE';
```

## Step 5: Test Your App

1. Open `index.html` in a browser
2. Play a game and complete it
3. Check if the leaderboard saves
4. Go to Supabase Dashboard → **Table Editor** → **leaderboard**
5. You should see your score!

## Step 6: Deploy (Optional)

### Option A: GitHub Pages
1. Push to GitHub
2. Go to repo Settings → Pages
3. Select branch and folder
4. Your app will be live at `https://username.github.io/blitz-lesen`

### Option B: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Deploy!

### Option C: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Done!

## Troubleshooting

### Error: "Failed to fetch"
- Check that SUPABASE_URL and SUPABASE_ANON_KEY are correct
- Make sure you ran the schema.sql in Supabase

### Error: "Row Level Security"
- Make sure the RLS policies were created in schema.sql
- Check Supabase Dashboard → Authentication → Policies

### Scores not appearing
- Open browser console (F12) and check for errors
- Verify the database table exists in Supabase Table Editor

## Database Management

### View all scores
```sql
SELECT * FROM leaderboard ORDER BY created_at DESC LIMIT 50;
```

### Delete old scores (older than 30 days)
```sql
DELETE FROM leaderboard WHERE created_at < NOW() - INTERVAL '30 days';
```

### Get statistics
```sql
SELECT
  syllables,
  COUNT(*) as total_games,
  AVG(time) as avg_time,
  MIN(time) as best_time
FROM leaderboard
GROUP BY syllables;
```

## Free Tier Limits

Supabase free tier includes:
- ✅ 500 MB database space (plenty for thousands of scores)
- ✅ 2 GB bandwidth per month
- ✅ 50,000 monthly active users
- ✅ Unlimited API requests

This is more than enough for a personal/school project!

## Need Help?

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
