const express = require('express');
const router = express.Router();
// const { findUserByEmailAndPass } = require('../dbHelpers/serverHelpers')

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("login");
    // res.status(200).send("login path is working");
  });

  router.post("/", (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1;`, [email, password])
    .then(users => {
        console.log(users.rows);
        const user = users.rows[0];
        // const users = findUserByEmailAndPass(email, password);
        if (user) {
          console.log(user);
          // req.session.usersID = user.id;
          res.cookie('user_id', user.id);
          res.redirect("/");
        }
        if (!user) {
          res.send({ error: "error" })
        }
      })
      .catch(err => res.send(err));
  });
  return router;
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
