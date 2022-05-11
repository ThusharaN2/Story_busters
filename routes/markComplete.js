const express = require('express');
const bodyParser = require("body-parser");
const { send } = require('express/lib/response');
// const { json } = require('express/lib/response');
const router  = express.Router();
const app = express();

// const $ = require(jquery)


module.exports = (db) => {

  router.get('/', (req, res) => {
    const storyID = res.req.query.id
    // console.log(storyID)
    db.query(`
    SELECT content, name, id FROM stories WHERE id = ${storyID};`)
    .then(data => {
      console.log(data.rows)
      const story = data.rows[0].content
      const title = data.rows[0].name
      // const storyID = data.rows[0].id
      console.log(story, title, storyID, "I am here")
      const templateVars = { story, title, storyID}
      res.render("mark-complete", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  })


  router.post('/', (req, res) => {
    // router.send("Hi")
    // const newText = res.req.body['new-text']
    // const storyID = res.req.body.addNew
    // console.log(res.req.body)
    const storyID = res.req.body.complete
    console.log(storyID)


    db.query(`
    SELECT users.id FROM users JOIN stories ON stories.user_id = users.id WHERE stories.id = ${storyID} AND stories.user_id = users.id;
    UPDATE stories SET is_complete = true WHERE id = ${storyID};`)
    .then(data => {
      console.log(data[0].rows[0].id)
      // console.log(data.rows)
      // const storyDrafts = data[0].rows
      // const proposedAdditions = data[1].rows
      // const templateVars = { storyDrafts, proposedAdditions}
      res.redirect(`/my-bookshelf`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })








    // db.query(`SELECT users.id FROM users JOIN stories ON stories.user_id = users.id WHERE stories.id = ${storyID} AND stories.user_id = users.id;
    // UPDATE stories SET is_complete = true WHERE id = ${storyID};
    // `)
    // .then(data => {
    //   console.log(data)
    //   // res.redirect(`/${users.id}/my-bookshelf`)
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // });
  // })

  return router;

};
