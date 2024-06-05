const Product = require('../models/product');
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
    const product = new Product(null,title,price,description,imageUrl);
    product.save()
    .then(()=>{res.redirect('/');})
    .catch(err=>{
        console.log(err);
    });
}; 

exports.getEditProduct = (req, res, next)=>{
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    } 
    const prodId = req.params.productId;
    Product.findById(prodId,product=>{
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
    const updatedProduct = new Product(productId,title,price,description,imageUrl);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.getProducts = (req,res,next) =>{
    Product.fetchAll((products)=>{
        res.render('admin/products',{
            pageTitle:"Admin Products",
            path:"/admin/products",
            prods:products
        });
    });
};

exports.postDeleteProduct =(req,res,next) =>{
    const pId = req.body.productId;
    Product.deleteById(pId);
    res.redirect('/admin/products');
};