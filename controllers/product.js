const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('product').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('product').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createProduct = async (req, res) => {
  const product = {
    PLUcode: req.body.PLUcode,
    barcode: req.body.barcode,
    productName: req.body.productName,
    category: req.body.category,
    packsize: req.body.packsize,
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    sellingPrice: req.body.sellingPrice
  };
  const response = await mongodb.getDb().db().collection('product').insertOne(product);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('product').remove({ _id: productId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  deleteContact
};