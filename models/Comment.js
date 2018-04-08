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
      	ref: 'comment'
	},
	createTime:{
		type:Date
	}
	author:String
});


commentSchema.path('createTime').get(function(v){
	return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});

module.exports = mongoose.modal('Comment',commentSchema);