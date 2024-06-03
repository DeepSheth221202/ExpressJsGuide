const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();
 
const products = []; 


// /admin/add-product
router.get('/add-product',(req, res, next)=>{
    //res.sendFile(path.join(__dirname,'../','views','add-product.html')) //also we can use '..' instead of '../'
    //res.sendFile(path.join(rootDir,'views','add-product.html')); //more cleaner version of above by using helper function in path.js
    res.render('add-product',{pageTitle:"add-product",path:"add-product"});
});

// /admin/product
router.post('/product',(req,res)=>{
    products.push({title:req.body.title}); 
    res.redirect('/'); 
});

exports.routes = router;
exports.products = products;