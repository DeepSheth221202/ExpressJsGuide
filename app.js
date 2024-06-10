const express = require("express");
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');

const path = require("path");
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public'))); 

app.use((req,res,next)=>{
    User.findById('6662f1db3fb11b2010ff3b40')
    .then(user=>{
        req.user = user; 
        next();
    })
    .catch(err=>console.log(err));
});

app.use('/admin',adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404Page);

mongoose.connect('mongodb+srv://shethdeep12:wjpZ0JdClRR6JkPl@cluster0.mydnjgq.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(result=>{
    User.findOne().then(user=>{
        if(!user){
            const user = new User({
                name:"Deep",
                email:"deep@test.com",
                cart:{
                    items:[]
                }
            });
            user.save();
        }
    })
    app.listen(3001);
    console.log("connected!");
}).catch(err=>console.log(err));






