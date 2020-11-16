//Setting up express and expressrouter to redirect incoming request
const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController'); //defining controllers that are used 
const resetController=require('../controllers/resetController');
router.get('/',userController.home);
//redirecting routes request with url containing the below path to respective routes file
router.use('/signin',require('./signin'));
router.use('/signup',require('./signup'));
router.use('/resetPassword',require('./reset'));
router.use('/forgotPassword',require('./forgot'));
//executing request by calling onto controllers and firing up the desired function with specific method type
router.post('/sendLink',resetController.sendLink);
router.get('/signout',userController.signout);
module.exports=router;
