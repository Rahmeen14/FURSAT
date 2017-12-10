var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var camp = require("./models/campgrounds.js");
mongoose.connect("mongodb://fursat:password@ds133776.mlab.com:33776/fursat");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//var campgrounds= [{name: "SIRNAS", image: "http://www.myharriman.com/wp-content/uploads/2013/07/camping_at_night.jpg"}, {name: "Dark Fortress", image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"}, {name: "Purple hue", image: "http://g.fastcompany.net/multisite_files/fastcompany/imagecache/1280/poster/2015/02/3042691-poster-1280-tentsile.jpg"}];

app.get("/", function(req, res){
    res.render("landing");

});

app.get("/campgrounds", function(req, res){

    var campgrounds= camp.find({}, function(err, campgrounds)
        {
            if(err)
                console.log(err);
            else{
                res.render("campgrounds", {campgrounds: campgrounds});
            }
        });


});

app.get("/campgrounds/new", function(req, res){
      res.render("new");

});

app.get("/campgrounds/:id", function(req, res){
        var campground= camp.findById(req.params.id, function(err, campground){
            if(!err)
                 res.render("show", {campground: campground});


        });

});

app.post("/campgrounds", function(req, res){
    var body= req.body;
    var newGround = {name: body.name, image: body.image, description: body.description};
    camp.create(newGround, function(err, newGround){
        if(err)
            console.log(err);
        else
            res.redirect("/campgrounds");
    });
    //campgrounds.push(newGround);


});

app.listen(3000, function(){
    console.log("YelpCamp server reporting ! ~(^_^)~");

});