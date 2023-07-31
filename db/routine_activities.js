const client = require('./client');

//create a form to collect information to create a routine activity for the user
//select routine
//select activity
//insert count
//insert duration

//freqyency?
     
     ///////if someone create a cardio day routine, and they want to add x activitiy so that its set to be done at y count and z duration
     ///////get all routine-activities with a certain routine ID - (when you add a new routine to your routines) - search the routine activities list and pull up all the information for which activities, what routine they are associated with, their duration and count - to be listed on your profile (as a to do list?)

     ///////find a way to keep track of a users routines - the ones they are following and the ones they created - (creatorID on routines) - latter to be displayed with edit capability, former to be displayed on profile
     //consider adding a target muscle group to each activity so that later you can add an image map over the body picture you have in activities

         //submitting the form creates the routine activity, which then gets added to the routine

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
      SELECT routine_activities.duration, routine_activities.count, routine_activities."routineId", routine_activities."activityId", routine_activities.id AS "routineActivityId"
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
