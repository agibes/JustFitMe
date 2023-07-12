const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES($1, $2)
      RETURNING *;
    `, [name, description]);

    return activity;
  } catch (error) {
    throw new Error('Unable to create activity');
  }
}

async function getAllActivities() {
  try {
    const { rows: activities } = await client.query(`
      SELECT * FROM activities;
    `);

    return activities;
  } catch (error) {
    console.log(error);
  }
}

async function getActivityById(id) {
  try {
    const { rows: [activity] } = await client.query(`
      SELECT * FROM activities
      WHERE id = $1;
    `, [id]);

    return activity;
  } catch (error) {
    console.log(error);
  }
}

async function getActivityByName(name) {
  try {
    const { rows: [activity] } = await client.query(`
      SELECT * FROM activities
      WHERE name = $1;
    `, [name]);

    return activity;
  } catch (error) {
    console.log(error);
  }
}

async function attachActivitiesToRoutines(routines) {
  const routinesToReturn = [...routines]; // prevents unwanted side effects.
  // $1, $2, $3
  const position = routines.map((_, index) => `$${index + 1}`).join(', ');
  const routineIds = routines.map((routine) => routine.id);

  // get the activities, JOIN with routine_activities (so we can get a routineId)
  const { rows: activities } = await client.query(
    `
  SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities."routineId", routine_activities.id AS "routineActivityId"
  FROM activities
  JOIN routine_activities ON routine_activities."activityId" = activities.id
  WHERE routine_activities."routineId" IN (${position});
  `,
    routineIds
  );

  // console.log('these are my activities: ----->', activities);

  // loop over each routine
  for (const routine of routinesToReturn) {
    // if the routine.id matches the activtiy.routineId then add to routine.
    const activitiesToAdd = activities.filter(
      (activity) => activity.routineId === routine.id
    );

    routine.activities = activitiesToAdd;
  }

  // console.log(routinesToReturn[3]);
  // console.log('these are my routines: ----->', routines[3].activities);
  // console.log(routinesToReturn);
  return routinesToReturn;
  // try {
  //   const routineIds = routines.map((routine) => routine.id);
  //   const { rows: activities } = await client.query(`
  //     SELECT *
  //     FROM routine_activities
  //     JOIN activities ON routine_activities."activityId" = activities.id
  //     WHERE routine_activities."routineId" IN (${routineIds.join(', ')});
  //   `);

  //   const activitiesByRoutineId = activities.reduce((result, activity) => {
  //     const { routineId, ...activityData } = activity;
  //     if (!result[routineId]) {
  //       result[routineId] = [];
  //     }
  //     result[routineId].push(activityData);
  //     return result;
  //   }, {});

  //   routines.forEach((routine) => {
  //     routine.activities = activitiesByRoutineId[routine.id] || [];
  //   });

  //   return routines;
  // } catch (error) {
  //   console.log(error);
  // }
}

async function updateActivity({ id, ...fields }) {
  // console.log('in db fiels -------->',fields);
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(', ');
    //   const { rows: [updatedActivity] } = await client.query(`
    //   UPDATE activities
    //   SET ${setString}
    //   WHERE id=${id}
    //   RETURNING *;
    // `, Object.values(fields));

    const { rows: [updatedActivity] } = await client.query(`
      UPDATE activities
      SET ${setString}
      WHERE id=$1
      RETURNING *;
    `, [id, ...Object.values(fields)]);

    return updatedActivity;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  updateActivity,
};
