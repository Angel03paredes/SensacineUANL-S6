const helpers ={};

helpers.isAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated()){
        console.log("hay una cuenta abierta");
        return next();
    }
    res.redirect('/modalsession');
}

helpers.isadmin = (req,res,next) =>{
    if(req.user.admin){
        return next();
    }
    res.render('404page');
}

module.exports = helpers;