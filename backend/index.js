// use express
const express = require('express')
const dotenv = require('dotenv')

const authRoutes = require("./routes/auth")
const songRoutes = require("./routes/song")
const playlistRoutes = require("./routes/playlist")

const app = express()
dotenv.config();
const port =process.env.PORT || 8001

// connect mongoDB to node app
// mongoose connect take 2 arguments 1 ->DB connection url and 2-> connection options
const mongoDB = require('./db');
mongoDB();

app.use(express.json());

app.use('/auth',authRoutes);
app.use("/song",songRoutes);
app.use("/playlist",playlistRoutes);

app.listen(port,()=>{
    console.log(`listening on ${port}`)
});