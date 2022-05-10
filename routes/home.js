// app.post("/home", (req, res) => {
//   res.render("/home");
// });

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("home")
  });

  router.post("/", (req, res) => {
    const userID = req.body.id;
    getUserByID(userID)
    .then(user => {
      console.log(userID)
        if (!userID) {
          return res.render("home");
        }
    })
  })
};

// const userEmail = req.params.email;
// const userPassword = req.params.password;
// console.log(userEmail)
// console.log(userPassword)
