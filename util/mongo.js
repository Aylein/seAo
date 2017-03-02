const mongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

const url = "mongodb://localhost:27017/local";

const Client = () => new Promise(resolve => {
    mongoClient.connect(url, (err, db) => {
        resolve(db);
    });
});

Client.collect = (name) => new Promise(resolve => {
    Client().then(db => {
        let col = db.collection(name);
        resolve(col).then(() => { db.close(); });
    });
});

Client.find = (name, rule = {}) => new Promise(resolve => {
    if(!name){ resolve(); return; }
    Client.collect(name).then(({col, db}) => {
        col.find(rule).toArray((err, res) => { 
            resolve(res); 
            db.close(); 
        });
    });
});

Client.ObjectID = ObjectID;

module.exports = Client;