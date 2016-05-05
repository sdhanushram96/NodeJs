var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/Article.js');

/* GET /articles listing. */
router.get('/', function(req, res, next) {
	Article
		.find()
		.where('drawer').equals("Stock")
		.exec(function(err, articles) {
			if (err) return next(err);
			res.json(articles);
		});
});

/* GET /articles/id */
router.get('/:id', function(req, res, next) {
	Article
		.find()
	//.where('drawer').equals("Stock")
	.where('_id').equals(req.params.id)
		.exec(function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

/* POST /articles */
router.post('/', function(req, res, next) {
	req.body.drawer = "Stock";
	Article.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /articles/:id */
router.put('/:id', function(req, res, next) {
	var opts = {
		runValidators: true
	};
	Article.update({
			_id: req.params.id,
			drawer: "Stock"
		},
		req.body,
		opts, function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
	Article.findByIdAndRemove(req.params.id, req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;