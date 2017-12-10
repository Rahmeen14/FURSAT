var express = require("express");
var router  = express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comments.js");
var middleware=require("../middleware");
//---------------------
//COMMENT ROUTES
//-----------------------
router.get("/campground/:id/comments/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,found){
        if(err)
        {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            res.render("comments/new",{campground:found}); 
        }
    });
   
});
//adding new comment
router.post("/campground/:id/comments",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,found){
        if(err)
        {
             console.log(err);
           res.redirect("/campgrounds");
        }else
        {
              Comment.create(req.body.comment,function(err,comment){
                 if(err)
               {
                   console.log(err);
                   res.redirect("/campgrounds");
               }else
               {
                   comment.author.id=req.user._id;
                   comment.author.username=req.user.username;
                   comment.save();
                   found.comments.push(comment);
                   found.save();
                    req.flash("success","Comment created succesfully!!");
                   res.redirect("/campground/"+req.params.id);
               }
    });
        }
    });
 
});
//EDIT A COMMENT
router.get("/campground/:id/comments/:comment_id/edit",middleware.checkCommentOwn,function(req,res){
    Comment.findById(req.params.comment_id,function(err,found){
       if(err)
       {
           res.redirect("/campgrounds");
       }else
       {
            res.render("comments/edit",{campgroundid:req.params.id, comment:found}) ;
       }
    });
});
//UPDATE
router.put("/campground/:id/comments/:comment_id", middleware.checkCommentOwn,function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updated){
       if(err)
       {
             res.redirect("/campgrounds");   
       }
       else
       {
           req.flash("success","Comment edited succesfully!!");
           res.redirect("/campground/"+req.params.id);
       }
   });
});
//DELETE
router.delete("/campground/:id/comments/:comment_id", middleware.checkCommentOwn,function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err)
       {
           res.redirect("/campground/:id");
       }else
       {
           req.flash("success","Comment deleted succesfully!!");
           res.redirect("/campground/"+req.params.id);
       }
   });
});


module.exports = router;