const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});


//function that lists all user objects in database
const listUsers = function() {
  return pool
  .query(`SELECT * FROM users`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}

listUsers()


//function that finds user object by username
const findUserByUsername = function(username) {
  return pool
  .query(`SELECT * FROM users WHERE name = '${username}'`)
  .then((result) => {
    console.log(result.rows)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}

findUserByUsername('Kira')


module.exports = { listUsers, findUserByUsername }
