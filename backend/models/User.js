const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    likedSong:{
        // we will change this to array
        type:String,
        default:"",
    },
    likedPlayList:{
        // we will change this to array
        type:String,
        default:"",
    },
    subscribedArtists:{
        // we will change this to array
        type:String,
        default:"",
    }
});

const UserModel = mongoose.model('user',userSchema)
module.exports=UserModel;