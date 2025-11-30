-- Add category and tags columns to memes table
-- Run this in your Supabase SQL editor or include in migrations
ALTER TABLE IF EXISTS memes
  ADD COLUMN IF NOT EXISTS category text;

-- Using text[] for tags so each tag is an individual string
ALTER TABLE IF EXISTS memes
  ADD COLUMN IF NOT EXISTS tags text[];

-- If you prefer JSON storage for tags, use:
-- ALTER TABLE IF EXISTS memes ADD COLUMN IF NOT EXISTS tags jsonb;

-- NOTE: After running this migration, the frontend will send `tags` as an array
-- and `category` as text. Ensure Row Level Security policies allow inserts/updates.
