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
	AbridgedName = require("../models/strike").AbridgedName,
	AbridgedSingleStrike = require("../models/strike").AbridgedSingleStrike,
    EmptyStrike = require("../models/strike").EmptyStrike,
	NameListQueryBuilder = require("../models/queries/nameList");
	

router.route("/")
	.post(jsonParser, function(req, res) {
		console.log(req.body);
		if (req.body && req.body.strikeId && Number(req.body.strikeId) > 0) {
			Strike.findOne({strikeId: req.body.strikeId}, AbridgedSingleStrike, function(err, strike) {
				return res.send(strike);
			});
		} else {
			var options = req.body;
			var nameListQuery = NameListQueryBuilder(options);
			
			Strike.find(nameListQuery, AbridgedName, function(err, strikes) {
				return res.send(strikes);
			}).sort({date: -1});	
		}
	});


module.exports = router;