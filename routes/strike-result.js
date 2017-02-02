'use strict';

// var express = require("express");

// var router = express.Router();

// var Strike = require("../../models/strike").Strike;

//var StrikeSearch = require("../../models/strikeSearchOptions").StrikeSearch;

var express = require('express'),
	router = express.Router(),
    bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	Strike = require("../models/strike").Strike,
	AbridgedStrike = require("../models/strike").AbridgedStrike,
	AbridgedSingleStrike = require("../models/strike").AbridgedSingleStrike,
    EmptyStrike = require("../models/strike").EmptyStrike,
	StrikeListQueryBuilder = require("../models/queries/strikeList");
	

router.route("/")
	.post(jsonParser, function(req, res) {
		console.log(req.body);
		if (req.body && req.body.strikeId && Number(req.body.strikeId) > 0) {
			Strike.findOne({strikeId: req.body.strikeId}, AbridgedSingleStrike, function(err, strike) {
				return res.send(strike);
			});
		} else {
			var options = req.body;
			var strikeListQuery = StrikeListQueryBuilder(options);
			
			Strike.find(strikeListQuery, AbridgedStrike, function(err, strikes) {
				return res.send(strikes);
			}).sort({date: -1});	
		}
	});


module.exports = router;