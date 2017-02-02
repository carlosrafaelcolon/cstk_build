'use strict';

var express = require("express");

var router = express.Router();

var People = require("../../models/people").People;

router.param("_id", function(req, res, next, _id){
	People.findById(_id, function(err, doc){
		if(err) return next(err);
		if(!doc){
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.people = doc;
		return next();

	});
});



// GET /peoples
// Route for people collection

router.get("/", function(req, res, next){
	People.find({})
			
				.exec(function(err, peoples){
					if(err) return next(err);
					res.json(peoples);
				});
});

// GET /leaders/:lid
// Route for specific leaders
router.get("/:_id", function(req, res, next){
	res.json(req.people);
});



// POST /leaders
// Route for creatig leaders
router.post("/create", function(req, res, next){
	var people = new People(req.body);
	people.save(function(err, people){
		if(err) return next(err);
		res.status(201);
		res.json(people);
	});
});


// PUT /leaders/:lid
// Edit a specific leader
router.put("/edit/:_id", function(req, res){
	req.people.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});

router.patch("/edit/:_id", function(req, res){
	req.people.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});


// DELETE /leaders/:lid
// Delete a specific leader
router.delete("/delete/:_id", function(req, res){
	req.people.remove(function(err){
		req.people.save(function(err, people){
			if(err) return next(err);
			res.json(people);
		});
	});
});


module.exports = router;