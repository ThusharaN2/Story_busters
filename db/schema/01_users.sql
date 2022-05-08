-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS approved_content CASCADE;
DROP TABLE IF EXISTS story_snippet_options CASCADE;
DROP TABLE IF EXISTS story_starters CASCADE;
DROP TABLE IF EXISTS final_story CASCADE;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
