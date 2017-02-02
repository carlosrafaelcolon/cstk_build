'use strict';

var express = require("express");

var router = express.Router();

var Strike = require("../../models/strike").Strike;


// GET /peoples
// Route for people collection

router.get("/pakistan", function(req, res, next){
    console.log("data retrieved");
	Strike.find({
        "countries.attackers.country": "United States",
        "countries.targets.country": "Pakistan"
    })
    .sort({ date: -1 })
    .exec(function(err, strikes){
        if(err) return next(err);
        res.json(strikes);
    });
});

router.get("/yemen", function(req, res, next){
    console.log("data retrieved");
	Strike.find({
        "countries.attackers.country": "United States",
        "countries.targets.country": "Yemen"
    })
    .sort({ date: -1 })	
    .exec(function(err, strikes){
        if(err) return next(err);
        res.json(strikes);
    });
});

router.get("/somalia", function(req, res, next){
    console.log("data retrieved");
	Strike.find({
        "countries.attackers.country": "United States",
        "countries.targets.country": "Somalia"
    })	
    .sort({ date: -1 })
    .exec(function(err, strikes){
        if(err) return next(err);
        res.json(strikes);
    });
});

router.get("/israel", function(req, res, next){
    console.log("data retrieved");
	Strike.find({
        "countries.attackers.country": "Israel"
    })	
    .sort({ date: -1 })
    .exec(function(err, strikes){
        if(err) return next(err);
        res.json(strikes);
    });
});







module.exports = router;