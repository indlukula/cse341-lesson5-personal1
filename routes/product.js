const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');
const validation = require('../middleware/validate');

router.get('/', productController.getAll);

router.get('/:Id', productController.getProduct);

router.post('/', validation.saveProduct, productController.createProduct);

router.put('/:Id', validation.saveProduct, productController.updateProduct);

router.delete('/:Id', productController.deleteProduct);

module.exports = router;