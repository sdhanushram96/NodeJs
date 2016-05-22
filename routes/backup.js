var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	/*res.writeHead(200, {
		'Content-Type': 'application/x-tar' // force header for tar download
	});
*/
	res.send("Hello World! " + global.db);

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
	/*
	backup({
		uri: 'uri', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
		collections: cols, // save this collection only
		stream: res, // send stream into client response
	});*/
}
module.exports = router;