const connection = require('../../core/db/dbConn');
const numeral = require('numeral');
const toCoins = require('../../core/utils/coins');
const gameName = 'To Lands Unknown';
const style = 1;

exports.gHome = function(req, res) {
	if (req.session.loggedIn) {
		res.redirect('/main');
	} else {
		if (!req.query.ref) {
			req.query.ref = 0;
		}
		var gameNews = '';
		connection.query('SELECT title, content, author, date_format(date, "%Y-%m-%d") AS nDate FROM news ORDER BY id DESC LIMIT 5', function(error, results) {
			if (error) {
				return res.end('error, please refresh the page.');
			}
			if (results.length > 0) {
				for (var x = 0; x < results.length; x++) {
					gameNews += '<div><h5>' + results[x].title + '</h5><p><small>' + results[x].content + '<br /><span class="text-secondary">By ' + results[x].author + ' on ' + results[x].nDate + '</span></small></p></div>';
				}
			}
			res.render('index', {
				gameName: gameName,
				style: style,
				gReferrer: req.query.ref,
				gameNews: gameNews,
				loggedIn: req.session.loggedIn
			});
		});
	}
}

exports.gToS = function(req, res) {
	res.render('tos', {
		gameName: gameName,
		style: style
	});
}

exports.gNoJS = function(req, res) {
	res.render('nojs');
}

exports.gBod = function(req, res) {
	if (req.session.loggedIn) {
		var heaM = 0;
		var atkM = 0;
		var defM = 0;
		var accM = 0;
		var evaM = 0;
		var repRank;
		var guildName;
		var questMon;
		var qMonName;
		var curQuest;
		var reqQuest;
		connection.query('SELECT * FROM users WHERE id = ?', [req.session.userid], function(error, results1) {
			if (error) {
				return res.end('error, please refresh the page.');
			}
			if (results1[0].gender == 1) {
				repRank = reputation_ranks[results1[0].reprank - 1].nameM;
			} else {
				repRank = reputation_ranks[results1[0].reprank - 1].nameF;
			}
			heaM = results1[0].health;
			atkM = results1[0].attack;
			defM = results1[0].defense;
			accM = results1[0].accuracy;
			evaM = results1[0].evasion;
			connection.query('SELECT users_items.user AS user, users_items.equipped AS equipped, users_items.item AS item, items.health AS health, items.attack AS attack, items.defense AS defense, items.accuracy AS accuracy, items.evasion AS evasion FROM users_items, items WHERE users_items.user = ? AND users_items.equipped = 1 AND users_items.item = items.id', [req.session.userid], function(error, results2) {
				if (error) {
					return res.end('error, please refresh the page.');
				}
				for (x = 0; x < results2.length; x++) {
					heaM += results2[x].health;
					atkM += results2[x].attack;
					defM += results2[x].defense;
					accM += results2[x].accuracy;
					evaM += results2[x].evasion;
				}
				if (heaM < 0) {
					heaM = 0;
				}
				if (atkM < 0) {
					atkM = 0;
				}
				if (defM < 0) {
					defM = 0;
				}
				if (accM < 0) {
					accM = 0;
				}
				if (evaM < 0) {
					evaM = 0;
				}
				connection.query('SELECT users_quests.user AS user, users_quests.cur AS cur, users_quests.req AS req, users_quests.mon AS mon, monsters.id AS monid, monsters.name AS monname FROM users_quests, monsters WHERE users_quests.user = ? AND users_quests.mon = monsters.id', [req.session.userid], function(error, results3) {
					if (error) {
						return res.end('error, please refresh the page.');
					}
					if (results3.length > 0) {
						questMon = results3[0].mon;
						qMonName = results3[0].monname;
						curQuest = results3[0].cur;
						reqQuest = results3[0].req;
					}
					connection.query('SELECT users_guilds.guild AS guild, guilds.id AS guildid, guilds.name AS guildname FROM users_guilds, guilds WHERE users_guilds.user = ? AND guilds.id = users_guilds.guild', [req.session.userid], function(error, results4) {
						if (error) {
							return res.end('error, please refresh the page.');
						}
						if (results4.length > 0) {
							guildName = results4[0].guildname;
						}
						res.render('main', {
							gameName: gameName,
							style: style,
							loggedIn: req.session.loggedIn,
							kills: numeral(results1[0].kills).format('0,0'),
							quests: numeral(results1[0].quests).format('0,0'),
							questMon: questMon,
							qMonName: qMonName,
							curQuest: curQuest,
							reqQuest: reqQuest,
							repRank: repRank,
							username: results1[0].username,
							guild: guildName,
							level: numeral(results1[0].level).format('0,0'),
							exp: numeral(results1[0].exp).format('0,0'),
							expToLevel: numeral(results1[0].level * 25).format('0,0'),
							gold: toCoins(results1[0].gold),
							mithril: numeral(results1[0].mithril).format('0,0'),
							credits: numeral(results1[0].credits).format('0,0'),
							timber: numeral(results1[0].timber).format('0,0'),
							stones: numeral(results1[0].stones).format('0,0'),
							autos: numeral(results1[0].autos).format('0,0'),
							health: numeral(results1[0].health).format('0,0'),
							attack: numeral(results1[0].attack).format('0,0'),
							defense: numeral(results1[0].defense).format('0,0'),
							accuracy: results1[0].accuracy,
							evasion: results1[0].evasion,
							healthM: numeral(heaM).format('0,0'),
							attackM: numeral(atkM).format('0,0'),
							defenseM: numeral(defM).format('0,0'),
							accuracyM: accM,
							evasionM: evaM,
							shortsword: numeral(results1[0].shortsword).format('0,0'),
							dagger: numeral(results1[0].dagger).format('0,0'),
							helmet: numeral(results1[0].helmet).format('0,0'),
							shoulders: numeral(results1[0].shoulders).format('0,0'),
							wrists: numeral(results1[0].wrists).format('0,0'),
							gloves: numeral(results1[0].gloves).format('0,0'),
							chestpiece: numeral(results1[0].chestpiece).format('0,0'),
							leggings: numeral(results1[0].leggings).format('0,0'),
							boots: numeral(results1[0].boots).format('0,0'),
							location: results1[0].location,
							locationx: results1[0].locationx,
							locationy: results1[0].locationy,
							gDouble: gsettings[5].value,
							gTriple: gsettings[6].value
						});
					});
				});
			});
		});
	} else {
		res.redirect('/');
	}
}