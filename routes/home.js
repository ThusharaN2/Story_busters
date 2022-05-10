// app.post("/home", (req, res) => {
//   res.render("/home");
// });

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userEmail = req.params.email;
   const userPassword = req.params.password;
   console.log(userEmail)
   console.log(userPassword)
  })
};
