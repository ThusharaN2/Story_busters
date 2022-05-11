const express = require('express');
const bodyParser = require("body-parser");
const res = require('express/lib/response');
// const { json } = require('express/lib/response');
const router  = express.Router();
const app = express();

// const $ = require(jquery)


module.exports = (db) => {


  router.get('/', (req, res) => {


    const userID = req.cookies.user_id
    console.log(userID)
    const templateVars = { userID }
    res.render('../views/create-new-story', templateVars )
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });




  })

  router.post('/', (req, res) => {
    // console.log(res.req.body)
    // console.log(userID)
    const title = res.req.body.title;
    const story = res.req.body.story;
    const userID = req.cookies.user_id;
    // console.log(res.req.body.add_new[0])
    // console.log(userID)
    db.query(`
    SELECT content, stories.name, stories.id FROM stories JOIN users ON users.id = user_id WHERE is_complete = false AND users.id = ${userID} ORDER BY id;
    SELECT additional_text, likes, story_id, id FROM proposed_additions WHERE is_used = false ORDER BY id;
    SELECT content, stories.name, stories.id FROM stories JOIN users ON users.id = user_id WHERE is_complete = true AND users.id = ${userID} ORDER BY id;
    INSERT INTO stories (name, user_id, content) VALUES ('${title}', ${userID}, '${story}');`)
    .then(data => {
      const storyDrafts = data[0].rows
      const proposedAdditions = data[1].rows
      const completedStories = data[2].rows
      console.table(storyDrafts)
      console.table(proposedAdditions)
      console.table(completedStories)



      const templateVars = { storyDrafts, proposedAdditions, completedStories, userID }
      res.redirect(`/my-bookshelf`)



    // db.query(
    // `INSERT INTO stories (name, user_id, content) VALUES ('${title}', ${userID}, '${story}');`)
    // .then(data => {
    //   // console.log(data.rows)
    //   // const storyDrafts = data[0].rows
    //   // const proposedAdditions = data[1].rows
    //   // const templateVars = { storyDrafts, proposedAdditions}
    //   res.render(`../views/my-bookshelf`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;

};
