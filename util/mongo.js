const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const Page = require("./page.js");

const url = "mongodb://localhost:27017/local";

const DB = () => new Promise(resolve => {
    mongoClient.connect(url, (err, db) => {
        resolve(db);
    });
});
const Collect = (model) => () => new Promise(resolve => {
    DB().then(db => {
        let col = db.collection(model);
        resolve({col, db});
    });
});
const initParam = param => {
    let page = Object.assign({page: 1, row: 10}, param);
    let sort = {createTime: 1};
    sort[param.sort] = parseInt(param.sortType);
    page.page = parseInt(page.page);
    page.row = parseInt(page.row);
    delete param.page;
    delete param.row;
    delete param.sort;
    delete param.sortType;
    return {
        page: {page: page.page, row: page.row, limit: page.row, skip: (page.page - 1) * page.row},
        rule: param,
        sort: sort
    };
};

class Client{
    constructor(name){
        this.name = name;
        this.db = DB;
        this.collect = Collect(this.name);
        this.initParam = initParam;
        this.ObjectID = ObjectID;
        this.update.setOption = (opt) => (rule = {}, obj) => new Promise(resolve => {
            this.collect().then(({col, db}) => {
                col.update(rule, obj, opt).then(res => {
                    db.close();
                    resolve(res);
                })
            });
        });
    }
    find(rule = {}){
        return new Promise(resolve => {
            rule = this.initParam(rule);
            this.collect().then(({col, db}) => {
                col.find(rule.rule).count((err, res) => {
                    rule.page.count = res;
                });
                col.find(rule.rule).limit(rule.page.limit).skip(rule.page.skip).sort(rule.sort).toArray((err, res) => { 
                    db.close(); 
                    resolve({list: res, page: new Page(rule.page)}); 
                });
            })
        });
    }
    count(rule = {}){
        return new Promise(resolve => {
            rule = this.initParam(rule);
            this.collect().then(({col, db}) => {
                col.find(rule.rule).count((err, res) => {
                    rule.page.count = res;
                    resolve(res); 
                });
            });
        });
    }
    insert(arr){
        return new Promise(resolve => {
            this.collect().then(({col, db}) => {
                col.insert(arr).then(res => { 
                    db.close(); 
                    resolve(res); 
                });
            });
        });
    }
    update(rule = {}, obj){
        return new Promise(resolve => {
            this.collect().then(({col, db}) => {
                col.update(rule, obj).then(res => {
                    db.close();
                    resolve(res);
                });
            });
        });
    }
    delete(rule = {}){
        return new Promise(resolve => {
            this.collect().then(({col, db}) => {
                col.remove(rule).then(res => {
                    db.close();
                    resolve(res);
                });
            });
        });
    }
}

module.exports = Client;