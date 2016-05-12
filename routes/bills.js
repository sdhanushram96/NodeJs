var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Bill = require('../models/Bill.js');

router.get('/', function(req, res, next) {
	Bill
		.find()
		.exec(function(err, articles) {
			if (err) return next(err);
			res.json(articles);
		});
});

router.get('/:id', function(req, res, next) {
	Bill
		.find()
		.where('_id').equals(req.params.id)
		.exec(function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

router.post('/', function(req, res, next) {
	Bill.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

router.put('/:id', function(req, res, next) {
	var opts = {
		runValidators: true
	};
	Bill.update({
			_id: req.params.id,
		},
		req.body,
		opts,
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

router.delete('/:id', function(req, res, next) {
	Bill.remove({
			_id: req.params.id,
		},
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

module.exports = router;