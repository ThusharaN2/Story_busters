// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
//  function logger(req, res, next) {
//   console.log(req.originalUrl);
//   next();
// }

// app.use(loggger);
app.use(morgan("dev"));

app.use(cookieParser());
app.use(cookieSession({
  name: 'UserID',
  keys: ["secret"],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
  );

  app.use(express.static("public"));

  // Separated Routes for each Resource
  // Note: Feel free to replace the example routes below with your own
  const usersRoutes = require("./routes/users");
  const widgetsRoutes = require("./routes/widgets");
  const loginRoutes = require("./routes/login");
  const registerRoutes = require("./routes/register");
  const addToStoriesRoutes = require("./routes/addToStories");

  const myBookshelfRoutes = require("./routes/myBookshelf");
  const homeRoutes = require("./routes/home");
  const req = require("express/lib/request");

  const myBookshelfRoutes = require("./routes/myBookshelf")
  const addNewIdea = require("./routes/addNewIdea")
  const createNewStory = require("./routes/createNewStory")
  const markComplete = require("./routes/markComplete")


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/widgets", widgetsRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/add-to-stories", addToStoriesRoutes(db));
app.use("/:id/my-bookshelf", myBookshelfRoutes(db));

app.use("/home", homeRoutes(db));

app.use("/add-new-idea", addNewIdea(db));
app.use("/:id/create-new", createNewStory(db));
app.use("/:id/tadaa", markComplete(db));


// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  db.query(`
  SELECT content, name, id, is_complete FROM stories ORDER BY id DESC LIMIT 6;`)
  .then(data => {
    const story1 = data.rows[0]
    const story2 = data.rows[1]
    const story3 = data.rows[2]
    const story4 = data.rows[3]
    const story5 = data.rows[4]
    const story6 = data.rows[5]
    const isComplete = "✅"
    console.log(story1)

    const templateVars = { story1, story2, story3, story4, story5, story6, isComplete }
    res.render('home', templateVars)
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

  // res.render("home"); //home ?



});

app.listen(PORT, () => {
  console.debug(`Example app listening on port ${PORT}`);
});
