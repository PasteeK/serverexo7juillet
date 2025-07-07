const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/products', productController.getProducts);

router.post('/product', productController.createProduct);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
