const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', function(req, res, next) {

	let data =req.body;
	User.getUserByName(data.username, function(err, user) {
		if (err) next(err);
		let message = {};
		if (user) {
			if (user.password == data.password) {
				req.session.uid = user.id;
				message.status = "200";
			} else {
				message.status = "310";
				message.message = 'password is valid';
			}

		} else {
			message.status = "310";
			message.message = 'username does not exist';
		}
		res.end(JSON.stringify(message));
	});
});


module.exports = router;