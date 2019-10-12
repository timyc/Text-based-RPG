const mysql = require('mysql');
const config = require('../../config/config');
var doConn;
global.monsters;
global.dungeon_monsters;
global.mondrops;
global.items;
global.gsettings;
global.dungeons;
global.locations;
global.locPlaces;
global.beasts;
global.story;
global.reputation_ranks;
global.shops;
global.shopitems; // NO ITEMS SHOULD EVER BE DELETED UNLESS THE SAME ID IS REFILLED AFTERWARDS
global.itemreqs;

function connectDB() {
	if (!doConn) {
		doConn = mysql.createPool(config);
		doConn.getConnection(function(error) {
			if (error) {
				console.log('[ERROR] Database connection failed!')
				return error;
			}
			doConn.query('SELECT * FROM monsters', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded monsters');
				monsters = results;
			});
			doConn.query('SELECT * FROM items', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded items');
				items = results;
			});
			doConn.query('SELECT * FROM monsters_drops', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded monster drops');
				mondrops = results;
			});
			doConn.query('SELECT * FROM settings', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded game settings');
				gsettings = results;
			});
			doConn.query('SELECT * FROM locations', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded locations');
				locations = results;
			});
			doConn.query('SELECT * FROM locations_places', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded location places');
				locPlaces = results;
			});
			doConn.query('SELECT * FROM beasts', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded beasts');
				beasts = results;
			});
			doConn.query('SELECT * FROM story', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded story');
				story = results;
			});
			doConn.query('SELECT * FROM reputation_ranks', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded reputation ranks');
				reputation_ranks = results;
			});
			doConn.query('SELECT * FROM shops', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded shops');
				shops = results;
			});
			doConn.query('SELECT * FROM shops_items', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded shop items');
				shopitems = results;
			});
			doConn.query('SELECT * FROM items_requirements', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded item requirements');
				itemreqs = results;
			});
			doConn.query('SELECT * FROM dungeons', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded dungeons');
				dungeons = results;
			});
			doConn.query('SELECT * FROM dungeons_monsters', function(error, results) {
				if (error) {
					return error;
				}
				console.log('[MYSQL] Loaded dungeon monsters');
				dungeons_monsters = results;
			});
		});
	}
	return doConn;
}

module.exports = connectDB();