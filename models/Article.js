var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
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
	completed: Boolean,
	note: String,
	added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Article', ArticleSchema);