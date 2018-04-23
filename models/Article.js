const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: String,
	user:{type:Schema.Types.ObjectId,ref:'User'},
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

articleSchema.virtual('id').get(function(){
	return this._id;
});

articleSchema.set('toJSON',{getters:true,virtuals:true});
articleSchema.set('toObject',{getters:true,virtuals:true});
articleSchema.path('createTime').get(function(v){
	return new Date(v).toString();
});

articleSchema.path('lastEditTime').get(function(v){
	return new Date(v).toString();
});

module.exports=mongoose.model('Article',articleSchema);