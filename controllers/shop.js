const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  }).catch(err=>console.log(err));
  
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index',{
      prods: products,
      pageTitle: "Shop",
      path: "/",
    })
  }).catch(err=>console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product=>{
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  }).catch(err=>console.log(err));
};



exports.getCart = (req, res, next) => {
  req.user
  .getCart()
  .then(cart=>{
   return cart.getProducts()
   .then(cartProducts=>{
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "/cart",
      products:cartProducts
    })
   })
   .catch(err=>console.log(err));
  })
  .catch(err=>console.log(err));
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
  .getCart()
  .then(cart=>{
    fetchedCart = cart;
    return cart.getProducts({where:{id:prodId}});
  })
  .then(products=>{
    let product;
    if(products.length>0){
      product = products[0];
    }
    if(product){
      const oldQty = product.cartItem.quantity;
      newQuantity = oldQty + 1;
      return product;
    }
    return Product.findByPk(prodId);
  })
  .then(product=>{
    return fetchedCart.addProduct(product,{through: {quantity:newQuantity}});
  })
  .then(cart=>res.redirect('/cart'))
  .catch(err=>console.log(err));
};

exports.postCartDeleteProduct =(req,res,next)=>{
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:prodId}});
  })
  .then(products=>{
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(result=>res.redirect('/cart'))
  .catch(err=>console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include:['products']})
  .then(orders=>{
    res.render("shop/orders", {
      pageTitle: "Your Orders",
      path: "/orders",
      orders:orders
    });
  })
};

exports.postOrder = (req,res,next) =>{
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then(products=>{
    return req.user
    .createOrder()
    .then(order=>{
      return order.addProducts(products.map(
        product=>{
          product.orderItem = {quantity:product.cartItem.quantity};
          return product;
        }
      ));
    })
    .catch(err=>console.log(err));
  })
  .then(result=>{
    return fetchedCart.setProducts(null);
  })
  .then(resilt=>{
    res.redirect('/orders');
  })
  .catch(err=>console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
