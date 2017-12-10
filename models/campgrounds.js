var mongoose = require('mongoose');
var campSch= new mongoose.Schema({
	name: String, 
	image: String, 
	description: String});
module.exports =  mongoose.model("camp", campSch);

