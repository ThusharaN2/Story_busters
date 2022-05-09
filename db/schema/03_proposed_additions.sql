DROP TABLE IF EXISTS proposed_additions CASCADE;

CREATE TABLE proposed_additions (
  id SERIAL PRIMARY KEY NOT NULL,
  contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  additional_text TEXT,
  story_id INTEGER REFERENCES story_drafts(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0
)
