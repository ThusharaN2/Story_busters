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

    db.query(`
    SELECT content, name, id FROM stories WHERE id = ${storyID};`)
    .then(data => {
      console.log(data.rows)
      const story = data.rows[0].content
      const title = data.rows[0].name
      const templateVars = { story, title, storyID}
      res.render("add-new-idea", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  })


  router.post('/', (req, res) => {
    const newText = res.req.body['new-text']
    const storyID = res.req.body.addNew

    db.query(`
    INSERT INTO proposed_additions (additional_text, story_id) VALUES ('${newText}', ${storyID});
    `)
    .then(data => {
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
