const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/', productController.getAll);

router.get('/:Id', productController.getSingle);

router.post('/', productController.createProduct);

module.exports = router;