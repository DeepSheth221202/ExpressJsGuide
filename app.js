const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

const mongoConnect = require('./util/database').mongoConnect;

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminData.routes);

app.use(shopRoutes);

//request will go through all middle ware top to bottom
app.use((req, res, next)=>{
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));
    res.status(400).render('404',{pageTitle:'Page Not Found!'});
});

mongoConnect(()=>{
    app.listen(3001);
});



// '/' means all the path that starts with '/' will go through this middle ware thats why we added this middle ware in the end such that if url is different it will not reach to this middleware 

// const server  = http.createServer(app);

// server.listen(3001);

//app.listen(3001); //it will do the same as create server and listen

//npm install --save express (to install express)