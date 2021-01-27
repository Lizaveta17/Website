var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema(
{
	name: {type: String, required: true},
	lastname: {type: String, required: true},
	tel: {type: String, required: true},
	date: {type: Date, required: true},
	table: {type: Number, required: true}
});

module.exports = mongoose.model('Order', ordersSchema);