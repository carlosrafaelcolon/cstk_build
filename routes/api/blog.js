'use strict';

const express = require("express");

const router = express.Router();

const Blog = require("../../models/blog").Blog;

// We are going to implement a JWT middleware that will ensure the validity of our token. We'll require each protected route to have a valid token sent in the Authorization header

router.param("_id", function(req, res, next, _id){
	Blog.findById(_id, function(err, doc){
		if(err) return next(err);
		if(!doc){
			err = new Error("Not Found");
			err.status = 404;
			return next(err);
		}
		req.blog = doc;
		return next();

	});
});



// GET /publications
// Route for publication collection

router.get("/", function(req, res, next){
	Blog.find({})
				.sort({ date: -1 })
				.exec(function(err, blogs){
					if(err) return next(err);
					res.json(blogs);
				});
});

// GET /publications/:lid
// Route for specific publications
router.get("/:_id", function(req, res, next){
	res.json(req.blog);
});



// POST /publications
// Route for creatig publications
router.post("/create",  function(req, res, next){
	var blog = new Blog(req.body);
	blog.save(function(err, blog){
		if(err) return next(err);
		res.status(201);
		res.json(blog);
	});
});


// PUT /publications/:lid
// Edit a specific publication
router.put("/edit/:_id",  function(req, res){
	req.blog.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});

router.patch("/edit/:_id", function(req, res){
	req.blog.update(req.body, function(err, result){
		if(err) return next(err);
		res.json(result);
	});
});


// DELETE /publications/:lid
// Delete a specific publication
router.delete("/delete/:_id",  function(req, res){
	req.blog.remove(function(err){
		req.blog.save(function(err, blog){
			if(err) return next(err);
			res.json(blog);
		});
	});
});


module.exports = router;