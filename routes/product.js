const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');
const validation = require('../middleware/validate');

router.get('/', productController.getAll);

router.get('/:id', productController.getProduct);

router.post('/', validation.saveProduct, productController.createProduct);

router.put('/:id', validation.saveProduct, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;