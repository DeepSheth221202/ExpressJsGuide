const express = require('express');

const router = express.Router();

const shopController= require('../controllers/shop');
 
router.get('/',shopController.getIndex); 

router.get('/products',shopController.getProducts);
 
router.get('/products/:productId',shopController.getProduct);
 
router.get('/cart',shopController.getCart);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);

router.post('/addToCart',shopController.addToCart);
 
router.get('/orders',shopController.getOrders);

router.post('/create-order',shopController.postOrder);

module.exports = router;