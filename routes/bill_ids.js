var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Bill_id = require('../models/Bill_id.js');
var HashID = require("../models/HashID.js");

router.get('/', function(req, res, next) {
	Bill_id
		.find()
		.exec(function(err, ids) {
			if (err) return next(err);
			res.json(ids);
		});
});

function get(callback) {
	var uid = HashID.generate();
	Bill_id
		.find()
		.where("uid").equals(uid)
		.exec(function(err, ids) {
			if (err) return next(err);
			if (ids.length) {
				return get(callback);
			} else {
				return callback(uid);
			}
		});
}

router.get('/generate', function(req, res, next) {
	get(function(uid) {
		res.send(uid);
	});
});

router.post('/', function(req, res, next) {
	Bill_id.create(req.body, function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});
module.exports = router;