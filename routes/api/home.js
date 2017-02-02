'use strict';

var express = require("express");

var router = express.Router();

var Strike = require("../../models/strike").Strike;


router.param("strikeId", function(req, res, next, strikeId){
	Strike.findById(strikeId, function(err, doc){
		if(err) return next(err);
		if(!doc){
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.strike = doc;
		return next();

	});
});



// GET /peoples
// Route for people collection

router.get("/recent-operations", function(req, res, next){
	Strike.find({})
				.sort({ date: -1 })
                .limit(4)
				.exec(function(err, strikes){
					if(err) return next(err);
					res.json(strikes);
				});
});


// GET /leaders/:lid
// Route for specific leaders
router.get("/:strikeId", function(req, res, next){
	res.json(req.strike);
});



module.exports = router;