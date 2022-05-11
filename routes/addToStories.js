const express = require('express');
const bodyParser = require("body-parser");
// const { json } = require('express/lib/response');
const router  = express.Router();
const app = express();

// const $ = require(jquery)


module.exports = (db) => {
  // const userID = req.cookies.user_id

  // if (!userID) {
  //   res.send("please login to view this page")
  // }

  router.get('/', (req, res) => {
    db.query(`
    SELECT content, name, id FROM stories WHERE is_complete = false ORDER BY id DESC;
    SELECT additional_text, likes, story_id, id FROM proposed_additions ORDER BY id DESC;`)
    .then(data => {
      const storyDrafts = data[0].rows
      const proposedAdditions = data[1].rows
      const templateVars = { storyDrafts, proposedAdditions}
      res.render('../views/add-to-stories', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  })

  router.post('/', (req, res) => {
    console.log(res.req.body.upvote)
    db.query(`
    SELECT content, name, id FROM stories WHERE is_complete = false ORDER BY id DESC;
    SELECT additional_text, likes, story_id, id FROM proposed_additions ORDER BY id DESC;
    UPDATE proposed_additions SET likes = likes + 1 WHERE id = ${res.req.body.upvote};`)
    .then(data => {
      // console.log(data.rows)
      const storyDrafts = data[0].rows
      const proposedAdditions = data[1].rows
      const templateVars = { storyDrafts, proposedAdditions}
      res.redirect('/add-to-stories')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;

};
