const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: String,
	visits: {
		type: Number,
		default: 0
	},
	tags: [{
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}],
	createTime: {
		type: Date
	},
	lastEditTime: {
		type: Date,
		default: Date.now
	},
	content: String,
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
});

articleSchema.set('toJSON',{getters:true,virtual:true});
articleSchema.set('toObject',{getters:true,virtuals:true});
articleSchema.path('createTime').get(function(v){
	return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});

articleSchema.path('lastEditTime').get(function(v){
	return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});

module.exports=mongoose.model('Article',articleSchema);