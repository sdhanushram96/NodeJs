var express = require('express');
var router = express.Router();
var backup = require('mongodb-backup');

router.get('/', function(req, res, next) {
	res.writeHead(200, {
		'Content-Type': 'application/x-tar'
	});
	back(res, null);
});

router.get('/:collection', function(req, res, next) {
	res.writeHead(200, {
		'Content-Type': 'application/x-tar'
	});
	back(res, req.params.collection);
});

function back(res, col) {
	var cols = [];
	if (col) {
		cols.push(col);
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