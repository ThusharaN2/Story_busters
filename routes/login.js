const express = require('express');
const { password } = require('pg/lib/defaults');
const router = express.Router();
const { findUserByEmailAndPass } = require('../dbHelpers/serverHelpers')



module.exports = (db) => {
  router.get("/", (req, res) => {
      res.render("login");
      // res.status(200).send("login path is working");
  });

  router.post("/", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    findUserByEmailAndPass(email, password)
    .then(user => {
      console.log(user)
        if (!user) {
          return res.status(403).redirect('register');
        } else {
          return res.redirect("/home");
        }
    })

  })

  return router;
};



//login post
// router.get("/apple", (req, res) => {
  //   return res.send("im an apple");
  // });
  //       } else {
  //         res.send("Incorrect Login")
  //       }
  //       // check if user email and pw are the same as in DB
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
