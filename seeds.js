var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment=require("./models/comments.js");
 var data=[{}];
//      { 
//          name:"Select-City-Walk",
//          image:"http://www.walk2mall.com/wp-content/uploads/2017/08/Select-City-Walk_delhi2.jpg?x38619" ,
//         info:"The most beautiful Mall of Delhi!",
//         location: "Saket, New Delhi, India"        
//      }
   
    
    //]
function seedDB(){
//    Campground.remove({},function(err){
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//        console.log("Removed"); 
//     }
// }); 
//     // data.forEach(function(campground){
    //      Campground.create(campground,function(err,camp){
    //         if(err)
    //         {
    //             console.log(err);
    //         }else
    //         {
    //             console.log(camp);
    //             Comment.create(
    //                 {
    //                     text:"I'm not going here again",
    //                     author:"Anjali"
    //                 },function(err,comment){
    //                     if(err)
    //                     {
    //                         console.log(err);
    //                     }else
    //                     {
    //                         camp.comments.push(comment);
    //                         camp.save();
    //                         console.log("New comment created");
    //                     }
    //                 });
    //         }
    //      });
        
    // });
   
}
module.exports= seedDB;
