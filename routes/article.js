var express = require('express');
var router = express.Router();
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const defaultSize= 20;

router.get('/getSummary/:page', function(req, res, next) {
	console.log('------article/get');
	let currentPage = req.params.page || 1;
	let size =req.body.pageSize||defaultSize;
	let skipSize = (currentPage-1)*size;
	Article.find().select("id title createTime lastEditTime").skip(skipSize).limit(size).populate("tags").exec(function(err,docs){
		let data={};
		if(err){
			data.status=301;
			data.message = err.message;
		}else{
			data.status=200;
			data.articles=docs;
		}
		res.end(JSON.stringify(data));
	});
});

router.post('/comment/reply',function(req,res,next){
	let data={};
	if(req.user){
		let respondTo = req.params.respondTo;
		let comment = new Comment({
			respondTo:req.body.respondTo,
			message:req.body.message,
			author:req.user.id,
		});

		comment.save(function(err,comment){
			if(err){
				data.status=301;
				data.message=err.message;
			}else{
				data.status=200;
				data.comment=comment;
			}
		});
	}else{
		data.status=401;
		data.message='please sign in';
	}
	res.end(JSON.stringify(data));
});

router.post('/:aid/comment/add',function(req,res,next){
	let data={};
	if(req.user){
		let aid = req.params.aid;
		let comment = new Comment({
			article:aid,
			message:req.body.comment,
			author:req.user.id,
		});
		console.log(aid);
		comment.save(function(err,doc){
			if(err){
				console.log(err);
				data.status=301;
				data.message=err.message;
			}else{
				data.status=200;
				data.message="submit comment successfully";
			}
			res.end(JSON.stringify(data));
		});
	}else{
		data.status=401;
		data.message='please sign in';
		res.end(JSON.stringify(data));
	}
	
});

router.get('/getById/:id', function(req, res, next) {
	console.log('------article/getById');
	let aid = req.params.id;
	let data = {};
	Article.findById(aid).populate("tags").sort({
			createTime: 'desc',
		}).exec((err, article)=>{
			if (err) {
				data.status = 301;
				data.message = err.message;
			} else {
				data.status=200;
				data.article = article;
				Comment.find({
					'article': new ObjectId(aid),
				}).populate({
					path: 'author',
					select: 'id username',
				}).exec((err, comments)=>{
					if (err) {
						data.status = 301;
						data.message = err.message;
					} else {
						data.article.comments = comments;
					}
					res.end(JSON.stringify(data));	
				});
			}
		});
});

router.post('/add', function(req, res, next) {
	console.log('------article/add');
	let data = req.body;
	data.user = req.user.id;
	data.createTime=Date.now();
	let ains = new Article(data);
	ains.save((err,article)=>{
		let data={};
		if(err){
			data.status=310;
			data.message=err.message;
		}else{
			data.status=200;
		}
		res.end(JSON.stringify(data));
	});
});


module.exports=router;