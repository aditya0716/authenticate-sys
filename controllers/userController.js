const User=require('../models/userModel');//import db
const bcrypt=require('bcrypt'); //bycrypt library to generate hash for the password
//home contyroller to render home page
module.exports.home=function(req,res){
    return res.render('home',{
        title:'Authenticate | Home',
    })
};
//to render signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_signin',{
        title:'Authenticate | User-SignIn',
    });
};
//to render sign up page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_signup',{
        title:'Authenticate | User-SignUp',
    });
};
//creating a new user and storing information it in database and redirectinhg to signin 
module.exports.create=function(req,res){
    if(req.body.password!==req.body.reenterPassword){
        req.flash('error','Password Does not Match');
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.error.bind(console,"Error");
            return;
        }
        if(!user){
            //bycrypt used to generate hash of the password sent by user and we store hash to be more secure
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password=hash;
            User.create(req.body,(err,newUser)=>{
                req.flash('success','Signed Up Successfully');
                return res.redirect('/signin');
            });
        }
        else{
            req.flash('error','Email Already Associated With Other Account');
            return res.redirect('back');
        }
    });
};
//if user is authorized by passport the redirect it to home page
module.exports.createSession=function(req,res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/');
};
//to render reset password page for the user
module.exports.reset=function(req,res){
    if(!req.isAuthenticated()){
        return res.redirect('/signin');
    }
    return res.render('reset',{
        title:'Authenticate | Reset'
    })
};
//to reset the password using old new and reenter new passport method
module.exports.resetPassword=function(req,res){
    bcrypt.compare(req.body.oldpassword,req.user.password,function(err, result) {
        if(!result){
            req.flash('error','Password Does not Match');
            return res.redirect('back');
        }
        if(req.body.newpassword !== req.body.renewpassword){
            req.flash('error','Password Does not Match');
            return res.redirect('back');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.newpassword, salt);
        User.findOne({ email: req.user.email }, function (err, user){
            user.password=hash;
            user.save();
            req.logOut();
            req.flash('success','Password Changed Successfully');
            return res.redirect('/signin');
        });
    });
};
//to sign out a paricular user
module.exports.signout=function(req,res){
    req.logOut();
    req.flash('success','Logged Out Successfully');
    res.redirect('/signin');
 
};
