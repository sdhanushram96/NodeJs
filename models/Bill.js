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
		ArticleSchema
	],
	image: {
		data: Buffer,
		contentType: String
	},
	metal: {
		type: String,
		enum: ['Gold', 'Silver'],
		required: [true, 'Which metal ?']
	},
	wages: {
		type: Number,
		default: 0
	},
	drawer: {
		type: String,
		required: true,
		default: "Stock",
		enum: ["Stock", "Sales"]
	},
	netWeight: {
		type: Number,
		required: true
	},
	grossWeight: {
		type: Number,
		required: true
	},
	carat: {
		type: Number,
		required: true
	},

});

module.exports = mongoose.model('Article', ArticleSchema);