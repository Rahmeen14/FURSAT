var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campground.js");
var Comment=require("./models/comments.js");
var User=require("./models/user.js");
var seedDB = require("./seeds");
var passport=require("passport");
var methodOverride= require("method-override");
var LocalStrategy=require("passport-local");
var campgroundRoute=require("./routes/campgrounds.js");
var commentRoute=require("./routes/comments.js");
var indexRoute=require("./routes/index.js");
var flash=require("connect-flash");
seedDB();
mongoose.connect("mongodb://fursat:password@ds133776.mlab.com:33776/fursat");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "First project",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.errmessage= req.flash("error");
   res.locals.sucmessage= req.flash("success");
   next();
});

app.use( campgroundRoute);
app.use( commentRoute);
app.use(indexRoute);


//var campgrounds= [{name: "SIRNAS", image: "http://www.myharriman.com/wp-content/uploads/2013/07/camping_at_night.jpg"}, {name: "Dark Fortress", image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"}, {name: "Purple hue", image: "http://g.fastcompany.net/multisite_files/fastcompany/imagecache/1280/poster/2015/02/3042691-poster-1280-tentsile.jpg"}];

// app.get("/", function(req, res){
//     res.render("landing");

// });

// app.get("/campgrounds", function(req, res){

//     var campgrounds= Campground.find({}, function(err, campgrounds)
//         {
//             if(err)
//                 console.log(err);
//             else{
//                 res.render("campgrounds", {campgrounds: campgrounds});
//             }
//         });


// });

// app.get("/campgrounds/new", function(req, res){
//       res.render("new");

// });

// app.get("/campgrounds/:id", function(req, res){
//         var campground=  Campground.findById(req.params.id, function(err, campground){
//             if(!err)
//                  res.render("show", {campground: campground});


//         });

// });

// app.post("/campgrounds", function(req, res){
//     var body= req.body;
//     var newGround = {name: body.name, image: body.image, description: body.description};
//      Campground.create(newGround, function(err, newGround){
//         if(err)
//             console.log(err);
//         else
//             res.redirect("/campgrounds");
//     });
//     //campgrounds.push(newGround);


// });

app.listen(3000, function(){
    console.log("YelpCamp server reporting ! ~(^_^)~");

});