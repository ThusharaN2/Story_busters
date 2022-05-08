DROP TABLE IF EXISTS story_snippet_options CASCADE;

CREATE TABLE story_snippet_options (
  id SERIAL PRIMARY KEY NOT NULL,
  contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_snippet_text TEXT,
  story_id INTEGER REFERENCES story_starters(id) ON DELETE CASCADE
)
