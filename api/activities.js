const express = require('express');
// const app = require('../app');
const activitiesRouter = express.Router();
const { getAllActivities, createActivity, getActivityById, getActivityByName, updateActivity, getPublicRoutinesByActivity } = require('../db');


activitiesRouter.get('/', async(req, res, next) => {
    try {
        const allActivities = await getAllActivities();
        // console.log(allActivities)
        res.send(allActivities)
    } catch (error) {
        console.log(error)
    }
});

activitiesRouter.post('/', async(req, res, next) => {
    const {name, description} = req.body;
    try {
        const activities = await getAllActivities();
        // console.log(activities);
        const result = activities.map((activity) => {return activity.name;});
        // console.log(result);
        const existingActivity = result.includes(name);
        // console.log(existingActivity);

        if (existingActivity) {
            next({
                error: 'error',
                message: 'An activity with name ' + name + ' already exists',
                name: 'ActivityExistsError'
            });
        }

        const activityData={};
        activityData.name = name;
        activityData.description = description;
        const activity = await createActivity(activityData);
        // console.log(activity);
        res.send(activity);
    } catch ({name, message}) {
        next({name, message})
    }

});

activitiesRouter.patch('/:activityId', async (req, res, next) => {
    const {activityId} = req.params;
    // console.log(activityId);
    const _activity = await getActivityById(activityId);

    if (!_activity) {
        next({
            error: 'error',
            name: 'ActivityDoesNotExistError',
            message: 'Activity ' + activityId + ' not found'
        });
    }

    const {name, description} = req.body;
    // const updateFields = {};
        
    // if (name) {
    //     updateFields.name = name;
    // }
    
    // if (description) {
    //     updateFields.description = description;
    // }
   
    try {
        const __activity = await getActivityByName(name);
        if (__activity) {
            next({
                error: 'error',
                name: 'ActivityAlreadyExistsError',
                message: 'An activity with name ' + name + ' already exists'
            });
        } else {
            const updatedActivity = await updateActivity({id: activityId, name, description});
            // console.log(updatedActivity)
            res.send(updatedActivity);
        }

    } catch (error) {
        next(error);
    }
});

activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    
const {activityId} = req.params;
// console.log('activity id ------->', activityId)
    try { 
        const activity = await getActivityById(activityId);
        // console.log('activity------>', activity);
        if (!activity) {
            next({
                error: 'error',
                name: 'ActivityDoesNotExistError',
                message: 'Activity ' + activityId + ' not found'
            });
        } 
        // console.log({id: activityId})
        const publicRoutinesWithActivity = await getPublicRoutinesByActivity({id: activityId});
        res.send(publicRoutinesWithActivity);
    } catch (error) {
        next(error);
    }
    
});
// GET /api/activities/:activityId/routines

// GET /api/activities

// POST /api/activities

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;
