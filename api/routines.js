const express = require('express');
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine, getRoutineActivitiesByRoutine, destroyRoutineActivity, addActivityToRoutine, getActivityById } = require('../db');
const {requireUser} = require('./utils')
const router = express.Router();

// GET /api/routines

router.get('/', async (req, res, next) => {
    try {
        const allPublicRoutines = await getAllPublicRoutines();
        // console.log(allPublicRoutines)
        res.send(allPublicRoutines);
    } catch (error) {
        next(error);
    }
})

router.post('/', requireUser, async (req, res, next) => {
    try {
        const {isPublic, name, goal} = req.body;
        const routine = await createRoutine({creatorId: req.user.id, isPublic, name, goal});

        res.send(routine);
    } catch (error) {
        next(error);
    }
});

router.patch('/:routineId', requireUser, async (req, res, next) => {
    const {routineId} = req.params;
    const {creatorId, isPublic, name, goal} = req.body;
    const routine = await getRoutineById(routineId);
    try {
        if (routine && routine.creatorId == req.user.id) {
            const updatedRoutine = await updateRoutine({id: routineId, creatorId, isPublic, name, goal})
            res.send(updatedRoutine);
        } else {
            res.status(403);
            next({
                error: 'error',
                message: 'User ' + req.user.username + ' is not allowed to update Every day',
                name: 'UpdateError'
            }); 
        }
    } catch (error) {
        next(error);
    }
})

router.delete('/:routineId', requireUser, async (req, res, next) => {
    const {routineId} = req.params;
    const routine = await getRoutineById(routineId);
    try {
        if (routine && routine.creatorId == req.user.id) {
            await destroyRoutine(routineId);
            res.send(routine);
        } else {
            res.status(403);
            next({
                error: 'error',
                message: 'User ' + req.user.username + ' is not allowed to delete On even days',
                name: 'UpdateError'
            }); 
        }
    } catch (error) {
        next(error);
    }
})

router.post('/:routineId/activities', requireUser, async (req, res, next) => {
    try {

        const {routineId} = req.params;
        // console.log('r',{id: routineId})
        
        const {activityId, count, duration} = req.body;
        // console.log('activityID', activityId)
        // const activityToAdd = await getActivityById(activityId);
        // console.log('activity', activityToAdd)
        
        // console.log('routineId',routineId)
        // const _routine = await getRoutineById(routineId);
        // console.log('routine',_routine)

        const foundRoutineActivities = await getRoutineActivitiesByRoutine({id: routineId});
        const existingRoutineActivities = foundRoutineActivities && foundRoutineActivities.filter(routineActivity => routineActivity.activityId === activityId);

        if (existingRoutineActivities && existingRoutineActivities.length) {
        
            next({
                error: 'error',
                message: 'Activity ID ' + activityId + ' already exists in Routine ID ' + routineId,
                name: 'ActivityExistsError'
            }); 
            
       
        } else {

            const routine = await addActivityToRoutine({routineId, activityId, count, duration});
            if (routine) {

                // console.log(routine);
                res.send(routine);
            } else {
                next({
                    error: 'error',
                    message: 'Activity ID ' + activityId + ' already exists in Routine ID ' + routineId,
                    name: 'ActivityExistsError'
                }); 
            }

        }

    } catch  (error) {
        next(error);
    }
}) 

// POST /api/routines

// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
