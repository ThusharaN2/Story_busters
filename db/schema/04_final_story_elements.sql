DROP TABLE IF EXISTS final_story_elements CASCADE;

CREATE TABLE final_story_elements (
  id SERIAL PRIMARY KEY NOT NULL,
  initial_content_id INTEGER REFERENCES story_starters(id) ON DELETE CASCADE,
  added_content_id INTEGER REFERENCES story_snippet_options(id) ON DELETE CASCADE
)
