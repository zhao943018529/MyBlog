var express = require('express');
var router = express.Router();
const Tag = require('../models/Tag');

router.get('/optTag/getTags',function(req,res,next){
	Tag.find({}).exec((err,tags)=>{
		let data={};
		console.log(err);
		if(err){
			data.status=310;
			data.message=err.message;
		}else{
			data.status=200;
			data.tags=tags;
		}
		res.end(JSON.stringify(data));
	});
});

router.post('/optTag/add', function(req, res, next) {
	let data = req.body;
	console.log(data);
	let tins = new Tag(data);
	tins.save((err,tag)=>{
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

router.post('/optTag/update',function(req,res,next){
	let data =req.body;
	Tag.findOneAndUpdate({_id:data.id},{name:data.name},{new:true},(err,tag)=>{
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


module.exports = router;
