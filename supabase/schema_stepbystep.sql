-- ============================================================
-- STEP 1: Create Tables
-- Run this first, make sure it succeeds before continuing
-- ============================================================

-- Leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id BIGSERIAL PRIMARY KEY,
  player_name TEXT NOT NULL,
  time INTEGER NOT NULL,
  syllables INTEGER NOT NULL CHECK (syllables >= 1 AND syllables <= 4),
  words_read INTEGER NOT NULL,
  words_skipped INTEGER DEFAULT 0,
  game_type TEXT NOT NULL CHECK (game_type IN ('entziffern', 'erkennen')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Words table (optional - only if you want to manage words in database)
CREATE TABLE IF NOT EXISTS words (
  id BIGSERIAL PRIMARY KEY,
  word TEXT NOT NULL UNIQUE,
  syllables INTEGER NOT NULL CHECK (syllables >= 1 AND syllables <= 4),
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Verify tables were created
SELECT 'Tables created successfully!' as status;

-- ============================================================
-- STEP 2: Create Indexes
-- Run after Step 1 succeeds
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_leaderboard_syllables ON leaderboard(syllables, time);
CREATE INDEX IF NOT EXISTS idx_leaderboard_created ON leaderboard(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_words_syllables ON words(syllables);

SELECT 'Indexes created successfully!' as status;

-- ============================================================
-- STEP 3: Enable Row Level Security (RLS)
-- Run after Step 2 succeeds
-- ============================================================

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

SELECT 'RLS enabled successfully!' as status;

-- ============================================================
-- STEP 4: Create RLS Policies
-- Run after Step 3 succeeds
-- ============================================================

-- Allow anonymous users to view leaderboard
DROP POLICY IF EXISTS "Anyone can view leaderboard" ON leaderboard;
CREATE POLICY "Anyone can view leaderboard"
  ON leaderboard FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to insert scores
DROP POLICY IF EXISTS "Anyone can insert scores" ON leaderboard;
CREATE POLICY "Anyone can insert scores"
  ON leaderboard FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read words
DROP POLICY IF EXISTS "Anyone can view words" ON words;
CREATE POLICY "Anyone can view words"
  ON words FOR SELECT
  TO anon
  USING (true);

-- Only authenticated users can modify words
DROP POLICY IF EXISTS "Authenticated users can manage words" ON words;
CREATE POLICY "Authenticated users can manage words"
  ON words FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

SELECT 'Policies created successfully!' as status;

-- ============================================================
-- STEP 5: Create View (OPTIONAL)
-- This view is optional - the app works without it
-- Run after Step 4 succeeds
-- ============================================================

DROP VIEW IF EXISTS top_leaderboard;
CREATE VIEW top_leaderboard AS
SELECT *
FROM (
  SELECT
    id,
    player_name,
    time,
    syllables,
    words_read,
    game_type,
    TO_CHAR(created_at, 'DD.MM.YYYY') as date,
    ROW_NUMBER() OVER (PARTITION BY syllables ORDER BY time ASC) as rank
  FROM leaderboard
) ranked
WHERE rank <= 5;

SELECT 'View created successfully!' as status;

-- ============================================================
-- VERIFICATION
-- Run this to verify everything is set up correctly
-- ============================================================

-- Check if tables exist
SELECT 'leaderboard' as table_name, COUNT(*) as row_count FROM leaderboard
UNION ALL
SELECT 'words' as table_name, COUNT(*) as row_count FROM words;

-- Check if policies exist
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN ('leaderboard', 'words')
ORDER BY tablename, policyname;

SELECT '✅ Setup complete!' as status;
