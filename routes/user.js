var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUser',function(req,res,next){
	let data;
	if (req.user) {
		data = {
			status: 200,
			user: req.user
		};
	} else {
		data = {
			status:310
		};
	}
	res.end(JSON.stringify(data));
});

module.exports = router;
