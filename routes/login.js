const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT users.email, users.password FROM users WHERE users.email = ${userEmail} AND users.password = ${userPassword}`)
    .then(data => {

      res.render("login");
      // res.status(200).send("login path is working");
    })
    .catch(err => {
      const user = getUserByEmail(email, users);
      if (!email || !password) return res.status(401).send("Please Register");
      if (user) return res.status(403).send('Account already exists.')
      res
          .status(500)

      });
  });
  return router;
};
//login post
 // router.get("/apple", (req, res) => {
  //   return res.send("im an apple");
  // });
  // router.post("/", (req, res) => {
  //   const userEmail = req.params.email;
  //   const userPassword = req.params.password;
  //   db.query(`SELECT users.email, users.password FROM users WHERE users.email = ${userEmail} AND users.password = ${userPassword};`)
  //     .then(data => {
  //       const data = data.columns;
  //       if (data.length > 0) {
  //         return res.redirect("/user-profile");
  //       } else {
  //         res.send("Incorrect Login")
  //       }
  //       // check if user email and pw are the same as in DB
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
