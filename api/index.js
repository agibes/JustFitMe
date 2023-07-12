const express = require('express');
const router = express.Router();
const {getUserById} = require('../db')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

// GET /api/health
router.get('/health', function (req, res, next) {
    res.send({message: 'all is well'});
})

router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            // console.log(JWT_SECRET);
            const {id} = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({name, message}) {
            next({name, message});
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
router.use('/activities', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
router.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
router.use('/routine_activities', routineActivitiesRouter);

router.use(function(req, res, next) {
    res.status(404).send({message: 'Not found'});
});


module.exports = router;
