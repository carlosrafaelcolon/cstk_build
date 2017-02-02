'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/cstk");

var db = mongoose.connection;

db.on("error", function(err){
	console.error("connection error:", err);
});

db.once("open", function(){
	console.log("db connection to CSTK successful!");
});

