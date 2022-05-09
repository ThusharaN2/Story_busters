/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/login", (req, res) => {
    db.query(`SELECT users.email FROM users;`)
      .then(data => {
        const email = data.columns;
        res.render("login", email);
        // res.status(200).send("login path is working");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/register", (req, res) => {
    console.log("here is the issuse");
        res.render("register");
        // redirect to /users/profile
  });
  router.post("/register", (req, res) => {
    const { email, password } = req.body

    console.log(req.body);

    db.query(`INSERT INTO users (email, password) VALUES (${email}, ${password}};`)
      .then(data => {
       // const email = data.columns;
        res.redirect("users");
        // redirect to /users/profile
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/profile", (req, res) => {

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
