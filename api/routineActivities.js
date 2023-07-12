const express = require('express');
const router = express.Router();

const { getRoutineActivityById, updateRoutineActivity, destroyRoutineActivity, getRoutineById, NotFoundError } = require('../db');
const { requireUser } = require('./utils');
const { UnauthorizedUpdateError, UnauthorizedDeleteError } = require('../errors');

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', requireUser, async (req, res, next) => {
  try {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;

    // Check if routine_activity exists
    const routineActivity = await getRoutineActivityById(routineActivityId);
    if (!routineActivity) {
      throw new NotFoundError('Routine activity not found');
    }

    // Check if user is the owner of the routine
    const routine = await getRoutineById(routineActivity.routineId);
    console.log(routine);
    if (routine.creatorId !== req.user.id) {
      res.status(403).send({error:'', name: routine.name, message: 'User ' + req.user.username + ' is not allowed to update ' + routine.name});
    }

    // Update routine_activity
    const updatedRoutineActivity = await updateRoutineActivity({ id: routineActivityId, count, duration });
    console.log('updatedRoutineActivity:', updatedRoutineActivity);
    res.send(updatedRoutineActivity);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', requireUser, async (req, res, next) => {
  const { routineActivityId } = req.params;

  try {
    // Check if routine activity exists
    const routineActivity = await getRoutineActivityById(routineActivityId);
    if (!routineActivity) {
      throw new NotFoundError('Routine activity not found');
    }

    // Check if user is the owner of the routine
    const routine = await getRoutineById(routineActivity.routineId);
    if (routine.creatorId !== req.user.id) {
      res.status(403).send({error:'', name: routine.name, message: 'User ' + req.user.username + ' is not allowed to delete ' + routine.name});
    }

    await destroyRoutineActivity(routineActivityId);
    res.send(routineActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
