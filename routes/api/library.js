'use strict';

var express = require("express");

var router = express.Router();

var Publication = require("../../models/library").Publication;

router.param("pubId", function(req, res, next, pubId){
	Publication.findById(pubId, function(err, doc){
		if(err) return next(err);
		if(!doc){
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.publication = doc;
		return next();

	});
});



// GET /publications
// Route for publication collection

router.get("/", function(req, res, next){
	Publication.find({})
			
				.exec(function(err, publications){
					if(err) return next(err);
					res.json(publications);
				});
});

// GET /publications/:lid
// Route for specific publications
router.get("/:pubId", function(req, res, next){
	res.json(req.publication);
});



// POST /publications
// Route for creatig publications
router.post("/create", function(req, res, next){
	var publication = new Publication(req.body);
	publication.save(function(err, publication){
		if(err) return next(err);
		res.status(201);
		res.json(publication);
	});
});


// PUT /publications/:lid
// Edit a specific publication
router.put("/edit/:pubId", function(req, res){
	req.publication.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});

router.patch("/edit/:pubId", function(req, res){
	req.publication.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});


// DELETE /publications/:lid
// Delete a specific publication
router.delete("/delete/:pubId", function(req, res){
	req.publication.remove(function(err){
		req.publication.save(function(err, publication){
			if(err) return next(err);
			res.json(publication);
		});
	});
});


module.exports = router;