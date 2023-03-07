const db = require('../models');
const Product = db.product;



const getAll = async (req, res) => {
  try {
    Product.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
         message: err.message || 'Some error occured while retrieving products.'
      });
    });
} catch (err) {
  res.status(500).json(err);
  }
};

const getSingle = async (req, res) => {
  try {
    const productId = req.params.productId;
    Product.find({ productId: productId })
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
    
  const product = new Product(req.body);
  product
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'Some error occured while creating the product.'
    });

    });
} catch (err) {
  res.status(500).json(err);
}
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      res.status(400).send({ message: 'Invalid ProductId Supplied' });
      return;
    
    }
    Product.findOne({ productId: productId }, function (err, product) {
      product.PLUcode = req.params.PLUcode;
      product.barcode = req.body.barcode;
      product.productName = req.body.productName;
      product.category = req.body.category;
      product.packsize = req.body.packsize;
      product.quantity = req.body.quantity;
      product.unitPrice = req.body.unitprice;
      product.sellingPrice = req.body.sellingPrice;
      product.save(function (err) {
        if  (err) {
          res.status(500).json(err || 'Some error occured while updating the product');
          
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (productId) {
      res.status(400).send({ message: 'Invalid ProductId Supplied' });
      return;
    }

    Product.deleteOne({ productId: productId }, function (err, result) {
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
  createProduct,
  updateProduct,
  deleteProduct
};