var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET home page. */

router.post('/',function(req,res,next){
	let data = req.body;
	console.log(data);
	let user = new User(data);
	user.save(function(err,user){
		let data={};
		if(err){
			data.status="ValidateErr";
			data.message=err.message;
		}else{
			data.status="Success";
		}
		res.end(JSON.stringify(data));
	})

})

module.exports = router;
