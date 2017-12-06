const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', function(req, res, next) {

	let data =req.data;
	console.log(data);
	User.getUserByName(data.username, function(err, user) {
		if (err) next(err);
		let data = {};
		if (user) {
			if (user.password === data.password) {
				req.session.uid = user.id;
				data.status = "Success";
			} else {
				data.message = 'password is valid';
			}

		} else {
			data.message = 'username does not exist';
		}
		data.status = "ValidateErr";
		res.end(JSON.stringify(data));
	});
});


module.exports = router;