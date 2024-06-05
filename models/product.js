const fs = require("fs");
const path = require("path");
const Cart = require('../models/cart');
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err || fileContent.length == 0) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

class Product {
  constructor(id,title,price,description,imageUrl) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    getProductsFromFile(products=>{
      if(this.id){
        const existingProductsIndex = products.findIndex(prod=> prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductsIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      }
      else{
        this.id = Math.random().toString();
        products.push(this); // this will refer to class object
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id){
    getProductsFromFile(products =>{
      const product = products.find(prod=>prod.id===id);
      const productPrice = product.price;
      const updatedProducts = products.filter(prod=>prod.id!==id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if(!err){
          Cart.deleteProduct(id,productPrice);
        }
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id,callback){
    getProductsFromFile(products=>{
      const product = products.find(p => p.id === id);
      callback(product);
    });
  }
}

module.exports = Product;
