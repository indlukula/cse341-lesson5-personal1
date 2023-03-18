const database = 'product';
const collection = 'products';
const database1 = 'user';
const collection1 = 'users'
const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('DB is already initialized');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('DB was not initialized');
    }
    return _db;
};
module.exports = {
  database,
  collection,
  database1,
  collection1,
  initDb,
  getDb
}