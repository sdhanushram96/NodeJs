var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/Article.js');

/* GET /articles listing. */
router.get('/', function(req, res, next) {
	Article.find(function(err, articles) {
		if (err) return next(err);
		res.json(articles);
	});
});

/* GET /articles/id */
router.get('/:id', function(req, res, next) {
	Article.findById(req.params.id, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* POST /articles */
router.post('/', function(req, res, next) {
	Article.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /articles/:id */
router.put('/:id', function(req, res, next) {
	Article.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
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