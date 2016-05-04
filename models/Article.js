var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	name: String,
	completed: Boolean,
	note: String,
	updated_at: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Article', ArticleSchema);