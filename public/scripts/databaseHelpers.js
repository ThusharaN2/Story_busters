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

listUsers()


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
const fetchStoryDrafts = function() {
  return pool
  .query(`SELECT * FROM story_drafts;`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// fetchStoryDrafts();



//function that fetches all data from the stories. Prints ALL stories
const fetchFinalStories = function() {
  return pool
  .query(`SELECT * FROM final_stories;`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// fetchFinalStories();

// Function that fetches proposed additions by story_id
//lists "maybe" story options for each unfinished story
//most recent is first
const findStoryMaybes = function(storyID) {
  return pool
  .query(`
  SELECT proposed_additions.id, contributor_id, additional_text, story_id, name, story_drafts.user_id, content
  FROM proposed_additions
  JOIN story_drafts ON story_drafts.id = story_id
  WHERE story_id = ${storyID} ORDER BY proposed_additions.id DESC`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// findStoryMaybes(3)


const addUserToDatabase = function(personName, personEmail) {
  return pool
  .query (`INSERT INTO users (name, email) VALUES ('${personName}', '${personEmail}');`)
  .then((result) => {
    console.log('added values to database')
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })


}

// addUserToDatabase("Samantha", "email" )



module.exports = { listUsers, findUserByUsername, fetchStoryDrafts, fetchFinalStories, addUserToDatabase, findStoryMaybes }
