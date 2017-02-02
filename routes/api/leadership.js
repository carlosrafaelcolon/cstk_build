'use strict';

var express = require("express");

var router = express.Router();

var Leader = require("../../models/leadership").Leader;

router.param("lid", function(req, res, next, id){
	Leader.findById(id, function(err, doc){
		if(err) return next(err);
		if(!doc){
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.leader = doc;
		return next();

	});
});



// GET /leaders
// Route for leader collection

router.get("/", function(req, res, next){
	Leader.find({})
				.sort({lastDecap: -1})
				.exec(function(err, leaders){
					if(err) return next(err);
					res.json(leaders);
				});
});

// GET /leaders/:lid
// Route for specific leaders
router.get("/:lid", function(req, res, next){
	res.json(req.leader);
});



// POST /leaders
// Route for creatig leaders
router.post("/create", function(req, res, next){
	var leader = new Leader(req.body);
	leader.save(function(err, leader){
		if(err) return next(err);
		res.status(201);
		res.json(leader);
	});
});


// PUT /leaders/:lid
// Edit a specific leader
router.put("/edit/:lid", function(req, res){
	req.leader.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});



// DELETE /leaders/:lid
// Delete a specific leader
router.delete("/delete/:lid", function(req, res){
	req.leader.remove(function(err){
		req.leader.save(function(err, leader){
			if(err) return next(err);
			res.json(leader);
		});
	});
});




module.exports = router;