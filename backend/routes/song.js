const express = require('express');
const passport = require('passport');
const Song = require('../models/Song');

const router = express.Router();
//  befor creating a now song then we have to ckech authenticate user or not 
router.post("/create",passport.authenticate('user'), async(req,res)=>{

    const {name, thumbnail, track} =req.body;
    if(!name || !thumbnail || !track){
        return res.status(301).json({error:"insufficient details to create song"});
    }
    const artist =req.user._id;

    const songDetails ={name, thumbnail, track, artist};

    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);

})


module.exports = router