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
    req.user
    .createProduct({
        title:title,
        imageUrl:imageUrl,
        price:price,
        description:description
    }) // this method is automatically added by sequelize because we have initialized the relations in app.js (this is called magic association method)
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
    //Product.findByPk(prodId)
    req.user.
    getProducts({where:{id:prodId}}) 
    //this will makesure that only current user's product will be there (it will select all the products whoose userid==currUserId and prodId==id)
    .then(products=>{
        const product = products[0]; 
        //as getProducts() will return array of products
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
    Product.findByPk(productId).then(
        product=>{
            product.title = title;
            product.price = price;
            product.description = description;
            product.imageUrl = imageUrl;
            return product.save();
        }
    )
    .then(result=>{
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
    
};

exports.getProducts = (req,res,next) =>{
    req.user.getProducts()
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
    Product.findByPk(pId)
    .then(product=>{
        return product.destroy();
    })
    .then(result=>{
        console.log("DELETED!");
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));
};