const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');


// function validateCookie(req, res, next) {
//   const { cookies } = req;
//   console.log(cookies);
//   next();
// }
// function valideUser(user) {
//   const validEmail = typeof user.email == 'string' && user.email.trim() != '';
//   const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 3;

//   return validEmail && validPassword;
// }
// router.post("/", (req, res, next) => {
//   if (valideUser(req, res)) {
//     res.redirect("/home");
//   } else {
//     next(newError('Invaild user'));
//   }
// })

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("register");
    // redirect to /users/profile
  });
  router.post("/", (req, res) => {
  const { name, email, password } = req.body

  console.log(req.body);

  db.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}') RETURNING *;`)
  .then(result => {
    const user = result.rows[0];
    console.log(user);
   // const email = data.columns;

   res.cookie('user_id', user.id);
    res.redirect("/");
    // redirect to /users/profile
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
  });
  return router;
}


