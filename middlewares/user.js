let User = require('../models/User');

module.exports = function(req, res, next) {
	if (req.session.uid) {
		User.getUserById(req.session.uid, function(err, user) {
			if (user) {
				req.user = res.locals.user = user;
			}
			next();
		});
	} else {
		next();
	}
}