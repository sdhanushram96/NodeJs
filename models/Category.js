var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		data: Buffer,
		contentType: String
	}
});


module.exports = mongoose.model('Category', CategorySchema);