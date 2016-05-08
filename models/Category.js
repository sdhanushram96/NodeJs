var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	metal: {
		type: String,
		enum: ['Gold', 'Silver'],
		required: [true, 'Which metal ?']
	},
	image: {
		data: Buffer,
		contentType: String
	}
});


module.exports = mongoose.model('Category', CategorySchema);