var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
	date: {
		type: Date,
		default: Date.now
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
	sold_articles: [
		mongoose.Schema.Types.ObjectId
	],
	resell_articles: [
		String //TODO added mood saaman
	],
	total: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Bill', BillSchema);