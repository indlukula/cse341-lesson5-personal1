const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/', productController.getAll);

router.get('/:Id', productController.getSingle);

router.post('/', productController.createProduct);

router.put('/:Id', productController.updateProduct);

router.delete('/:Id', productController.deleteProduct);

module.exports = router;