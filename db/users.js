const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const { attachUserRoutinesToUser } = require("./routines");

async function createUser({username, password}) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const { rows: [user] } = await client.query(`
    INSERT INTO users(username, password)
    VALUES($1, $2)
    ON CONFLICT (username) DO NOTHING
    RETURNING id, username;
    `, [username, hashedPassword]);
    return user;
  } catch (error) {
    console.log (error);
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
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

async function getAllUsers() {
  try {
    const {rows: users} = await client.query(`
      SELECT * FROM users
    `);
    console.log('users from getAll Users:', users)
    return await attachUserRoutinesToUser(users);
  } catch (error) {
    console.error(error);
  }
}

async function createUserRoutine({routineId, userId}) {
  try {
    const {rows: [userRoutine]} = await client.query(`
      INSERT INTO user_routines("routineId", "userId")
      VALUES ($1, $2)
      RETURNING *;
    `, [routineId, userId]);
    console.log(userRoutine);
    return userRoutine;
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  createUserRoutine,
  getAllUsers
}