var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Localize = require('../models/Localize.js');

router.get('/', function(req, res, next) {
	Localize
		.find()
		.exec(function(err, localize) {
			if (err) return next(err);
			res.json(localize);
		});
});

router.get('/word/:word/:lang', function(req, res, next) {
	Localize
		.findOne({
			eng: new RegExp('^' + req.params.word + '$', "i")
		})
		.exec(function(err, post) {
			if (err) return next(err);
			if (post != null) {
				if (req.params.lang == "mar") {
					if (post.mar != null) {
						res.send(post.mar);
					} else {
						res.send(post.eng);
					}
				} else {
					res.send(post.eng);
				}
			} else {
				Localize.create({
					eng: req.params.word
				}, function(err, post) {
					if (err) return next(err);
					res.send(post.eng);
				});
			}
		});

});

router.get('/:id', function(req, res, next) {
	Localize
		.findById(req.params.id)
		.exec(function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});
router.get('/:id/:lang', function(req, res, next) {
	Localize
		.findById(req.params.id)
		.exec(function(err, post) {
			if (err) return next(err);
			if (req.params.lang == "mar") {
				res.send(post.mar);
			} else {
				res.send(post.eng);
			}
		});
});

router.post('/', function(req, res, next) {
	Localize.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

router.put('/:id', function(req, res, next) {
	var opts = {
		runValidators: true
	};
	Localize.update({
			_id: req.params.id
		},
		req.body,
		opts,
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

router.put('/mar/:word', function(req, res, next) {
	var opts = {
		runValidators: true
	};
	Localize.update({
			eng: req.params.word
		},
		req.body,
		opts,
		function(err, post) {
			if (err) return next(err);
			if (post.n == 0) {
				req.body.eng = req.params.word;
				Localize.create(req.body, function(err, post2) {
					res.json(post2);
				});
			} else {
				res.json(post);
			}
		});
});


router.delete('/:id', function(req, res, next) {
	Localize.remove({
			_id: req.params.id
		},
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});
module.exports = router;