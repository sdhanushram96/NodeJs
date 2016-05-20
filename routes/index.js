var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Jewellery'
	});
});

router.get('/add', function(req, res, next) {
	res.render('add', {
		title: 'Add'
	});
});

router.get('/stock', function(req, res, next) {
	res.render('stock', {
		title: 'stock'
	});
});

router.get('/cart', function(req, res, next) {
	res.render('cart', {
		title: 'cart'
	});
});

router.post('/make_bill', function(req, res, next) {
	res.render('make_bill', {
		title: 'make_bill',
		post_data: req.body
	});
	console.log(req.body);
});



module.exports = router;