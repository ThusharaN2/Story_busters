const { Pool } = require("pg");

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
// find user by email and password
const findUserByEmailAndPass = function(email, password) {
  return pool
  .query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password])
  .then((result) => {
    return result.rows[0]
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })

}


// find user by ID
const getUserByID= function (userID) {
  return pool
  .query(`SELECT user.id FROM users WHERE id = ${userID}`)
  .then((result) => {
    console.log(result.column)
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  })


};


module.exports = { getUserByID, findUserByEmailAndPass }
