'use strict';

var express = require('express'),
	router = express.Router(),
    bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	Strike = require("../models/strike").Strike,
	IdListQueryBuilder = require("../models/queries/searchById");
	

router.route("/")
	.post(jsonParser, function(req, res) {
		console.log(req.body);
		if (req.body && req.body.strikeId && Number(req.body.strikeId) > 0) {
			Strike.findOne({strikeId: req.body.strikeId},  function(err, strike) {
				return res.send(strike);
			});
		} else {
			var options = req.body;
			var idListQuery = IdListQueryBuilder(options);
			
			Strike.find(idListQuery,  function(err, strikes) {
				return res.send(strikes);
			}).sort({date: -1});	
		}
	});


module.exports = router;