# Supabase Setup for Blitz Lesen

## Database Schema

Create a table named `leaderboard` with the following columns:

### SQL Schema

```sql
CREATE TABLE leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  time INTEGER NOT NULL,
  syllables INTEGER NOT NULL CHECK (syllables >= 1 AND syllables <= 4),
  group_name TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_leaderboard_syllables ON leaderboard(syllables);
CREATE INDEX idx_leaderboard_group ON leaderboard(group_name);
CREATE INDEX idx_leaderboard_time ON leaderboard(time);
CREATE INDEX idx_leaderboard_composite ON leaderboard(syllables, group_name, time);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON leaderboard
  FOR SELECT USING (true);

-- Allow public insert access (for submitting scores)
CREATE POLICY "Allow public insert access" ON leaderboard
  FOR INSERT WITH CHECK (true);
```

### Column Descriptions

- `id`: Unique identifier (UUID, auto-generated)
- `name`: Player name (TEXT, required)
- `time`: Final time in seconds including penalties (INTEGER, required)
- `syllables`: Word syllable count (1-4, INTEGER, required)
- `group_name`: Group name (TEXT, nullable) - NULL or empty means the score is not filtered by group
- `date`: Display date for the score (TIMESTAMP, auto-generated)
- `created_at`: Record creation timestamp (TIMESTAMP, auto-generated)

## Configuration

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema above in the SQL Editor
3. Get your project URL and anon/public API key from Project Settings > API
4. Update the configuration in `index.html`:
   ```javascript
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_ANON_KEY = 'your-anon-key-here';
   ```

## Group Filtering Logic

- **"Weltweit" (Worldwide)**: Shows all entries regardless of group (no filter applied)
- **Custom groups**: Shows only entries where `group_name` matches the selected group
- When a user plays without specifying a group, `group_name` is stored as NULL or empty string
- When displaying "Weltweit", the query fetches all scores without filtering by `group_name`
