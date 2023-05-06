const express = require('express');
const passport = require('passport');
const Song = require('../models/Song');
const User = require('../models/User');

const router = express.Router();
//  befor creating a now song then we have to ckech authenticate user or not 
router.post("/create",passport.authenticate('jwt',{session:false}), async(req,res)=>{

    const {name, thumbnail, track} =req.body;
    if(!name || !thumbnail || !track){
        return res.status(301).json({error:"insufficient details to create song"});
    }
    const artist =req.user._id;

    const songDetails ={name, thumbnail, track, artist};

    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);

})

// get all the songs i have published
router.get('/get/mysongs',passport.authenticate('jwt',{session:false}), async(req,res)=>{
    // artist id == currUser._id
    const song = await Song.find({artist:req.user._id});
    return res.status(200).json({data:song})
});

// get route to get all the songs any artist has published
// i will send id and i want to see all the songs that artist has published
router.get('/get/artist',passport.authenticate("jwt",{session:false}), async(req,res)=>{
    const {artistId} = req.body;
    // we can check artist does not exist
    const artist = await User.find({_id: artistId})
    if(!artist){
        return res.status(301).json({err :"Artist does not exist"});
    }
    const songs = await Song.find({artist:artistId});
    return res.status(200).json({data:songs});
});


// get route to get a single song by name
router.get("/get/songname",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    const {songName} = req.body;
    // name :songname ->exact name matching 
    // todo pattern  matching instend of direct name matching
    const song =await Song.find({name:songName})
    return res.status(200).json({data:song});

})


module.exports = router