const { mongodb } = require('mongodb');
const connectdb = require('../db/connect.js');

mongodb.Promise = global.Promise;

const db = {};
db.mongodb = mongodb;
db.url = connectdb.url;
db.product = require('./product.js')(mongodb);
db.user = require('./user.js')(mongodb);

module.exports = db;