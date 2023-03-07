
const passwordUtil = require('../util/passwordComplexityCheck');
const db = require('../models');
const User = db.user;


const getAll = async (req, res) => {
  try {
    User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
         message: err.message || 'Some error occured while retrieving users.'
      });
    });
} catch (err) {
  res.status(500).json(err);
  }
};

const getSingle = async (req, res) => {
  try {
    const username = req.params.username;
    User.find({ username: username })
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

const createUser = async (req, res) => {
  try {
    if (!req.body.userName || !req.body.password || !req.body.firstName || !req.body.lastName 
      || !req.body.email || !req.body.phone || !req.body.designation) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
      const password = req.body.password;
      const passwordCheck = passwordUtil.passwordPass(password);
      if (passwordCheck.error) {
        res.status(400).send({ message: passwordCheck.error });
        return;
      }
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Some error occured while creating the user.'
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
    User.findOne({ username: username }, function (err, user) {
      user.username = req.params.username;
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.designation = req.body.designation;
      user.save(function (err) {
        if  (err) {
          res.status(500).json(err || 'Some error occured while updating the contact');

        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    if (username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }

    User.deleteOne({ username: username }, function (err, result) {
      if (err) {
        res.status(500).json(err || 'Some error occurred while deleting the contact.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};