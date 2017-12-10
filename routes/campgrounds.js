var express = require("express");
var router  = express.Router();
var Campground=require("../models/campground");
var middleware=require("../middleware");
var geocoder = require('geocoder');
//--------------
//CaAMPGROUND
//------------------


router.get("/campground",function(req,res){
   //Get from db
   Campground.find({},function(err,allcamps)
   {
       if(err)
       {
           console.log(err);
       }
       else
       {
            res.render("campgrounds/campground",{campground:allcamps});
       }
   });
   
});
router.get("/campground/new",middleware.isLoggedIn,function(req,res){
   res.render("campgrounds/new"); 
});
router.post("/campground",middleware.isLoggedIn,function(req,res){
    //accept a campground and add to array
    var name=req.body.name1;
    var img=req.body.image;
    var info=req.body.info;
    var price=req.body.price;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
     var location = data.results[0].formatted_address;
    var newcamp={ name:name, image: img,info:info,author:author,price:price, location: location, lat: lat, lng: lng};
    //create new item in db
     Campground.create( newcamp ,function(err,camp){
        if(err)
        {
            console.log(err);
        }
        else
        {
              req.flash("success","Place added!");
             res.redirect("/campground");
        }
    });
    });
    //redirect to list
    
});
//shows more information about a campground
router.get("/campground/:id",function(req,res){
    var id=req.params.id;
    Campground.findById(id).populate("comments").exec(function(err,campfound){
       if(err)
       {
           console.log(err);
       }
       else
       {
            res.render("campgrounds/show",{campground:campfound}); 
       }
    });
  
});
//EDIT A CAMPGROUND
router.get("/campground/:id/edit", middleware.isAuthorisedUser,function(req,res){
    Campground.findById(req.params.id,function(err,found){
       if(err)
       {
           res.redirect("/campgrounds");
       }else
       {
          
            res.render("campgrounds/edit",{campground:found}) ;
       }
    });
});
//UPDATE
router.put("/campground/:id", middleware.isAuthorisedUser,function(req,res){
     geocoder.geocode(req.body.campground.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.campground.name, image: req.body.campground.image, info: req.body.campground.info, price: req.body.campground.price, location: location, lat: lat, lng: lng};
   Campground.findByIdAndUpdate(req.params.id,{$set: newData},function(err,updated){
       if(err)
       {
             res.redirect("/campgrounds");   
       }
       else
       {
            req.flash("success","Edit successful!");
           res.redirect("/campground/"+req.params.id);
       }
   });
     });
});
//DELETE
router.delete("/campground/:id", middleware.isAuthorisedUser,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err)
       {
           res.redirect("/campground");
       }else
       {
            req.flash("success","Delete succesful!");
           res.redirect("/campground");
       }
   });
});
module.exports = router;