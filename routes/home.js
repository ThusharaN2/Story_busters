// app.post("/home", (req, res) => {
//   res.render("/home");
// });
const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.email FROM users;`)
      .then(data => {
        const email = data.columns;
        res.json({ email });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
