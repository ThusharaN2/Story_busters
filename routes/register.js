const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {
    const { email, password } = req.body
  db.query(`INSERT INTO users (email, password) VALUES (${email}, ${password}};`)

  res.render("register");
  // redirect to /users/profile
});
router.post("/register", (req, res) => {

console.log(req.body);


// .then(data => {
//  // const email = data.columns;
//   res.redirect("users");
//   // redirect to /users/profile
// })
// .catch(err => {
//   res
//     .status(500)
//     .json({ error: err.message });
// });
// });
});
return router;
};
