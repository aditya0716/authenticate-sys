//Setting up express and expressrouter to redirect incoming request
const express=require('express');
const router=express.Router();
const passport=require('passport');
const resetController=require('../controllers/resetController');
//executing request by calling onto controllers and firing up the desired function
router.get('/',resetController.resetPage);
module.exports=router;