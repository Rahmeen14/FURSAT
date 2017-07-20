var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds= [{name: "SIRNAS", image: "http://www.myharriman.com/wp-content/uploads/2013/07/camping_at_night.jpg"}, {name: "Dark Fortress", image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"}, {name: "Purple hue", image: "http://g.fastcompany.net/multisite_files/fastcompany/imagecache/1280/poster/2015/02/3042691-poster-1280-tentsile.jpg"}];

app.get("/", function(req, res){
    res.render("landing");

});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});

});

app.get("/campgrounds/new", function(req, res){
      res.render("new");

});

app.post("/campgrounds", function(req, res){
    var body= req.body;
    var newGround = {name: body.name, image: body.image};
    campgrounds.push(newGround);
    res.redirect("/campgrounds");

});

app.listen(3000, function(){
    console.log("YelpCamp server reporting ! ~(^_^)~");

});