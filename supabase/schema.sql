-- Blitz Lesen Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- ==================== LEADERBOARD TABLE ====================
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_leaderboard_syllables ON leaderboard(syllables, time);
CREATE INDEX IF NOT EXISTS idx_leaderboard_created ON leaderboard(created_at DESC);

-- ==================== WORDS TABLE (OPTIONAL) ====================
-- Only create if you want to manage words in database
CREATE TABLE IF NOT EXISTS words (
  id BIGSERIAL PRIMARY KEY,
  word TEXT NOT NULL UNIQUE,
  syllables INTEGER NOT NULL CHECK (syllables >= 1 AND syllables <= 4),
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_words_syllables ON words(syllables);

-- ==================== ROW LEVEL SECURITY (RLS) ====================
-- Enable RLS for security
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read leaderboard
CREATE POLICY "Anyone can view leaderboard"
  ON leaderboard FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to insert scores
CREATE POLICY "Anyone can insert scores"
  ON leaderboard FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to read words
CREATE POLICY "Anyone can view words"
  ON words FOR SELECT
  TO anon
  USING (true);

-- Only authenticated users can modify words (for admin panel later)
CREATE POLICY "Authenticated users can manage words"
  ON words FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==================== HELPFUL VIEWS ====================
-- View for top 5 leaderboard per syllable count
CREATE OR REPLACE VIEW top_leaderboard AS
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
WHERE rank <= 5;

-- ==================== SEED DATA (OPTIONAL) ====================
-- Uncomment if you want to move words to database
-- You can populate this with data from word_db.js
