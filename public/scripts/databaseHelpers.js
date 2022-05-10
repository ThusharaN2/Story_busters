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


//function that fetches all the story drafts
const fetchStoryDrafts = function() {
  return pool
  .query(`SELECT * FROM stories WHERE is_complete = false;`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// fetchStoryDrafts();



//function that fetches all the completed stories
const fetchFinalStories = function() {
  return pool
  .query(`SELECT * FROM stories WHERE is_complete = true;`)
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
//most recent is first

const findStoryMaybes = function(storyID) {
  return pool
  .query(`
  SELECT proposed_additions.id, contributor_id, additional_text, story_id, name, stories.user_id, content
  FROM proposed_additions
  JOIN stories ON stories.id = story_id
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


//adds new user to the databse
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

//function that adds new proposed_addition
const addProposedAddition = function(contributorID, storyID, text) {
  return pool
  .query (`INSERT INTO proposed_additions (contributor_id, additional_text, story_id) VALUES (${contributorID}, '${text}', ${storyID});`)
  .then((result) => {
    console.log('added values to database')
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })


}

// addProposedAddition(4, 3, "This is my new addition to the story.")



//function that adds one vote
const upvote = function(proposedAdditionID) {
  return pool
  .query (`UPDATE proposed_additions SET likes = likes + 1 WHERE id = ${proposedAdditionID};`)
  .then((result) => {
    console.log('added likes to database')
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })


}

// upvote(2)


//function that marks a story draft "complete"
const markComplete = function(storyID) {
  return pool
  .query (`UPDATE stories SET is_complete = true WHERE id = ${storyID};`)
  .then((result) => {
    console.log('marked story complete')
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// markComplete(1);


//function that finds all of a user's story drafts
const findMyDrafts = function(userID) {
  return pool
  .query (`SELECT * FROM stories WHERE user_id = ${userID} AND is_complete = false;`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// findMyDrafts(2)


//function that find's all of a user's completed stories
const findMyCompletedStories = function(userID) {
  return pool
  .query (`SELECT * FROM stories WHERE user_id = ${userID} AND is_complete = true;`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}


// findMyCompletedStories(1);


//function that finds all of a user's stories
const findAllMyStories = function(userID) {
  return pool
  .query (`SELECT * FROM stories WHERE user_id = ${userID};`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// findAllMyStories(3)


//function that creates a new story (adds a new story to the database)
const createNewStory = function(userID, title, content) {
  return pool
  .query (`INSERT INTO stories (name, user_id, content) VALUES ('${title}', ${userID}, '${content}');`)
  .then((result) => {
    console.log('added values to database')
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}


// createNewStory(2, 'New Story', 'This is my new story. Want to add to it???')


//function that adds story to database and removes from another
//THIS MIGHT BE DIFFICULT TO IMPLEMENT??
//KEEPING IN CASE I REVERT THIS DECISION
// const markCompleteTableShuffle = function(storyDraftID, storyDraftContent, storyDraftTitle, userID) {
//   return pool
//   .query (`DELETE FROM stories WHERE id = ${storyDraftID}; INSERT INTO final_stories (name, content, user_id) VALUES ('${storyDraftTitle}', '${storyDraftContent}', ${userID})`)
//   .then((result) => {
//     console.log('added likes to database')
//   })
//   .catch((err) => {
//     console.log(err.message);
//     return null;
//   })

// }

// markCompleteTableShuffle(4, 'This is the whole story', 'My Story', 3)




module.exports = { listUsers, findUserByUsername, fetchStoryDrafts, fetchFinalStories, addUserToDatabase, findStoryMaybes, addProposedAddition, upvote, markComplete, findMyDrafts, findMyCompletedStories, findAllMyStories, createNewStory }
