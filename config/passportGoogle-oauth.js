const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/userModel');
//implement google startegy
passport.use(new googleStrategy({
        clientID:'1069690257750-hu26flbs7gk67a0dm91u2fc69n3lq0si.apps.googleusercontent.com', //checks for these credentials
        clientSecret:'NHS1mI_dLK2JqF4XX0_nUV7T',
        callbackURL:"http://localhost:8000/signin/auth/google/callback",//if verified then does the callback
    },
    //callback function has the authenticated user profile from google 
    //if user is found then login else create and then login
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
            if(err){
                console.log('Error',err);
                return;
            }
            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                },(err,user)=>{
                    if(err){
                        console.log('Error',err);
                        return;
                    }
                    else{
                        return done(null,user);
                    }
                });
            }
        })
    }
));
module.exports=passport;
