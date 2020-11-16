//we use this if a incoming request has some messages then we will store that in our response 
//that is messages from pevious request to our ongoing res to that incoming req
module.exports.setFlash=function(req,res,next){
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error'),
    }
    next();
};