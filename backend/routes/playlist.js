const express = require('express')
const passport = require('passport')
const PlayList = require('../models/PlayList')
const User = require('../models/User')
const Song = require('../models/Song')

const router = express.Router();

// 1 Routecreate a playlist 
router.post("/create",passport.authenticate("jwt",{session:false}), async(req,res)=>{
    const currUser = req.user;
    const {name,thumbnail,songs }=req.body;
    if(!name || !thumbnail || !songs){
        return res.status("301").json({err:"Insufficient data"})
    }
//empty playlist data
    const playlistData ={
        name,
        thumbnail,
        songs,
        owner:currUser._id,
        collaborators:[],
    }

    const playlist = await PlayList.create(playlistData);
    return res.status(200).json(playlist);

})


// 2 get a playlist by id
// we will get the playlist id as a  route parameter and we will return the playlist having id
// we need exact match if we are doing /playlist/get/:playlistId (focus on the :)-now playlistId is a variable whitch we can assign any value 
router.get("/get/playlist/:playlistId", passport.authenticate("jwt",{session:false})
,async(req, res)=>{
    // this concept is called req.params
 const playlistId = req.params.playlistId;
 // i need to find the -id =playlistId
 const playlist = await PlayList.findOne({_id:playlistId});
 if(!playlist){
    return res.status(301).json({error: "Invalid playlistId"});
 }else{
    return res.status(200).json(playlist);
 }

})

// 3 get all playlists made by an artist
router.get("/get/artist/:artistId", passport.authenticate("jwt",{session:false}),async(req, res)=>{
    const {artistId} = req.params;
    // we can do this : Check if artist with given artistId is exists
    const artist = await User.findById({_id: artistId});
    if(!artist){
        return res.status(300).json({error: "Invalid playlistId"});
     }

    const playlist = await PlayList.find({owner:artistId});
    return res.status(200).json({Data:playlist});
})


// 4 add a song to a playlist
router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    
      const currUser = req.user;
      const { playlistId, songId } = req.body;
  
      // Step 0: Get the playlist if valid
      const playlist = await PlayList.findOne({ _id: playlistId });
      if (!playlist) {
        return res.status(404).json({ error: "Playlist does not exist" });
      }
  
      // Step 1: Check if currUser owns the playlist or is a collaborator
      if (!playlist.owner.equals(currUser._id) && !playlist.collaborators.includes(currUser._id)) {
        return res.status(403).json({ error: "Not allowed" });
      }
  
      // Step 2: Check if the song is a valid song
      const song = await Song.findOne({ _id: songId });
      if (!song) {
        return res.status(404).json({ error: "Song does not exist" });
      }
  
      // Step 3: Add the song to the playlist
      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).json(playlist);
    
  });
  





module.exports = router
