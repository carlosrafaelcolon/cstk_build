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

router.get("/", function(req, res, next){
	Strike.find({})
				.sort({ date: -1 })
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



// POST /leaders
// Route for creatig leaders
router.post("/create", function(req, res, next){
	var strike = new Strike(req.body);
	strike.save(function(err, strike){
		if(err) return next(err);
		res.status(201);
		res.json(strike);
	});
});


// PUT /leaders/:lid
// Edit a specific leader
router.put("/edit/:strikeId", function(req, res){
	req.strike.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});

router.patch("/edit/:strikeId", function(req, res){
	req.strike.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});


// DELETE /leaders/:lid
// Delete a specific leader
router.delete("/delete/:strikeId", function(req, res){
	req.strike.remove(function(err){
		req.strike.save(function(err, strike){
			if(err) return next(err);
			res.json(strike);
		});
	});
});


module.exports = router;