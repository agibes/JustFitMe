const { attachActivitiesToRoutines } = require("./activities");
const { getUserByUsername } = require ("./users");
const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const{rows: [routine]} = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal]);
    return routine; 
  } catch (error) {
    throw new Error('Unable to create routine');
  }
}

async function getRoutineById(id) {
    try {
    const{rows: [routine]} = await client.query(`
      SELECT * FROM routines
      WHERE id=$1
    `, [id]);
    return routine; 
  } catch (error) {
    throw new Error('Unable to get routine by id');
  }
}

async function getRoutinesWithoutActivities() {
    try {
      const{rows: [routine]} = await client.query(`
      SELECT * FROM routines
      `);
      console.log(routine);
    return routine; 
  } catch (error) {
    throw new Error('Unable to get routines without activities');
  }
}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(
      `
       SELECT routines.*, users.username AS "creatorName"
       FROM routines
       JOIN users ON routines."creatorId" = users.id
    `
    );
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw new Error('Unable to get all routines');
  }
}

async function getAllPublicRoutines() {
    try {
    const{rows: routines} = await client.query(`
      SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE "isPublic" = true
    `);
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw new Error('Unable to get all public routines');
  }
}

async function getAllRoutinesByUser({ username }) {
  const user = await getUserByUsername(username);
  const userId = user.id
    try {
    const{rows: routines} = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    INNER JOIN users ON routines."creatorId" = $1
    WHERE users.id = $1
    `, [userId]);
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw new Error('Unable to get all routines by user');
  }
}

async function getPublicRoutinesByUser({ username }) {
  const user = await getUserByUsername(username);
  const userId = user.id;
    try {
    const{rows: routines} = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    INNER JOIN users ON routines."creatorId" = $1
    WHERE users.id = $1 AND routines."isPublic" = true
    `, [userId]);
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw new Error('Unable to get public routines by user');
  }
}

//id is undefined
async function getPublicRoutinesByActivity({ id }) { 
  try {
    const{rows: routines} = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      WHERE routines."isPublic" = true AND routine_activities."activityId" = $1
    `, [id]);
    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw new Error('Unable to get public routines by activity');
  }
}

async function updateRoutine({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    console.log(setString)
    const { rows: [routine] } = await client.query(`
      UPDATE routines
      SET ${setString}
      WHERE id=$1
      RETURNING *;
    `, [id, ...Object.values(fields)]);

    return routine;
  } catch (error) {
    console.log(error);
  }
}

async function destroyRoutine(id) {  
  try {
    await client.query(`
      DELETE FROM routine_activities
      WHERE routine_activities."routineId" = $1
    `,[id]);
    await client.query(`
      DELETE FROM routines
      WHERE routines.id = $1
    `,[id]);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};