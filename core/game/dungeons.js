const connection = require('../../core/db/dbConn');

exports.dungeonLayout = function(res, req) {
	if (req.session.loggedIn) {
		connection.query('SELECT * FROM users_dungeons WHERE user = ?', [req.session.userid], function(error, results) {
			if (error) {
				return res.end('error');
			}
			if (results.length > 0) {
				// show progress
			} else {
				// show option to enter dungeon
			}
		});
	} else {
		res.end('not logged in');
	}
}