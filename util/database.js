// const mongoDb = require('mongodb');
// const mongoDbClient = mongoDb.MongoClient;
// let _db;
// const mongoConnect = (callback) =>{
//     mongoDbClient.connect('mongodb+srv://shethdeep12:wjpZ0JdClRR6JkPl@cluster0.mydnjgq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//     .then(client =>{
//         console.log("Connected!");
//         _db = client.db('shop');
//         callback(); 
//     })
//     .catch(err =>{
//         console.log(err);
//         throw err;
//     });
// };

// const getDb = () =>{
//     if(_db){
//        return _db;
//     }
//     throw 'No Database Found!';
// }

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;

const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Deep@2212',
    database:'node-complete',
});

module.exports = pool.promise();