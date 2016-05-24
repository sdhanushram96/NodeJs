var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now
	},
	bill_no: {
		type: String,
		required: true
	},
	cust_name: {
		type: String
	},
	cust_place: {
		type: String
	},
	cust_contact: {
		type: Number
	},
	sales_articles: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	}],
	resell_articles: [
		String //TODO added mood saaman
	],
	gold_rate: {
		type: Number,
		required: true
	},
	silver_rate: {
		type: Number,
		required: true
	},
	additional_charges: {
		type: Number,
		required: true
	},
	sub_total: {
		type: Number,
		required: true
	},
	tax: {
		type: Number
	}
	total: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Bill', BillSchema);