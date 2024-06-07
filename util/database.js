const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const MongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://shethdeep12:wjpZ0JdClRR6JkPl@cluster0.mydnjgq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then(client=>{
      console.log('connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No Database defined!';
}


exports.getDb = getDb;
exports.MongoConnect = MongoConnect;
