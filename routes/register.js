const express = require('express');
const router  = express.Router();


module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("register");
    // redirect to /users/profile
  });
  router.post("/register", (req, res) => {
    const { user } = req.body;
    console.log(`here is the ${user}`);
  db.query(`INSERT INTO users (id, name, email, password) VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password}};`)
.then()
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
