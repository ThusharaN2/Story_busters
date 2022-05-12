const express = require('express');
const bodyParser = require("body-parser");
// const { json } = require('express/lib/response');
const router = express.Router();
const app = express();
const { upvote } = require("../public/scripts/databaseHelpers");
// const $ = require(jquery)


module.exports = (db) => {




  router.get('/', (req, res) => {
    // const userID = req.cookies.user_id

    db.query(`
    SELECT content, name, id FROM stories WHERE is_complete = false ORDER BY id DESC;
    SELECT additional_text, likes, story_id, id FROM proposed_additions ORDER BY id DESC;`)
      .then(data => {
        const storyDrafts = data[0].rows
        const proposedAdditions = data[1].rows
        const templateVars = { storyDrafts, proposedAdditions }
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
        const templateVars = { storyDrafts, proposedAdditions }
        res.redirect('/add-to-stories')
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  router.post('/upvotes', (req, res) => {
    console.log("add to story");
    const { upvoteID } = req.body;
    upvote(upvoteID)
      .then((data) => {
        console.log(data);
        res.json({ data })
      })
      .catch((err) => {
        res.send(err);
        console.log(err);
      })
  })

  return router;

};
