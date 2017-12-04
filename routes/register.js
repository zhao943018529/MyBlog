var express = require('express');
var router = express.Router();
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/',function(req,res,next){
	let data = req.body;
	let user = new User(data);
	user.save(function(err,user){
		if(err)next(err);
		res.redirect("/");
	})

})

module.exports = router;
