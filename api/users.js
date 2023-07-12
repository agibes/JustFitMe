/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();

const { getUserByUsername, createUser, getUserById, getUser } = require('../db/users');
const { getPublicRoutinesByUser, getAllRoutinesByUser } = require('../db/routines');
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { JWT_SECRET } = process.env;

// POST /api/users/register.
usersRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            throw new Error("User " + _user.username + " is already taken.")
        }
        if (password.length < 8) {
            throw new Error ("Password Too Short!")
        }

        const user = await createUser({
            username,
            password
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: "1w"
        });

        res.send({
            message: "You Successfully Registered!",
            user,
            token,
        });
    }
    catch ({ name, message }) {
        res.send({
            message: message,
            error: 'error',
            name,
        });
    }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    console.log( { username, password }  )
    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    }

    try {
        const user = await getUser({ username, password });
        console.log('user in user api--->', user);
        
        if (user) {
            const token = await jwt.sign(user, process.env.JWT_SECRET);
            res.send({
                message: "you're logged in!",
                token: token,
                user
            });
        } else {
            next({
                name: "IncorrectCredentialsError",
                message: "Username or password is incorrect"
            })
        }
    }
    catch ({ name, message }) {
        res.send({
            message: message,
            error: 'error',
            name,
        });
    }
})

// GET /api/users/me
usersRouter.get("/me", async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
    try {
        if (!auth) {
            throw new Error ("You must be logged in to perform this action")
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length)
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                // console.log("----->USER", req.user)
                res.send(req.user);
            }
        }
    }
    catch ({ name, message }) {
        res.status(401).send({
            message: message,
            error: 'error',
            name,
        });
    }
});

// GET /api/users/:username/routines
usersRouter.get("/:username/routines", async (req, res, next) => {
    const { username } = req.params;
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
    try {
        
        if (!auth) {
            throw new Error ("You must be logged in to perform this action")
        } else if (auth.startsWith(prefix)) {
            const token = auth.slice(prefix.length)
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                // console.log("----->USER", req.user)
                if(req.user.username === username) {
                    const routine = await getAllRoutinesByUser({ username });
                    res.send(routine);
                }
                else {
                    const routine = await getPublicRoutinesByUser({ username });
                    
                    res.send(routine);
                }
            }
        }
    }
    catch (error) {
        next(error);
    }
})


module.exports = usersRouter;