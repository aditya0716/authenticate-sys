const nodemailer = require("nodemailer");
const User=require('../models/userModel');
const bcrypt=require('bcrypt');
//we use nodemailer to create a transport from which our mail are being sent Please set the user and pass before firing up the server
//nodemailer uses SMTP protocol to send the mail
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: "Your Organization Official E - Mail",
        pass: "Passord for that account",
    },
    tls: {
        rejectUnauthorized: false
    }
});
//render reset page
module.exports.resetPage=function(req,res){
    return res.render('forgotPassword',{
        title:'Authenticate | Forgot Password',
    });
};

module.exports.sendLink=function(req,res){
    //search the user from who has requested for otp is a user with us or not
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            req.flash('error','Please check your email');
            return res.redirect('back');
        }
        else{
            let otp=rand=Math.floor((Math.random() * 100000) + Math.floor((Math.random()*1000))); //generate an random otp
            //define what is to be sent on the mail
            let mailOptions={
                to : req.body.email,
                subject : "Your One Time Password",
                html : `Hello, Your OTP is ${otp}`,
            }
            //save otp in data base
            user.otp=otp;
            user.save();
            //use our transporter to send the mail to user email
            transporter.sendMail(mailOptions,(err,data)=>{
                if(err){
                    return res.redirect('back');
                }
                req.flash('success','OTP Sent');
                return res.render('verifykey',{
                    title:'Authenticate | verify',
                });
            });  
        };
    });   
};
//Match otp entered by user in db and if true then reset passord else redirect
module.exports.resetAccount=function(req,res){
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            req.flash('error','Please check your email');
            return res.redirect('/forgotPassword');
        }
        if(user.otp!=req.body.otp){
            req.flash('error','Incorrect OTP/Request Again');
            return res.redirect('/forgotPassword')
        }
        if(req.body.password !== req.body.reenterPassword){
            req.flash('error','Password Dont Match');
            return res.redirect('/forgotPassword');
        }
        user.otp='###';
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        user.password=hash;
        user.save();
        req.logOut();
        req.flash('success','Password Reset Successfuly');
        return res.redirect('/signin');
    });
};