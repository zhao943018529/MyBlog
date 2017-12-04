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
		default: '',
		unique: true,
		validate: {
			validator: function(v) {
				return /\w{8,16}/.test(v);
			},
			message: '{VALUE} is not a valid username'
		},
		required: true
	},
	password: {
		type: String,
		default: '',
		validate: {
			validator: function(v) {
				return /[A-Z]\w{7,15}/.test(v);
			},
			message: '{VALUE} is not a valid password'
		},
		required: true
	}
});

UserSchema.virtual('id').get(function() {
	return this._id;
});

module.exports=mongoose.model('User',UserSchema);