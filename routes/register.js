// app.get("/register", (req, res) => {
//   //if user is found in DB
// })
// app.post("/register", (req, res) => {
// const { email, password } = req.body

// });
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
  const userEmail = req.params.email;
  const userName = req.params.name;
  db.query(`INSERT INTO users (name, email) VALUES (${userEmail}, ${userName};`)
    .then(data => {
      const email = data.columns;
      res.status(200).send(`${email} register path is working`);
      // redirect to /users/profile
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});
return router;
};
