//Setting up express and expressrouter to redirect incoming request
const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controllers/userController');
router.get('/',userController.signin);
//using passport to authenticate and create session cookies for a particular user Local Strategy
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/signin'}
),userController.createSession);
//using passport to authenticate and create session cookies for a particular user Google-OAuth Strategy
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/signin'}
),userController.createSession);
module.exports=router;