var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/Article.js');

router.get('/', function(req, res, next) {
	Article
		.find()
		.where('drawer').equals("Stock")
		.exec(function(err, articles) {
			if (err) return next(err);
			res.json(articles);
		});
});

router.get('/:id', function(req, res, next) {
	Article
		.find()
		.where('drawer').equals("Stock")
		.where('_id').equals(req.params.id)
		.exec(function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

router.post('/', function(req, res, next) {
	req.body.drawer = "Stock";
	console.log(req.body);
	Article.create(req.body, function(err, post) {
		if (err) {
			console.log(err);
			return next(err);
		}
		res.json(post);
	});
});

router.put('/:id', function(req, res, next) {
	var opts = {
		runValidators: true
	};
	Article.update({
			_id: req.params.id,
			drawer: "Stock"
		},
		req.body,
		opts,
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

router.delete('/:id', function(req, res, next) {
	Article.remove({
			_id: req.params.id,
			drawer: "Stock"
		},
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

module.exports = router;