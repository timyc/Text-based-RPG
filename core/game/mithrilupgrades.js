// REWRITE DONE

const connection = require('../../core/db/dbConn');
const numeral = require('numeral');

exports.upgrades = function(req, res) {
	if (req.session.loggedIn) {
		function getUpgrades() {
			var critp;
			var critd;
			var xhitp;
			var xhitd;
			connection.query('SELECT mithril, critp, critd, xhitp, xhitd FROM users WHERE id = ?', [req.session.userid], function(error, results) {
				if (error) {
					return res.end('database error');
				}
				if (results.length == 1) {
					critp = results[0].critp;
					critd = results[0].critd;
					xhitp = results[0].xhitp;
					xhitd = results[0].xhitd;
				} else {
					return res.end('error loading user upgrades');
				}
				res.write('<div class="row"><div class="col" style="margin-left:30px;margin-right:30px;"><p>Critical Hit Chance (' + critp + '/500 | ' + critp/10 + '%) <input type="button" onclick="mithrilupgrades(1)" value="[Upgrade for ' + (critp + 1) * 5 + ' mithril]" class="moveBtn font-weight-bold"></p><div class="progress" style="height: 20px;"><div class="progress-bar" role="progressbar" style="width: ' + (critp/5) + '%;" aria-valuenow="' + critp + '" aria-valuemin="0" aria-valuemax="500"></div></div></div></div>');
				res.write('<div class="row"><div class="col" style="margin-left:30px;margin-right:30px;"><p>Critical Hit Damage (' + critd + '/500 | ' + (critd/10 + 50) + '%) <input type="button" onclick="mithrilupgrades(2)" value="[Upgrade for ' + (critd + 1) * 5 + ' mithril]" class="moveBtn font-weight-bold"></p><div class="progress" style="height: 20px;"><div class="progress-bar" role="progressbar" style="width: ' + (critd/5) + '%;" aria-valuenow="' + critd + '" aria-valuemin="0" aria-valuemax="500"></div></div></div></div>');
				res.write('<div class="row"><div class="col" style="margin-left:30px;margin-right:30px;"><p>Extra Hit Chance (' + xhitp + '/500 | ' + xhitp/10 + '%) <input type="button" onclick="mithrilupgrades(3)" value="[Upgrade for ' + (xhitp + 1) * 5 + ' mithril]" class="moveBtn font-weight-bold"></p><div class="progress" style="height: 20px;"><div class="progress-bar" role="progressbar" style="width: ' + (xhitp/5) + '%;" aria-valuenow="' + xhitp + '" aria-valuemin="0" aria-valuemax="500"></div></div></div></div>');
				res.write('<div class="row"><div class="col" style="margin-left:30px;margin-right:30px;"><p>Extra Hit Damage (' + xhitd + '/500 | ' + (xhitd/10 + 50) + '%) <input type="button" onclick="mithrilupgrades(4)" value="[Upgrade for ' + (xhitd + 1) * 5 + ' mithril]" class="moveBtn font-weight-bold"></p><div class="progress" style="height: 20px;"><div class="progress-bar" role="progressbar" style="width: ' + (xhitd/5) + '%;" aria-valuenow="' + xhitd + '" aria-valuemin="0" aria-valuemax="500"></div></div></div></div>');
				res.write('[BREAK]' + results[0].mithril);
				res.end();
			});
		}
		if (req.body.x == 0) {
			getUpgrades();
		} else if (req.body.x == 1) {
			connection.query('SELECT critp, mithril FROM users WHERE id = ?', [req.session.userid], function(error, results) {
				if (error) {
					return res.end('database error');
				}
				var upgradeCost = (results[0].critp + 1) * 5;
				if (results[0].mithril >= upgradeCost && results[0].critp < 500) {
					connection.query('UPDATE users SET mithril = mithril - ?, critp = critp + 1 WHERE id = ?', [upgradeCost, req.session.userid], function(error, results) {
						if (error) {
							return res.end('database error');
						}
						res.write('<center class="text-success">Upgrade successful!</center>');
						getUpgrades();
					});
				} else if (results[0].mithril >= upgradeCost && results[0].critp >= 500) {
					res.write('<center class="text-danger">Maximum upgrade level reached!</center>');
					getUpgrades();
				} else {
					res.write('<center class="text-danger">Insufficient mithril!</center>');
					getUpgrades();
				}
			});
		} else if (req.body.x == 2) {
			connection.query('SELECT critd, mithril FROM users WHERE id = ?', [req.session.userid], function(error, results) {
				if (error) {
					return res.end('database error');
				}
				var upgradeCost = (results[0].critd + 1) * 5;
				if (results[0].mithril >= upgradeCost && results[0].critd < 500) {
					connection.query('UPDATE users SET mithril = mithril - ?, critd = critd + 1 WHERE id = ?', [upgradeCost, req.session.userid], function(error, results) {
						if (error) {
							return res.end('database error');
						}
						res.write('<center class="text-success">Upgrade successful!</center>');
						getUpgrades();
					});
				} else if (results[0].mithril >= upgradeCost && results[0].critd >= 500) {
					res.write('<center class="text-danger">Maximum upgrade level reached!</center>');
					getUpgrades();
				} else {
					res.write('<center class="text-danger">Insufficient mithril!</center>');
					getUpgrades();
				}
			});
		} else if (req.body.x == 3) {
			connection.query('SELECT xhitp, mithril FROM users WHERE id = ?', [req.session.userid], function(error, results) {
				if (error) {
					return res.end('database error');
				}
				var upgradeCost = (results[0].xhitp + 1) * 5;
				if (results[0].mithril >= upgradeCost && results[0].xhitp < 500) {
					connection.query('UPDATE users SET mithril = mithril - ?, xhitp = xhitp + 1 WHERE id = ?', [upgradeCost, req.session.userid], function(error, results) {
						if (error) {
							return res.end('database error');
						}
						res.write('<center class="text-success">Upgrade successful!</center>');
						getUpgrades();
					});
				} else if (results[0].mithril >= upgradeCost && results[0].xhitp >= 500) {
					res.write('<center class="text-danger">Maximum upgrade level reached!</center>');
					getUpgrades();
				} else {
					res.write('<center class="text-danger">Insufficient mithril!</center>');
					getUpgrades();
				}
			});
		} else if (req.body.x == 4) {
			connection.query('SELECT xhitd, mithril FROM users WHERE id = ?', [req.session.userid], function(error, results) {
				if (error) {
					return res.end('database error');
				}
				var upgradeCost = (results[0].xhitd + 1) * 5;
				if (results[0].mithril >= upgradeCost && results[0].xhitd < 500) {
					connection.query('UPDATE users SET mithril = mithril - ?, xhitd = xhitd + 1 WHERE id = ?', [upgradeCost, req.session.userid], function(error, results) {
						if (error) {
							return res.end('database error');
						}
						res.write('<center class="text-success">Upgrade successful!</center>');
						getUpgrades();
					});
				} else if (results[0].mithril >= upgradeCost && results[0].xhitd >= 500) {
					res.write('<center class="text-danger">Maximum upgrade level reached!</center>');
					getUpgrades();
				} else {
					res.write('<center class="text-danger">Insufficient mithril!</center>');
					getUpgrades();
				}
			});
		} else {
			res.end('Invalid request');
		}
	} else {
		res.end('not logged in');
	}
}