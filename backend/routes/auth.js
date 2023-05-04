const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User')
const {getToken} = require('../utils/helpers');
const router = express.Router();

//  this post router will help to register the user
router.post('/register', async(req, res)=>{
    // step 1 : req.body = firstname ,lastname ,username ,password email
    const {email,password,firstName,lastName,userneme} = req.body;
    // step 2 :does the user this email already exist or not?
    const user =await User.findOne({email: email});
    if(user){
        return res.status(403).json({error :"User already exists"})
    }

    // this is a valid user
    // step 3 : create a new user in the database
    // note : we do not use plain text in password 
    // so we convert the plain text to hash. 
    const haspPassword =bcrypt.hash(password,process.env.SALT_VALUE);
    const newUserData ={email,password:haspPassword,firstName,lastName,userneme}
    const newUser =await User.create(newUserData);
    // step 4: create unique token to return to the user

    const token =await getToken(email,newUser); // we have to make it 
    // step 5  return the result to user

    const userToReturn ={...newUser,token};
    delete userToReturn.password; // not return to the user back
    return res.status(200).json(userToReturn);
})

module.exports =router
