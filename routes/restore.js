var express = require('express');
var router = express.Router();
var restore = require('mongodb-restore');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var mongoose = require('mongoose');

router.post('/', function(req, res, next) {
	var form = new multiparty.Form();

	form.parse(req, function(err, fields, files) {
		var file = files.file[0];
		if (file.originalFilename.indexOf('backup') != 0) {
			res.writeHead(400, {
				'content-type': 'text/plain'
			});
			res.end("Invalid File, Please Upload File with filename like \"backup-***.tar\"");
			return;
		}
		var stream = fs.createReadStream(file.path);
		restore({
			uri: global.db,
			stream: stream,
			drop: true,
			callback: function(err) {
				if (err) {
					res.writeHead(400, {
						'content-type': 'text/plain'
					});
					res.end(JSON.stringify(err));
				} else {
					res.writeHead(200, {
						'content-type': 'text/plain'
					});
					res.end("Restored Successfully");
				}
			}
		});
	});
});

router.post('/default', function(req, res, next) {
	var form = new multiparty.Form();

	form.parse(req, function(err, fields, files) {
		var file = files.file[0];
		if (file.originalFilename.indexOf('default') != 0) {
			res.writeHead(400, {
				'content-type': 'text/plain'
			});
			res.end("Invalid File, Please Upload File with filename like \"default-***.tar\"");
			return;
		}
		var stream = fs.createReadStream(file.path);
		restore({
			uri: global.db,
			stream: stream,
			dropCollections: ['localizes', 'categories'],
			callback: function(err) {
				if (err) {
					res.writeHead(400, {
						'content-type': 'text/plain'
					});
					res.end(JSON.stringify(err));
				} else {
					res.writeHead(200, {
						'content-type': 'text/plain'
					});
					res.end("Restored Successfully");
				}
			}
		});
	});
});

router.put('/reset', function(req, res, next) {
	mongoose.connection.collections['articles'].drop(function(err) {
		mongoose.connection.collections['categories'].drop(function(err) {
			mongoose.connection.collections['bill_ids'].drop(function(err) {
				mongoose.connection.collections['bills'].drop(function(err) {
					res.send('Reset Successfully');
				});
			});
		});
	});
});
module.exports = router;