var Campground=require("../models/campground.js");
var Comment=require("../models/comments.js");
var middlewareobj={};
middlewareobj.isLoggedIn= function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that! Please Login");
    res.redirect("/login");
};
middlewareobj.checkCommentOwn =function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,found){
       if(err)
       {
            req.flash("error","Desired place not found!!");
           res.redirect("/campgrounds");
       }else
       {
            if(found.author.id.equals(req.user._id))
            {
                  return next();
            }else
            {
                 req.flash("error","That's completely unallowed!");
                res.redirect("back");
            }
       }
    });
        
    }else
    {
         req.flash("error","That's completely unallowed!");
         res.redirect("back");
    }
};
middlewareobj.isAuthorisedUser = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,found){
       if(err)
       {
           req.flash("error","Desired place not found!!");
           res.redirect("/campgrounds");
       }else
       {
            if(found.author.id.equals(req.user._id))
            {
                  return next();
            }else
            {
                 req.flash("error","That's completely unallowed!");
                res.redirect("back");
            }
       }
    });
        
    }else
    {
         req.flash("error","That's completely unallowed!");
         res.redirect("back");
    }
};



module.exports= middlewareobj;