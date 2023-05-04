const mongoose = require('mongoose');

const playListSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    owner:{
       type:mongoose.Types.ObjectId,
       ref:"user",
    },
    // 1 playlist me song kounsa hai
    // 2 playlist ke collaborator   
    songs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"song",
        },  
    ],
    collaborators:[{
        type:mongoose.Types.ObjectId,
        ref:"user",
    }],

});

const PlayListModel = mongoose.model('playlist',playListSchema)
module.exports=PlayListModel;