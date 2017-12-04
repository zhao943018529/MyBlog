const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	username: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	}
});

module.exports=mongoose.model('User',UserSchema);