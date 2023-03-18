const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.product = require('./product.js')(mongoose).product;
db.user = require('./user.js')(mongoose).user;

module.exports = db;