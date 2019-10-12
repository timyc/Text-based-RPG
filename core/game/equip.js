// REWRITE DONE

const connection = require('../../core/db/dbConn');
const numeral = require('numeral');
const toCoins = require('../../core/utils/coins');

module.exports = function(req, res) {
	var justChecking = req.body.equip;
	var actuallyUpgrading = req.body.upgrade;
	var eqFxn = function(y) {
		return Math.floor(5000 * Math.pow(y, 1.995));
	}
	var eqFxnNumeral = function(w) {
		return toCoins(Math.floor(5000 * Math.pow(w, 1.995)));
	}
	var powFxn = function(z) {
		return numeral((z * (z - 1)) / 2 + 1).format('0,0');
	}
	if (req.session.loggedIn) {
		if (!actuallyUpgrading && justChecking) {
			connection.query('SELECT gold, shortsword, dagger, helmet, shoulders, wrists, gloves, chestpiece, leggings, boots FROM users WHERE id = ?', [req.session.userid], function(error, results) {
				if (justChecking == 1) {
					res.send('Current Power: ' + powFxn(results[0].shortsword) + '<br />Power Next Level: ' + powFxn(results[0].shortsword + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].shortsword) + '<br /><a class="text-light" href="javascript:equipupgrade(1);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else if (justChecking == 2) {
					res.send('Current Power: ' + powFxn(results[0].dagger) + '<br />Power Next Level: ' + powFxn(results[0].dagger + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].dagger) + '<br /><a class="text-light" href="javascript:equipupgrade(2);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else if (justChecking == 3) {
					res.send('Current Power: ' + powFxn(results[0].helmet) + '<br />Power Next Level: ' + powFxn(results[0].helmet + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].helmet) + '<br /><a class="text-light" href="javascript:equipupgrade(3);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else if (justChecking == 4) {
					res.send('Current Power: ' + powFxn(results[0].shoulders) + '<br />Power Next Level: ' + powFxn(results[0].shoulders + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].shoulders) + '<br /><a class="text-light" href="javascript:equipupgrade(4);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else if (justChecking == 5) {
					res.send('Current Power: ' + powFxn(results[0].wrists) + '<br />Power Next Level: ' + powFxn(results[0].wrists + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].wrists) + '<br /><a class="text-light" href="javascript:equipupgrade(5);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else if (justChecking == 6) {
					res.send('Current Power: ' + powFxn(results[0].gloves) + '<br />Power Next Level: ' + powFxn(results[0].gloves + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].gloves) + '<br /><a class="text-light" href="javascript:equipupgrade(6);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else if (justChecking == 7) {
					res.send('Current Power: ' + powFxn(results[0].chestpiece) + '<br />Power Next Level: ' + powFxn(results[0].chestpiece + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].chestpiece) + '<br /><a class="text-light" href="javascript:equipupgrade(7);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else if (justChecking == 8) {
					res.send('Current Power: ' + powFxn(results[0].leggings) + '<br />Power Next Level: ' + powFxn(results[0].leggings + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].leggings) + '<br /><a class="text-light" href="javascript:equipupgrade(8);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				} else {
					res.send('Current Power: ' + powFxn(results[0].boots) + '<br />Power Next Level: ' + powFxn(results[0].boots + 1) + '<br />Cost: ' + eqFxnNumeral(results[0].boots) + '<br /><a class="text-light" href="javascript:equipupgrade(9);">Upgrade</a> | <a class="text-light" href="javascript:closeequip();">Close</a>');
				}
			});
		} else if (!justChecking && actuallyUpgrading) {
			connection.query('SELECT gold, shortsword, dagger, helmet, shoulders, wrists, gloves, chestpiece, leggings, boots FROM users WHERE id = ?', [req.session.userid], function(error, results) {
				if (error) {
					res.send('error');
				} else {
					var shortsword = results[0].shortsword;
					var dagger = results[0].dagger;
					var helmet = results[0].helmet;
					var shoulders = results[0].shoulders;
					var wrists = results[0].wrists;
					var gloves = results[0].gloves;
					var chestpiece = results[0].chestpiece;
					var leggings = results[0].leggings;
					var boots = results[0].boots;
					if (actuallyUpgrading == 1) {
						if (results[0].gold >= eqFxn(shortsword)) {
							connection.query('UPDATE users SET gold = gold - ?, shortsword = shortsword + 1 WHERE username = ?', [eqFxn(shortsword), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded rifle![BREAK]' + (results[0].gold - eqFxn(shortsword)) + '[BREAK]' + numeral(results[0].shortsword + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].shortsword).format('0,0'));
						}
					} else if (actuallyUpgrading == 2) {
						if (results[0].gold >= eqFxn(dagger)) {
							connection.query('UPDATE users SET gold = gold - ?, dagger = dagger + 1 WHERE username = ?', [eqFxn(dagger), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded blaster![BREAK]' + (results[0].gold - eqFxn(dagger)) + '[BREAK]' + numeral(results[0].dagger + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].dagger).format('0,0'));
						}
					} else if (actuallyUpgrading == 3) {
						if (results[0].gold >= eqFxn(helmet)) {
							connection.query('UPDATE users SET gold = gold - ?, helmet = helmet + 1 WHERE username = ?', [eqFxn(helmet), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded helmet![BREAK]' + (results[0].gold - eqFxn(helmet)) + '[BREAK]' + numeral(results[0].helmet + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].helmet).format('0,0'));
						}
					} else if (actuallyUpgrading == 4) {
						if (results[0].gold >= eqFxn(shoulders)) {
							connection.query('UPDATE users SET gold = gold - ?, shoulders = shoulders + 1 WHERE username = ?', [eqFxn(shoulders), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded shoulders![BREAK]' + (results[0].gold - eqFxn(shoulders)) + '[BREAK]' + numeral(results[0].shoulders + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].shoulders).format('0,0'));
						}
					} else if (actuallyUpgrading == 5) {
						if (results[0].gold >= eqFxn(wrists)) {
							connection.query('UPDATE users SET gold = gold - ?, wrists = wrists + 1 WHERE username = ?', [eqFxn(wrists), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded wrists![BREAK]' + (results[0].gold - eqFxn(wrists)) + '[BREAK]' + numeral(results[0].wrists + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].wrists).format('0,0'));
						}
					} else if (actuallyUpgrading == 6) {
						if (results[0].gold >= eqFxn(gloves)) {
							connection.query('UPDATE users SET gold = gold - ?, gloves = gloves + 1 WHERE username = ?', [eqFxn(gloves), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded gloves![BREAK]' + (results[0].gold - eqFxn(gloves)) + '[BREAK]' + numeral(results[0].gloves + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].gloves).format('0,0'));
						}
					} else if (actuallyUpgrading == 7) {
						if (results[0].gold >= eqFxn(chestpiece)) {
							connection.query('UPDATE users SET gold = gold - ?, chestpiece = chestpiece + 1 WHERE username = ?', [eqFxn(chestpiece), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded chestpiece![BREAK]' + (results[0].gold - eqFxn(chestpiece)) + '[BREAK]' + numeral(results[0].chestpiece + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].chestpiece).format('0,0'));
						}
					} else if (actuallyUpgrading == 8) {
						if (results[0].gold >= eqFxn(leggings)) {
							connection.query('UPDATE users SET gold = gold - ?, leggings = leggings + 1 WHERE username = ?', [eqFxn(leggings), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded leggings![BREAK]' + (results[0].gold - eqFxn(leggings)) + '[BREAK]' + numeral(results[0].leggings + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].leggings).format('0,0'));
						}
					} else {
						if (results[0].gold >= eqFxn(boots)) {
							connection.query('UPDATE users SET gold = gold - ?, boots = boots + 1 WHERE username = ?', [eqFxn(boots), req.session.username], function(error) {
								if (error) {
									res.send('Cannot query to database. Contact the administrator immediately. Error code 0x0004');
								} else {
									res.send('Successfully upgraded boots![BREAK]' + (results[0].gold - eqFxn(boots)) + '[BREAK]' + numeral(results[0].boots + 1).format('0,0'));
								}
							});
						} else {
							res.send('Not enough coins![BREAK]' + (results[0].gold) + '[BREAK]' + numeral(results[0].boots).format('0,0'));
						}
					}
				}
			});
		} else {
			res.status(401).end('I don\'t understand your request.');
		}
	} else {
		res.status(401).end('You\'re not logged in!');
	}
}