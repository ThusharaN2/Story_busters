
const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


//might not need, but made it along the way
const selectMainContent = function(mainStoryID) {
  return pool
  .query(`SELECT content FROM stories WHERE id = ${mainStoryID}`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}

// selectMainContent(3)


//might not need, but made it along the way
const selectWinningText = function(snippetID) {
  return pool
  .query(`SELECT additional_text FROM proposed_additions WHERE id = ${snippetID}`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

// selectWinningText(8)


//adds approved string to the main story string
const addWinningTextToDatabase = function(mainStoryID, snippetID) {
  return pool
  .query(`
  UPDATE stories
  SET content = CONCAT(stories.content, ' ', (
    SELECT additional_text
    FROM proposed_additions
    WHERE proposed_additions.id = ${snippetID}))
  WHERE stories.id = ${mainStoryID};
  `)
  .then((result) => {
    console.log('Added text from proposed_additions.id', snippetID, 'stories.id', mainStoryID)

  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}


// addWinningTextToDatabase(1, 6)


module.exports = { selectMainContent, selectWinningText, addWinningTextToDatabase }
