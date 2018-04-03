var express = require('express');
var router = express.Router();
const Article = require('../models/Article');
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

router.get('/getById/:id', function(req, res, next) {
	console.log('------article/getById');
	let aid = req.params.id;
	Article.findById(aid).populate("tags").exec(function(err,article){
		let data={};
		if(err){
			data.status=301;
			data.message = err.message;
		}else{
			data.status=200;
			data.article=article;
		}
		res.end(JSON.stringify(data));
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