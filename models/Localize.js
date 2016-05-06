var mongoose = require('mongoose');

var LocalizeSchema = new mongoose.Schema({
	eng: {
		type: String,
		required: true
	},
	mar: {
		type: String,
		required: false
	}
});
module.exports = mongoose.model('Localize', LocalizeSchema);