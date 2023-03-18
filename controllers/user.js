
//const db = require('../models');
//const User = db.user;
const passwordUtil = require('../util/passwordComplexityCheck');
const mongodb = require('../config/db.config.js');
const database1 = require('../config/db.config.js').database1;
const collection1 = require('../config/db.config.js').collection1;

const createUser = async(req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const newUser = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
    };
    const response = await mongodb
      .getDb()
      .db(database1)
      .collection(collection1)
      .insertOne(newUser);

      if (response.acknowledged) {
        res.status(201)
        .json(response);
        console.log('Information saved to Successfully');
      } else {
        res.status(500)
        .json(response.error || 'Some error occured while creating the product.');
        console.log('Uploading failed');
      }
    } catch (err) {
      res.status(500).json(err);
    }
    };

  
    const getAll = async (req, res) => {
      try {
          mongodb
              .getDb()
              .db(database1)
              .collection(collection1)
              .find()
              .toArray().then((lists) => {
              res.setHeader('Content-Type', 'application/json');
              res.status(200)
              .json(lists[0]);
          });
      } catch (err1) {
      res.status(500).json(err1);
          console.log(err1.message);
    }
    
    };

const getUser = async(req, res) => {
  try {
    const username = req.params.username;
    mongodb
    .getDb()
    .db(database1)
    .collection(collection1)
    .find({ username: username })
    .then((data) => {
    res.status(200).send(data);
})
.catch((err) => {
  res.status(500).send({
     message: err.message || 'Some error occured while retrieving users'
  });
});
} catch (err) {
res.status(500).json(err);
}
};

const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
  
    const updatedUser = {
      username: req.body.username,
      password: req.params.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      designation: req.body.designation,
    };

    const response = await mongodb
        .getDb()
        .db(database1)
        .collection(collection1)
        .replaceOne({ username: username }, updatedUser); 
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
      console.log('Product update failed.');
    }  
  } catch (err) {
    res.status(500);
    console.log(err);
  }
        
};
const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid ProductId Supplied' });
      return;
    }
    const response = await mongodb
        .getDb()
        .db(database1)
        .collection(collection1)
        .deleteOne({ username: username }, true);
        console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
      console.log(username + ' user deleted');
    } else {
      res.status(500).json(response.error || 'An error occured while deleting product');
      console.log('Delete failed');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
  module.exports = { 
    getAll, 
    getUser, 
    createUser,
    updateUser,
    deleteUser
    
};