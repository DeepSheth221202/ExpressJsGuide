const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const errorController = require('./controllers/error')

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public'))); 

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user; //this is not normal js user object it is sequelize user object which have user object properties as well as all helper methods
        next();
    })
    .catch(err=>console.log(err));
}); //by app.use() or any other method we only registers the middleware which gets called when request incoming not when server starts.. when we hit npm start it only registers these middlewares and in the down we already created one user by default.. so when request gets hit we always have one user..

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

Product.belongsTo(User,{
    constraints:true,
    onDelete:'CASCADE'
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});



sequelize.sync()
//.sync({force:true})
.then(result=>{
        return User.findByPk(1);   
    })
    .then(user=>{
        if(!user){
            return User.create({name:'Max',email:'test@test.com'});
        }
        return user;
    })
    .then(user=>{
        return user.createCart();
    })
    .then(cart=>{
        app.listen(3001 , console.log("http://localhost:3001"));
    })
    .catch(err=>console.log(err));


