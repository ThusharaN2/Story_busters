DROP TABLE IF EXISTS proposed_additions CASCADE;

CREATE TABLE proposed_additions (
  id SERIAL PRIMARY KEY NOT NULL,
  contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  additional_text TEXT,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0
);
