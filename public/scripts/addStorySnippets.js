
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
  .query(`SELECT initial_content FROM story_starters WHERE id = ${mainStoryID}`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}

selectMainContent(3)


//might not need, but made it along the way
const selectWinningText = function(snippetID) {
  return pool
  .query(`SELECT story_snippet_text FROM story_snippet_options WHERE id = ${snippetID}`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })
}

selectWinningText(8)


//adds approved string to the main story string
const addWinningTextToDatabase = function(mainStoryID, snippetID) {
  return pool
  .query(`
  UPDATE story_starters
  SET initial_content = CONCAT(initial_content, ' ', (
    SELECT story_snippet_text
    FROM story_snippet_options
    WHERE story_snippet_options.id = ${snippetID}))
  WHERE story_starters.id = ${mainStoryID};
  `)
  .then((result) => {
    console.log('Added text from story_snippet_options.id', snippetID, 'to story_starters.id', mainStoryID)

  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}


addWinningTextToDatabase(1, 6)


module.exports = { selectMainContent, selectWinningText, addWinningTextToDatabase }
