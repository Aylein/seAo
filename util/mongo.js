const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Page = require("./page.js");

const url = "mongodb://localhost:27017/local";

const Client = () => new Promise(resolve => {
    mongoClient.connect(url, (err, db) => {
        resolve(db);
    });
});
Client.collect = name => () => new Promise(resolve => {
    Client().then(db => {
        let col = db.collection(name);
        resolve({col, db});
    });
});
Client.find = name => (rule = {}) => new Promise(resolve => {
    rule = Client.makeParam(rule);
    let collect = Client.collect(name);
    collect().then(({col, db}) => {
        col.find(rule.rule).count((err, res) => {
            rule.page.count = res;
        });
        col.find(rule.rule).limit(rule.page.limit).skip(rule.page.skip).toArray((err, res) => { 
            db.close(); 
            resolve({list: res, page: new Page(rule.page)}); 
        });
    });
});
Client.insert = name => (arr) => new Promise(resolve => {
    if(!arr) resolve({res: false, msg: "插入对象为空"});
    let fn = Array.isArray(arr) ? "insertMany" : "insertOne";
    let collect = Client.collect(name);
    collect().then(({col, db}) => {
        col.insert(arr).then(res => { 
            db.close(); 
            resolve(res); 
        });
    });
});
Client.ObjectID = ObjectID;
Client.makeParam = param => {
    let page = Object.assign({page: 1, row: 10}, param);
    page.page = parseInt(page.page);
    page.row = parseInt(page.row);
    delete param.page;
    delete param.row;
    return {
        page: {page: page.page, row: page.row, limit: page.row, skip: (page.page - 1) * page.row},
        rule: param
    };
}

module.exports = Client;