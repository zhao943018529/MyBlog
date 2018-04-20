const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
	article:{
		type:Schema.Types.ObjectId,
		ref:'Article'
	},
	message:String,
	respondTo:{
	  	type: Schema.Types.ObjectId,
      	ref: 'User'
	},
	createTime:{
		type:Date,
		default: Date.now,
	},
	author:{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
});


commentSchema.path('createTime').get(function(v){
	return new Date(v).toString();
});

module.exports = mongoose.model('Comment',commentSchema);