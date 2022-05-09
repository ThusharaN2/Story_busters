router.get("/register", (req, res) => {

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
