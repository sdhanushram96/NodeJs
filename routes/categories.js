var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../models/Category.js');

router.get('/', function(req, res, next) {
	Category
		.find()
		.exec(function(err, categories) {
			if (err) return next(err);
			res.json(categories);
		});
});

router.get('/:id', function(req, res, next) {
	Category.findById(req.params.id, function(err, doc) {
		if (err) return next(err);
		/*res.contentType(doc.image.contentType);
		res.send(doc.image.data);*/
		res.json(doc);
	});
});

/*
router.post('/', function(req, res, next) {
/	Category.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
/

/

var fs = require('fs');
var Category = require('./models/Category.js');
var a = new Category;
a.name = "wedding ring";
a.image.data = fs.readFileSync("./a.png");
a.image.contentType = 'image/png';
a.save(function(err, a) {
  if (err) throw err;
  console.error('saved img to mongo');
  console.log(a);
});
/


	Category.create({
		name: image: new Buffer(req.body.image, "base64")
	}, function(err, img) {
		if (err) {
			return handleError(res, err);
		}
		return res.status(201).json(img);
	});
});
*/
router.put('/:id', function(req, res, next) {
	var opts = {
		runValidators: true
	};
	Category.update({
			_id: req.params.id
		},
		req.body,
		opts,
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

router.delete('/:id', function(req, res, next) {
	Category.remove({
			_id: req.params.id
		},
		function(err, post) {
			if (err) return next(err);
			res.json(post);
		});
});

module.exports = router;