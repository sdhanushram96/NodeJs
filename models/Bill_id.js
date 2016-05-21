var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
	uid: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Bill_id', BillSchema);