const passport=require('passport');
const User=require('../models/userModel');
const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
//implementing the local startegy and using bycrypt to hash the entered password and compare 
//it with the hash stored in our db
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,//this is done to set req option in passport to display flash messages for reason login was unsuccessful
    },
    function(req,email,password,done){
        User.findOne({email:email},(err,user)=>{
            if(err){
                return done(err);
            }
            bcrypt.compare(password,user.password, function(err, result) {
                if(result){
                    return done(null,user);
                }
                else{
                    req.flash('error','Invalid Username/Password');    
                    return done(null,false);
                }
            });
        });
    }
));
//if user id authenticated then done user.id
passport.serializeUser((user,done)=>{
    return done(null,user.id);
 });
 //using id from above middleware and finding user and passing that user forward
 passport.deserializeUser((id,done)=>{
     User.findById(id,(err,user)=>{
         if(err){
             console.log(err);
             return done(err);
         }
         return done(null,user);
     })
 });
 //check if the req is authenticated then move on to next mw else redirect to signin
 passport.checkAuthentication=function(req,res,next){
     if(req.isAuthenticated()){
         return next();
     }
     return res.redirect('/signin');
 };
 //if above mw passes that user is authenticated set up that user in locals so that it can be accessed by views
 passport.setAuthenticatedUser=function(req,res,next){
     if(req.isAuthenticated()){
         res.locals.user=req.user;
     }
     next();
 }
 module.exports= passport;

