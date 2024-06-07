const Product = require('../models/product');
const mongodb = require('mongodb');
exports.getAddProduct = (req, res, next)=>{
    res.render('admin/edit-product',{
        pageTitle:"add-product",
        path:"add-product",
        editing:false,
    }); 
};
 
exports.postAddProduct = (req,res)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = parseFloat(req.body.price);
    const description = req.body.description;
    const product = new Product(title,imageUrl,description,price,null,req.user._id);
    product.save()
    .then(result=>{
        console.log(result)
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
}; 

exports.getEditProduct = (req, res, next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    } 
    const prodId = req.params.productId;
    
    Product.findById(prodId)
    .then(product=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{  
            pageTitle:"Edit Product",
            path:"edit-product",
            editing:Boolean(editMode),
            product:product 
        });
    });
    
};

exports.postEditProduct = (req,res,next)=>{
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = parseFloat(req.body.price);
    const description = req.body.description;
    const updatedProduct = new Product(title,imageUrl,description,price,productId);
    updatedProduct.save()
    .then(result=>{
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
    
};

exports.getProducts = (req,res,next) =>{
    Product.fetchAll()
    .then(
        products=>{
            res.render('admin/products',{
                pageTitle:"Admin Products",
                path:"/admin/products",
                prods:products
            });
        })
        .catch(err=>console.log(err));
};

exports.postDeleteProduct =(req,res,next) =>{
    const pId = req.body.productId;
    Product.deleteById(pId)
    .then(()=>{
        console.log("DELETED!");
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
};