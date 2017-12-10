var express = require("express");
var router  = express.Router();
var Campground=require("../models/campground");
var User=require("../models/user.js");
var passport=require("passport");
router.get("/",function(req,res){
    res.render("landing");
});
//-------------
//AUTH ROUTES
//-----------
//  REGISTER
router.get("/register",function(req,res){
    res.render("register");
});
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Fursat - Weekends in Delhi "+ req.body.username);
           res.redirect("/campground"); 
        });
    });
});

//LOGIN 
router.get("/login",function(req,res){
    res.render("login");
});
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campground",
        failureRedirect: "/login"
    }), function(req, res){
});
//LOGOUT
router.get("/logout",function(req,res){
   req.logout(); 
   req.flash("success","Logged You Out!!");
   res.redirect("/campground");
});

module.exports = router;