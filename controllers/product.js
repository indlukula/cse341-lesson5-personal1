
const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../config/db.config.js');

//  Names of the Database and Collections from the db.config file
const database = require('../config/db.config.js').database;
const collection = require('../config/db.config.js').collection;

const getAll = async (req, res) => {
  try {
      mongodb
          .getDb()
          .db(database)
          .collection(collection)
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

const getProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    mongodb
        .getDb()
        .db(database)
        .collection(collection)
        .find({ productId: productId })
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

const createProduct = async (req, res) => {
  try {
    if (!req.body.PLUcode || !req.body.barcode || !req.body.productName || !req.body.category 
      || !req.body.packsize || !req.body.quantity || !req.body.unitprice || !req.body.sellingPrice) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    
  const newProduct = {
    PLUcode: req.body.PLUcode,
    barcode: req.body.barcode,
    productName: req.body.productName,
    category: req.body.category,
    packsize: req.body.packsize,
    quantity: req.body.quantity,
    unitPrice: req.body.unitPrice,
    sellingPrice: req.body.sellingPrice
  };
  const response = await mongodb
      .getDb()
      .db(database)
      .collection(collection)
      .insertOne(newProduct);

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
  
const updateProduct = async (req, res) => {
  try {
    const productId = new ObjectId(req.params.id);
    if (!productId) {
      res.status(400).send({ message: 'Invalid ProductId Supplied' });
      return;
    }
    const updatedPrduct = {
      productId: req.body.productId,
      PLUcode: req.params.PLUcode,
      barcode: req.body.barcode,
      productName: req.body.productName,
      category: req.body.category,
      packsize: req.body.packsize,
      quantity: req.body.quantity,
      unitPrice: req.body.unitPrice,
      sellingPrice: req.body.sellingPrice
    };
    const response = await mongodb
        .getDb()
        .db(database)
        .collection(collection)
        .replaceOne({ productId: productId }, updatedPrduct); 
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
      console.log('Product update failed.');
    }  
  } catch (err) {
    res.status(500);
    console.log(err);
  }
        
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      res.status(400).send({ message: 'Invalid ProductId Supplied' });
      return;
    }
    const response = await mongodb
        .getDb()
        .db(database)
        .collection(collection)
        .deleteOne({ productId: productId }, true);
        console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
      console.log(productId + ' product deleted');
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
  getProduct, 
  createProduct,
  updateProduct,
  deleteProduct
};
