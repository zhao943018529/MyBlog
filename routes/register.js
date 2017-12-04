var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET home page. */

router.post('/',function(req,res,next){
	let data = req.body;
	let user = new User(data);
	user.save(function(err,user){
		let data={};
		if(err){
			data.status="validateErr";
			data.message=err.message;
		}else{
			data.status="success";
		}
		res.end(JSON.stringify(data));
	})

})

module.exports = router;
