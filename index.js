//Setting Up Express , Path , Database and additional dependencies
const express=require('express');
const port=8000;
const app=express();
const path=require('path');
const db=require('./config/mongoose');
const user=require('./models/userModel');
const layout=require('express-ejs-layouts'); //using ejs tempelates
const passport=require('passport'); //passport authentication
const passportLocal=require('./config/passportLocalStrategy'); //local startegy
const passportGoogle=require('./config/passportGoogle-oauth'); //google oauth strategy
const session=require('express-session'); //for maintaing expressvsession 
const sassMiddleware=require('node-sass-middleware'); //sass extension
const MongoStore=require('connect-mongo')(session); //for storing session cookies
const flash=require('connect-flash'); //flash messages
const customMiddleware=require('./config/middleware'); //CustomMW
//using sass setting up its source and destination while rendering css to views
app.use(sassMiddleware({
    src:'./assets',
    dest:'./assets',
    debug:false,
    outputStyle:'extended',
    prefix:'/',
}));
//to read post messasges from request , setting up path for static files nd using layout structure in ejs
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'assets')));
app.use(layout);
//setting up out cookies using express session and storing it in mongoStore
app.use(session({
    name:'authenticateSystem',
    secret:'somerandomkeytohashsession',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*1000),
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        (err)=>{
            console.log(err || 'Connected To MongoStore');
        }
    )
}));
//authenticating user using passport and encrypting session cookies
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);//storing current logged in user information in locals
app.use(flash());
app.use(customMiddleware.setFlash);
//defining routes , view engine , extacting script and css from layouts and firing up the server
app.use('/',require('./routes')); //any req coming is redirected ti index of routes structure
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.listen(port,(err)=>{
    if(err){
        console.error.bind(console,"Error");
        return;
    }
    console.log(`Server up at port ${port}`);
})