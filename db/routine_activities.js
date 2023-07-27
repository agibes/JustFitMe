const client = require('./client');

async function createRoutineActivity({routineId, activityId, count, duration}) {
  try {
    const {rows: [routineActivity]} = await client.query(`
      INSERT INTO routine_activities("routineId", "activityId", count, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [routineId, activityId, count, duration]);
    return routineActivity;
  } catch (error) {
    console.error(error);
  }
}

async function attachRoutineActivitiesToRoutines(routines) {
  try {
    const routinesToReturn = [...routines];

    const placeholders = routines.map((_, index) => `$${index + 1}`).join(', ');

    const routineIds = routines.map((routine) => routine.id);

    const {rows: routineActivities} = await client.query(`
      SELECT routines.*, routine_activities.duration, routine_activities.count, routine_activities."routineId", routine_activities.id AS "routineActivityId"
      FROM routines
      JOIN routine_activities ON routine_activities."routineId" = routines.id
      WHERE routine_activities."routineId" IN (${placeholders})
    `, routineIds);

    for (const routine of routinesToReturn) {
      const routineActivitiesForRoutine = routineActivities.filter((routineActivity)=> routineActivity.routineId == routine.id);
      routine.routineActivities = routineActivitiesForRoutine;
    }

    return routinesToReturn;
  } catch(error) {
    console.error(error);
  }
}

async function getRoutineActivityById(id) {
  try {
    const { rows: [routineActivity] } = await client.query(`
      SELECT * FROM routine_activities
      WHERE id = $1;
    `, [id]);

    return routineActivity;
  } catch (error) {
    console.error(error);
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: routineActivities } = await client.query(`
      SELECT * FROM routine_activities
      WHERE "routineId" = $1;
    `, [id]);
    
    return routineActivities;
  } catch (error) {
    console.error(error);
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');

    const { rows: [routineActivity] } = await client.query(`
      UPDATE routine_activities
      SET ${setString}
      WHERE id=$1
      RETURNING *;
    `, [id, ...Object.values(fields)]);

    return routineActivity;
  } catch (error) {
    console.error(error);
  }
}

async function destroyRoutineActivity(id) {
  try {
    const { rows: [routineActivity] } = await client.query(`
      DELETE FROM routine_activities
      WHERE id=$1
      RETURNING *;
    `, [id]);

    return routineActivity;
  } catch (error) {
    console.error(error);
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const { rows: [routineActivity] } = await client.query(`
      SELECT routines.*
      FROM routines
      JOIN routine_activities ON routines.id = routine_activities."routineId"
      WHERE routine_activities.id=$1 AND routines."creatorId"=$2;
    `, [routineActivityId, userId]);

    return !!routineActivity;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getRoutineActivityById,
  createRoutineActivity,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
  attachRoutineActivitiesToRoutines
};
