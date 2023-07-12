const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
// database functions
// user functions
async function createUser({
  username,
  password
}) {
  // console.log(username, password)
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    // let userToAdd = {username, hashedPassword};
    const { rows: [user] } = await client.query(`
    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username;
    `, [username, hashedPassword]);
    // console.log('user--------->', user)
    return user;
  } catch (error) {
    console.log (error);
  }
}
async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    // console.log(user);
    const hashedPassword = user.password;
    let passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) {
      console.log('passwords do not match');
      return;
    } else {
      const {rows: [user] } = await client.query(`
        SELECT id, username FROM users
        WHERE username=$1
      `, [username]);
      // console.log(user);
      return user;
    }
  } catch (error) {
    console.log(error);
  }
}
async function getUserById(userId) {
  try {
    const {rows: [user]} = await client.query(`
      SELECT id, username FROM users
      WHERE id=$1
    `, [userId]);
    if (user.length === 0) {
      console.log('could not find user');
      return;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}
async function getUserByUsername(userName) {
  try {
    const {rows: [user]} = await client.query(`
      SELECT id, username, password FROM users
      WHERE userName=$1
    `, [userName]);
    return user;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}