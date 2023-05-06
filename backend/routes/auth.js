const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { getToken } = require("../utils/helpers");
const router = express.Router();

//  this post router will help to register the user
router.post('/register', async(req, res)=>{
    // step 1 : req.body = firstname ,lastname ,username ,password email
    const {email,password,firstName,lastName,username} = req.body;
    // step 2 :does the user this email already exist or not?
    const user =await User.findOne({email: email});
    if(user){
        return res.status(403).json({error :"User already exists"})
    }

    // this is a valid user
    // step 3 : create a new user in the database
    // note : we do not use plain text in password 
    // so we convert the plain text to hash. 
    const hashedPassword = await bcrypt.hash(password,10);
    const newUserData ={email,password: hashedPassword, firstName, lastName, username}
    const newUser =await User.create(newUserData);
    // step 4: create unique token to return to the user

    const token = await getToken(email, newUser._id);
     // we have to make it 
    // step 5  return the result to user
    // console.log(token);
    const userToReturn ={...newUser, token};

    delete userToReturn.password; // not return to the user back
    return res.status(200).json(userToReturn);
});


// login the user
router.post('/login',async(req, res) => {
    // step 1 get email and password send by user from req.body
    const {email,password } =req.body;
    // step 2 check the email exist in db  if not the credential are invalid
    const user = await User.findOne({email:email});
    if(!user) {
        return res.status(403).json({error:"Invalid credentials"});
    }
    // step 3 if email is correct check the password is correct if not the credential are invalid
    // this is a tricky step .why?
    // i cannot do :if(password === user.password) becouse user have hash value
    // bcrypt compare enabled us to compare in plain text (password from req.body) to hash password (in our db) security wise.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(403).json({err:"Invalid credentials"});
    }

    // step 4 if the credentials are correct , return a token to the user
    const token = await getToken(user.email,user);
    // console.log(token);
    const userToReturn ={...user.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);

})
module.exports =router
