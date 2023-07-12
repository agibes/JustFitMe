require("dotenv").config()
const path = require('path');
const express = require("express")
const app = express()
const apiRouter = require('./api');
const morgan = require('morgan');
const cors = require('cors');
const client = require("./db/client");

client.connect();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
// let count=0
app.use((req, res, next) => {
    // if (req) {
    //     count +=1;
    // }
    // console.log(count)
    // console.log(req.body);
    next();
});

app.get('/', express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.use((req, res, next) => {
    //check for better solution
    res.status(403);
    res.send({
        error: 'error',
        message: 'User is not allowed to update Every day',
        name: 'UpdateError'
    }); 
})

app.use((error, req, res, next) => {
    res.send({
        error: error.error,
        message: error.message,
        name: error.name
    });
});
    
module.exports = app;
