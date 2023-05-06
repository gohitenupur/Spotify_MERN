const mongoose = require("mongoose");
// import passport and use 
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User');
const passport = require('passport');
require('dotenv').config();
const mongoDB = () => {

  mongoose
    .connect(process.env.BASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB");
    });

  // setup passport jwt 

  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_KEY;
  
  passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (err) {
      return done(err, false);
    }
  }));
 
};

module.exports = mongoDB;