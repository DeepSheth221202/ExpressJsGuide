const express = require('express');
const path = require('path');

const adminData = require("./admin");
const router = express.Router();

router.get('/',(req, res, next)=>{
    //res.sendFile(path.join(__dirname,'../','views','shop.html'));
    const products = adminData.products;
    res.render('shop',{
        prods:products,
        pageTitle:'Shop',
        path:"/",
    }); 
    //it will render views with default template engine which we mentioned in app.js and also search views from views folder which we defined in app.js 
}); 

module.exports = router;