var mongoose=require("mongoose");

var campgroundSchema= new mongoose.Schema({
   name:String,
   image:String,
   info: String,
   price: String,
   location: String,
   createdAt: { type: Date, default: Date.now },
   lat: Number,
   lng: Number,
    author: {
      id:{ 
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username: String
   },
   comments:
   [
       {
           type: mongoose.Schema.Types.ObjectId,
           ref:"Comment"
       }
    ]
    
});
 var Campground = mongoose.model("Campground", campgroundSchema);
module.exports= Campground;