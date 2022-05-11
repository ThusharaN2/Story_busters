const express = require('express');
const bodyParser = require("body-parser");
// const { json } = require('express/lib/response');
const router  = express.Router();
const app = express();

// const $ = require(jquery)


const findFirstValue = function(string) {
  let finalString = ''
  let i = 0;
  while (string[i] !== ',' ) {
    console.log(i)
    finalString = finalString + string[i];
    i++
  }
  return finalString
}

// console.log(findFirstValue("1234,12431243"))

const findLastValue = function(string) {
  let finalString = ''
  let i = string.length -1;
  while (string[i] !== ',' ) {
    console.log(i)
    finalString = string[i] + finalString
    i--
  }
  return finalString
}


// console.log(findLastValue("1234,12431243"))

module.exports = (db) => {

  router.get('/', (req, res) => {
    // console.log()

    const userID = req.cookies.user_id
    console.log(userID)

    if (!userID) {
      res.send("You must be logged in to view this page")
    } else {

    db.query(`
    SELECT content, stories.name, stories.id FROM stories JOIN users ON users.id = user_id WHERE is_complete = false AND users.id = ${userID} ORDER BY id DESC;
    SELECT additional_text, likes, story_id, id FROM proposed_additions WHERE is_used = false ORDER BY id;
    SELECT content, stories.name, stories.id FROM stories JOIN users ON users.id = user_id WHERE is_complete = true AND users.id = ${userID} ORDER BY id DESC;`)
    .then(data => {
      const storyDrafts = data[0].rows
      const proposedAdditions = data[1].rows
      const completedStories = data[2].rows
      console.table(storyDrafts)
      console.table(proposedAdditions)
      console.table(completedStories)


      const templateVars = { storyDrafts, proposedAdditions, completedStories, userID }
      res.render('../views/my-bookshelf', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  }


  })

  router.post('/', (req, res) => {

    const snippetID = findFirstValue(res.req.body.add);
    const mainStoryID = findLastValue(res.req.body.add);
    const userID = req.cookies.user_id



    db.query(`UPDATE stories
    SET content = CONCAT(stories.content, ' ', (
      SELECT additional_text
      FROM proposed_additions
      WHERE proposed_additions.id = ${snippetID}))
    WHERE stories.id = ${mainStoryID};
    UPDATE proposed_additions SET is_used = true WHERE proposed_additions.id = ${snippetID}
    `)
    .then(data => {
      // console.log(data.rows)
      console.log(data)

      res.redirect(`/my-bookshelf`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;

};



