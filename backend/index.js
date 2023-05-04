// use express
const express = require('express')
const mongoose  = require('mongoose')
const dotenv = require('dotenv')

const app = express()
dotenv.config();
const port =process.env.PORT || 8001


// connect mongoDB to node app
// mongoose connect take 2 arguments 1 ->DB connection url and 2-> connection options
const mongoDB = require('./db');
mongoDB();


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen(port,()=>{
    console.log(`listening on ${port}`)
});