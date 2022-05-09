const express = require('express');
const bodyParser = require("body-parser");
// const { json } = require('express/lib/response');
const router  = express.Router();
const app = express();
// const $ = require(jquery)


module.exports = (db) => {

  router.get('/', (req, res) => {
    db.query(`SELECT stories.content FROM stories WHERE is_complete = false;`)
    .then(data => {
      console.log(data.rows)
      res.render('../views/add-to-stories')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  })

  return router;

};
