const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


//function that lists all user objects in database
const listUsers = function() {
  return pool
  .query(`SELECT * FROM users`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}

// listUsers()


//function that finds user object by username
const findUserByUsername = function(username) {
  return pool
  .query(`SELECT * FROM users WHERE name = '${username}'`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}

// findUserByUsername('Kira')


//function that fetches all data from the stories. Prints ALL stories
const fetchStories = function() {
  return pool
  .query(`SELECT * FROM story_starters;`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

fetchStories();

// Function that fetches story_snippet_options object by story_id
//lists "maybe" story options for each unfinished story
//most recent is first
const findStoryMaybes = function(storyID) {
  return pool
  .query(`
  SELECT story_snippet_options.id, contributor_id, story_snippet_text, story_id, name, story_starters.user_id, initial_content
  FROM story_snippet_options
  JOIN story_starters ON story_starters.id = story_id
  WHERE story_id = ${storyID} ORDER BY story_snippet_options.id DESC`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// findStoryMaybes(1)





module.exports = { listUsers, findUserByUsername, fetchStories }
