//Setting up express and expressrouter to redirect incoming request
const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const resetController=require('../controllers/resetController');
//executing request by calling onto controllers and firing up the desired function with specific method
router.get('/',userController.reset);
router.post('/reset',userController.resetPassword);
router.post('/verifykey',resetController.resetAccount);
module.exports=router;
