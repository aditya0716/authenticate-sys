//Setting up express and expressrouter to redirect incoming request
const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
//method for incoming request
router.get('/',userController.signup);
router.post('/create',userController.create);
module.exports=router;