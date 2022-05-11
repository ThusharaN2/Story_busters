const express = require('express');
const router = express.Router();
const { findUserByEmailAndPass } = require('../dbHelpers/serverHelpers')
// const cookieParser = require('cookie-parser')
// const cookieSession = require('cookie-session')


// router.use(cookieParser());
// router.use(cookieSession({
//   name: 'UserID',
//   keys: ["secret"],
//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))
module.exports = (db) => {
  router.get("/", (req, res) => {

    // const templateVars = {
    //   username: req.cookies["username"],
    // }
    res.render("login");
    // res.status(200).send("login path is working");
  });

  router.post("/", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = ? AND password = ?;`, email, password)
      .then( user => {
        const users = findUserByEmailAndPass(email, password);
        console.log(users);
        if (users) {
          // req.session.userID = user.id;
          res.redirect("/home");
        }
        if (!users) {
          res.send({ error: "error" })
        }
      })
      .catch(err => res.send(err));
  });
};
    // .then((user) => {
      // const user = findUserByEmailAndPass(email, password);
      // if (user) {
      //   req.session.userID = user.id;
      //   res.redirect("/home");
    //   }

    // })
    // const email = req.body.email
    // const password = req.body.password
    // .catch((err) => {
    //     if (!email || !password) {
    //       console.log(err);
    //       return res.flash('error', 'Please Register');

    //     } else {
    //       return res.flash('error', 'Wrong username/password');
    //     }
    //   })



//   })
// }

  // const loggedIn = findUserByEmailAndPass(email, password)
  //   .then(user => {
  //     console.log(user)
  //       if (!loggedIn) {
  //         return res.status(403).redirect('/register');
  //       } else {
  //         return res.redirect("home");
  //       }
  //   })

  // })

  // return router;




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
  //        .json({ error: err.message });
