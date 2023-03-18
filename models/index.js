const dbConfig = require('../config/db.config.js');

const mongodb = require('mongodb');
mongodb.Promise = global.Promise;

const db = {};
db.mongodb = mongodb;
db.url = dbConfig.url;
db.product = require('./product.js')(mongodb).product;
db.user = require('./user.js')(mongodb).user;

module.exports = db;