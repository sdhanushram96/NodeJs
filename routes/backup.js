var express = require('express');
var router = express.Router();
var backup = require('mongodb-backup');

var now = new Date();
var date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "_" + now.getHours() + "-" + now.getMinutes();

router.get('/', function(req, res, next) {
	res.writeHead(200, {
		'Content-Type': 'application/x-tar',
		'Content-disposition': 'attachment; filename=backup-' + date + '.tar'
	});
	back(res, null);
});

router.get('/default', function(req, res, next) {
	res.writeHead(200, {
		'Content-Type': 'application/x-tar',
		'Content-disposition': 'attachment; filename=default-' + date + '.tar'
	});
	back(res, ['localizes', 'categories']);
});

router.get('/factory', function(req, res, next) {
	res.writeHead(200, {
		'Content-Type': 'application/x-tar',
		'Content-disposition': 'attachment; filename=factory.tar'
	});
	back(res, ['localizes']);
});

router.get('/:collection', function(req, res, next) {
	res.writeHead(200, {
		'Content-Type': 'application/x-tar',
		'Content-disposition': 'attachment; filename=' + req.params.collection + '-' + date + '.tar'
	});
	back(res, [req.params.collection]);
});

function back(res, col) {
	var cols = [];
	if (col) {
		cols = col;
	} else {
		cols.push("localizes");
		cols.push("categories");
		cols.push("articles");
		cols.push("bills");
		cols.push("bills_ids");
	}

	backup({
		uri: global.db,
		collections: cols,
		stream: res,
	});
}
module.exports = router;