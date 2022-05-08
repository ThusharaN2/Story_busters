const express = require('express');
const router  = express.Router();



module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT users.email FROM users;`)
      .then(data => {
        const email = data.columns;
        res.status(200).send("login path is working");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
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
  return router;
};



// app.get("/login", (req, res) => {
//   //if user redirect to the users
//   res.render("/login");
// });
// app.post("/login", (req, res) => {
//   //if password AND email are incorrect then redirect to the register page.
//   //if user info is found in database then redirect to users.
//   // if user not found in database return error msg "User not found. Please Register" (then maybe redirect)
//   // if user is found but pw is wrong return error message "wrong password"
// });
