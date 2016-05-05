var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	category: {
		type: mongoose.Schema.Types.ObjectId
	},
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
	weight: {
		type: Number,
		required: true
	},
	completed: Boolean,
	note: String,
	added: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Article', ArticleSchema);